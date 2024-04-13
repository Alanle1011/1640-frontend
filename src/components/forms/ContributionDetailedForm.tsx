import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocViewer, { DocViewerRenderers, IDocument } from "@cyntler/react-doc-viewer";
import { ILoginUser } from "@/types";
import { toast } from "@/components/ui";

const ContributionDetailedForm = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState<ILoginUser>(
        // @ts-ignore
        JSON.parse(localStorage.getItem("userData")) || null
    );
    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
    const [contribution, setContribution] = useState<any>(null);
    const [contributionImage, setContributionImage] = useState<string>();
    const [contributionFile, setContributionFile] = useState<string>();
    const [contributionFileType, setContributionFileType] = useState<string>();
    const docs = [
        {
            uri: contributionFile,
            fileType: contributionFileType,
        },
    ] as IDocument[];

    const handleApprove = (id: string) => {
        fetch(`${VITE_WEBSERVICE_URL}/contribution/setStatus/${id}`, {
            method: "PUT",
            headers: {
                "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify({
                status: "APPROVED",
            }),
        }).then(response => {
            if (response.ok) {
                toast({ title: "APPROVED successfully!" });
                window.location.reload();
            }
        })
    }

    const handleReject = (id: string) => {
        fetch(`${VITE_WEBSERVICE_URL}/contribution/setStatus/${id}`, {
            method: "PUT",
            headers: {
                "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify({
                status: "REJECTED",
            }),
        }).then(response => {
            if (response.ok) {
                toast({ title: "REJECTED successfully!" });
                window.location.reload();
            }
        })
    }

    // 1. GET Contribution
    console.log(contribution)
    useEffect(() => {
        fetch(`${VITE_WEBSERVICE_URL}/contribution/${id}`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(response => {
                debugger
                setContribution(response);
                if (response.imageId) {
                    setContributionImage(`${VITE_WEBSERVICE_URL}/image/${response.imageId}`)
                }
                if (response.documentId) {
                    setContributionFile(`${VITE_WEBSERVICE_URL}/document/${response.documentId}`)
                    setContributionFileType(response.documentType.toString());
                }
            })
            .catch(error => console.error("Error fetching:", error));
    }, [id]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData") || '""');
        if (data) {
            setUserData(data);
        }
    }, []);

    return (
        <div className="flex flex-col gap-5 w-[1000px]">
            <div className="">
                <text className="shad-form_label">Title</text>
                <div className="shad-input border-input flex items-center pl-3">
                    {contribution?.title}
                </div>
            </div>

            <div>
                <text className="shad-form_label">Content</text>
                <div className="shad-input border-input">
                    {contribution?.content}
                </div>
            </div>
            <div>
                <text className="shad-form_label">Status: {contribution?.status}</text>
            </div>
            {contributionImage &&
                <div>
                    <div>
                        <h1>Image</h1>
                    </div>
                    <div className="flex flex-1 justify-center w-full h-full p-5 lg:p-10">
                        <img src={contributionImage} alt="image" className="object-contain w-[500px] h-[500px] " />
                    </div>
                </div>
            }
            {contributionFile && docs &&
                <div>
                    <div>
                        <h1>Documents Demo</h1>
                        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}
                            style={{ height: 1000 }} />
                    </div>
                </div>
            }
            {
                userData?.role === "COORDINATOR" && contribution?.status === "FINAL_CLOSED" && (
                    <div className="flex gap-2">
                        <button className={'border rounded-full border-full border-black p-2 hover:bg-blue-400'} onClick={() => handleApprove(contribution.id)}>APPROVED</button>
                        <button className={'border rounded-full border-full border-black p-2 hover:bg-red-400'} onClick={() => handleReject(contribution.id)}>REJECTED</button>
                    </div>
                )
            }
        </div>
    );
};
export default ContributionDetailedForm;