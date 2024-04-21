import { Button, ScrollArea, useToast } from "@/components/ui";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ILoginUser } from "@/types";
import DocViewer, {
  DocViewerRenderers,
  IDocument,
} from "@cyntler/react-doc-viewer";
import { ContributionComment, Loader } from "../shared";
import { PenSquare } from "lucide-react";

const ContributionDetails: React.FC<{ userData: ILoginUser }> = ({
  userData,
}) => {
  const { id } = useParams();

  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();
  const [contribution, setContribution] = useState<any>(null);
  const [contributionImage, setContributionImage] = useState<string>();
  const [contributionFile, setContributionFile] = useState<string>();
  const [contributionFileType, setContributionFileType] = useState<string>();
  const [contributionFileName, setContributionFileName] = useState<string>();

  const docs = [
    {
      uri: contributionFile,
      fileType: contributionFileType,
      fileName: contributionFileName,
    },
  ] as IDocument[];

  const handleApprovedContribution = () => {
    debugger;
    fetch(`${VITE_WEBSERVICE_URL}/contribution/setStatus/${id}`, {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({
        status: "APPROVED",
      }),
    });
    window.location.reload();
  };
  const handleRejectedContribution = () => {
    fetch(`${VITE_WEBSERVICE_URL}/contribution/setStatus/${id}`, {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({
        status: "REJECTED",
      }),
    });
    window.location.reload();
  };
  const handlePublishedContribution = () => {
    debugger;
    fetch(`${VITE_WEBSERVICE_URL}/contribution/setStatus/${id}`, {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({
        status: "PUBLISHED",
      }),
    });
    window.location.reload();
  };

  // 1. GET Contribution
  console.log(contribution);
  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/contribution/${id}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((response) => {
        setContribution(response);
        if (response.imageId) {
          setContributionImage(
            `${VITE_WEBSERVICE_URL}/image/${response.imageId}`
          );
        }
        if (response.documentId) {
          setContributionFile(
            `${VITE_WEBSERVICE_URL}/document/${response.documentId}`
          );
          setContributionFileType(response.documentType.toString());
          setContributionFileName(response.documentName.toString());
        }
      })
      .catch((error) => console.error("Error fetching:", error));
  }, [id]);
  const downloadAll = async () => {
    setisLoading(true);
    //Get DOC
    if (contribution.imageId) {
      await fetch(`${VITE_WEBSERVICE_URL}/document/${contribution.documentId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob(); // Get the response as a blob
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "wordfile.docx";
          document.body.appendChild(a);
          a.click(); // Trigger the download
          document.body.removeChild(a); // Clean up
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }

    //GET Images
    if (contribution.imageId) {
      await fetch(`${VITE_WEBSERVICE_URL}/image/${contribution.imageId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob(); // Get the response as a blob
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "image.jpg"; // Specify the filename you want to download the image as
          document.body.appendChild(a);
          a.click(); // Trigger the download
          document.body.removeChild(a); // Clean up
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }

    setisLoading(false);
    toast({
      description: "Download Success",
    });
  };
  if (!contribution) {
    return <div>There's nothing to show here.</div>;
  }

  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col">
        <h2 className="h3-bold md:h2-bold text-left w-full pb-14">
          {contribution?.title}
        </h2>
        <div className={"flex gap-2"}>
          <p className="subtle-semibold lg:small-regular text-light-3 whitespace-nowrap">
            {contribution?.createdAt}
          </p>
          <p className="subtle-semibold lg:small-regular text-light-3">
            {contribution?.status}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-7 justify-center w-full">
        <div className="flex flex-col gap-5">
          <ScrollArea className="h-[200] w-full rounded-lg border p-4">
            {contribution?.content}
          </ScrollArea>

          <div className="flex flex-col gap-1">
            <p className="base-medium lg:body-bold text-black text-right">
              {contribution?.uploadedUserName}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full gap-12">
          {contributionImage && (
            <img
              src={contributionImage}
              alt="image"
              // height={500}
              // width={500}
              className="object-contain w-[1000px] h-[500px]"
            />
          )}

          {contributionFile && docs && (
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              style={{ height: 900, width: 900 }}
              prefetchMethod="GET"
            />
          )}
          <div className="flex flex-row justify-center items-center w-full gap-12">
            {userData.role !== "GUEST" && (
              <Button
                onClick={() => downloadAll()}
                className={` h-12 bg-light-1 px-5 text-black flex-center gap-2 border rounded-lg border-dark-2 p-4 w-fit`}>
                {isLoading && <Loader />}
                {!isLoading && (
                  <>
                    <img
                      src={"/assets/icons/file.png"}
                      alt="edit"
                      width={20}
                      height={20}
                    />
                    <p className="flex whitespace-nowrap small-medium">
                      Download All
                    </p>
                  </>
                )}
              </Button>
            )}
            {userData.userId.toString() ===
              `${contribution.uploadedUserId}`.toString() && `${contribution.status}` !== "FINAL_CLOSED" && (
              <Link
                className={"hover:bg-black hover:text-white h-12 bg-light-1 px-5 text-black flex-center gap-2 border rounded-lg border-dark-2 p-4 w-fit"}
                to={`/contribution-edit/${contribution.id}`}>
                <PenSquare className="flex flex-row mr-2" />
                Edit
              </Link>
            )}
          </div>

          <div className="flex flex-col w-full pt-7 gap-3">
            <p className="h2-bold md:h3-bold mb-2">Comment</p>
            <ContributionComment contribution={contribution} />
          </div>

          {userData.role === "COORDINATOR" &&
            contribution.status === "FINAL_CLOSED" && (
              <div className={"flex gap-4"}>
                <button
                  className="bg-green-700 border border-black p-4 rounded hover:bg-green-400"
                  onClick={() => handleApprovedContribution()}>
                  Approve
                </button>
                <button
                  className="bg-orange-700 border border-black p-4 rounded hover:bg-red"
                  onClick={() => handleRejectedContribution()}>
                  Reject
                </button>
              </div>
            )}
          {userData.role === "COORDINATOR" &&
            contribution.status === "APPROVED" && (
              <div className={"flex gap-4"}>
                <button
                  className="bg-green-700 border border-black p-4 rounded hover:bg-green-400"
                  onClick={() => handlePublishedContribution()}>
                  Publish
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default ContributionDetails;
