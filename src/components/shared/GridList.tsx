import { Contribution } from "@/_root/pages/MyContribution";
import { Link } from "react-router-dom";

const GridList: React.FC<{ contribution: Contribution[] }> = ({
  contribution,
}) => {
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
  return (
    <ul className="grid-container">
      {contribution.map((contribution: Contribution) => (
        <li key={contribution.id}>
          {contribution.imageId ? (
            <div className="relative min-w-80 h-80">
              <Link
                to={`/contribution-details/${contribution.id}`}
                className="grid-post_link">
                <div className="image-container">
                  <img
                    src={`${VITE_WEBSERVICE_URL}/image/${contribution.imageId}`}
                    className="h-full w-full object-cover"
                  />
                  <p className="line-clamp-1">
                    {contribution.uploadedUserName}
                  </p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="relative min-w-80 h-20">
              <Link
                to={`/contribution-details/${contribution.id}`}
                className="grid-post_link">
                <div className="image-container">
                  <p className="line-clamp-1">
                    {contribution.uploadedUserName}
                  </p>
                </div>
              </Link>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default GridList;
