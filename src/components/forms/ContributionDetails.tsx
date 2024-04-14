import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui";
import { useParams } from "react-router-dom";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { ContributionComment } from "../shared";

const ContributionDetails = () => {
  const { id } = useParams();

  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

  const [contribution, setContribution] = useState<any>(null);
  const [contributionImage, setContributionImage] = useState<string>();
  const [contributionFile, setContributionFile] = useState<string>();
  const [contributionFileType, setContributionFileType] = useState<string>();

  const docs = [{ uri: contributionFile, fileType: contributionFileType }];

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
        }
      })
      .catch((error) => console.error("Error fetching:", error));
  }, [id]);

  if (!contribution) {
    return <div>There's nothing to show here.</div>;
  }

  return (
    <div className="home-container">
      <div className="home-contributions">
        {" "}
        <h2 className="h3-bold md:h2-bold text-left w-full pb-10">
          {contribution?.title}
        </h2>
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="base-medium lg:body-bold text-black">
                {contribution?.uploadedUserName} -{" "}
                {contribution?.uploadedUserId}
              </p>
              <p className="subtle-semibold lg:small-regular text-light-3">
                {contribution?.createdAt}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {contributionImage && (
              <div>
                <img
                  src={contributionImage}
                  alt="image"
                  height={500}
                  width={500}
                  // className="object-contain w-[500px] h-[500px]"
                />
              </div>
            )}
            <ScrollArea className="h-[] w-[400px] rounded-lg ">
              {contribution?.content}
            </ScrollArea>
            {contributionFile && docs && (
              <div>
                <h2 className="h3-bold md:h2-bold pb-3">Document</h2>
                <DocViewer
                  documents={docs}
                  pluginRenderers={DocViewerRenderers}
                  // style={{ height: 500 }}
                />
              </div>
            )}
          </div>
        </div>
        <ContributionComment contribution={contribution} />
      </div>
    </div>
  );
};
export default ContributionDetails;
