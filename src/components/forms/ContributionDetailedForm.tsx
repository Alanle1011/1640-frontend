import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ContributionDetailedForm = () => {
    const {id} = useParams();

    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

    const [contribution, setContribution] = useState<any>(null);
    const [contributionImage, setContributionImage] = useState<string>();
    const [contributionFile, setContributionFile] = useState<string>();
    const [contributionFileType, setContributionFileType] = useState<string>();

  const docs = [
    { uri: contributionFile,
      fileType: contributionFileType,
    },
  ];

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
                setContribution(response);
                if (response.imageId) {
                    setContributionImage(`${VITE_WEBSERVICE_URL}/image/${response.imageId}`)
                }
                if (response.documentId) {
                    debugger
                    setContributionFile(`${VITE_WEBSERVICE_URL}/document/${response.documentId}`)
                    setContributionFileType(response.documentType.toString());
                }
            })
            .catch(error => console.error("Error fetching:", error));
    }, [id]);


    return (
        <div>
            <div >
                <text className="shad-form_label">Title</text>
            </div>
            <div className="shad-input border-input">
                {contribution?.title}
            </div>
            <div>
                <text className="shad-form_label">Content</text>
            </div>
            <div className="shad-input border-input">
                {contribution?.content}
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
                             style={{ height: 1000 }}/>
                </div>
              </div>
            }
        </div>
    );
};
export default ContributionDetailedForm;