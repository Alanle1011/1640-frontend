import { Contribution } from "@/_root/pages/MyContribution";
import { Link } from "react-router-dom";

const GridList: React.FC<{ contribution: Contribution[] }> = ({
  contribution,
}) => {
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
  return (
    <ul className="grid-container">
      {contribution.map((contribution: Contribution) => (
        <li key={contribution.id} className="relative min-w-80 h-80">
          <Link
            to={`/contribution-details/${contribution.id}`}
            className="grid-post_link">
            <div className="image-container">
              {contribution.imageId ? (
                <img
                  src={`${VITE_WEBSERVICE_URL}/images/${contribution.imageId}`}
                  alt={contribution.title || "Contribution Image"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="line-clamp-1">{contribution.uploadedUserName}</p>
              )}
            </div>
          </Link>

          <div className="grid-contribution_user">
            <div className="flex items-center justify-start gap-2 flex-1">
              <img
                src={"/assets/icons/profile-placeholder.svg"}
                alt="creator"
                className="w-8 h-8 rounded-full"
              />
              <p className="line-clamp-1">{contribution.uploadedUserName}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridList;
