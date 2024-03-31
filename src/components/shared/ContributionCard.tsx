import { Link } from "react-router-dom";

import { multiFormatDateString } from "@/lib/utils";
import { Contribution } from "@/_root/pages/Home";

const ContributionCard: React.FC<{ contribution: Contribution }> = ({
  contribution,
}) => {
  if (!contribution.uploadedUserId) return;

  return (
    <div className="contribution-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${contribution.uploadedUserId}`}>
            <img
              src={"/assets/icons/profile-placeholder.svg"}
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

      <Link to={`/contributions/`}>
        <div className="small-medium lg:base-medium py-5">
        <p>{contribution.content}</p>
        <ul className="flex gap-1 mt-2">
              <li className="text-light-3 small-regular">
                #
                {/* {contribution.uploadedUserId.faculty} */}
              </li>
          </ul>
        </div>
        <img
          src={contribution.imageId || "/assets/icons/profile-placeholder.svg"}
          alt="contribution image"
          className="contribution-card_img"
        />
        {/* <img
          src={contribution.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="contribution image"
          className="contribution-card_img"
        /> */}
      </Link>

      {/* <contributionStats contribution={contribution} userId={user.id} /> */}
    </div>
  );
};

export default ContributionCard;
