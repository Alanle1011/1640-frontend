import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui";
import { useParams } from "react-router-dom";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

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

  return (
    <div>
      <h2 className="h3-bold md:h2-bold text-left w-full">
        {contribution?.title}
      </h2>
      <div className="flex flex-col">
        <p className="base-medium lg:body-bold text-black">
          {contribution?.uploadedUserName} - {contribution?.uploadedUserId}
        </p>
        <div className="flex gap-2 text-light-3">
          <p className="subtle-semibold lg:small-regular">
            {contribution?.createdAt}
          </p>
        </div>
      </div>

      {contributionImage && (
        <div>
          <div>
            <h1>Image</h1>
          </div>
          <div className="flex flex-1 justify-center w-full h-full p-2 lg:p-5">
            <img
              src={contributionImage}
              alt="image"
              className="object-contain w-[500px] h-[500px] "
            />
          </div>
        </div>
      )}
      <div>
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          {contribution?.content}
        </ScrollArea>
      </div>
      {contributionFile && docs && (
        <div>
          <div>
            <h1>Documents Demo</h1>
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              style={{ height: 1000 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ContributionDetails;
