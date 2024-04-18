import { Link } from "react-router-dom";

import { Contribution } from "@/_root/pages/Home";
import { ScrollArea } from "@/components/ui";

const ContributionCard: React.FC<{ contribution: Contribution }> = ({
  contribution,
}) => {
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

  if (!contribution.uploadedUserId) return <div>No Contribution</div>;
  console.log(contribution.uploadedUserImageId);
  return (
    <div className="contribution-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${contribution.uploadedUserId}`}>
            <img
              src={
                contribution.uploadedUserImageId
                  ? `${VITE_WEBSERVICE_URL}/image/${contribution.uploadedUserImageId}`
                  : "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-black">
              {contribution.uploadedUserName} - {contribution.uploadedUserId}
            </p>
            <div className="flex gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {contribution.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Link to={`/contribution-details/${contribution.id}`}>
        <div className="small-medium lg:base-medium py-3">
          <p className="base-medium lg:body-bold text-black">
            {contribution?.title}
          </p>
          <ScrollArea className="h-[40px] w-full md:h-[100px] rounded-lg ">
            {contribution?.content}
          </ScrollArea>
          <ul className="flex gap-1 mt-2">
            <li className="text-light-3 small-regular">
              #{contribution.faculty}
            </li>
          </ul>
        </div>

        {contribution.imageId && (
          <div>
            <img
              src={`${VITE_WEBSERVICE_URL}/image/${contribution.imageId}`}
              alt="contribution image"
              className="contribution-card_img"
            />
          </div>
        )}

        {contribution.documentType && (
          <div className="small-medium lg:base-medium py-3 flex items-center border rounded-lg border-dark-2 p-4 w-fit">
            <>
              {contribution.documentType === "docx" && (
                <img
                  src="/assets/icons/docx-file.png"
                  className="w-7 h-full mr-3"
                  title="docx icons"
                />
              )}
              {contribution.documentType === "pdf" && (
                <img
                  src="/assets/icons/pdf.png"
                  className="w-7 h-full mr-3"
                  title="pdf icons"
                />
              )}
              <p>{contribution.documentName}</p>
            </>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ContributionCard;
