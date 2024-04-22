import { useEffect, useState } from "react";
import { ContributionCard, Loader } from "@/components/shared";
import { ILoginUser } from "@/types";

export type Contribution = {
  createdAt: string;
  status: string;
  id: string;
  content: string;
  title: string;
  uploadedUserId: string;
  imageId: string;
  documentId: string;
  updatedAt: string;
  uploadedUserName: string;
  faculty: string;
  submissionPeriod: string;
  documentName: string;
  documentType: string;
  doc: Document;
  uploadedUserImageId: string;
};

export type Document = {
  id: string;
  document: File[];
};

const Home: React.FC<{ userData?: ILoginUser }> = ({ userData }) => {
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

  const [contributionData, setContributionData] = useState<Contribution[]>();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    fetch(`${VITE_WEBSERVICE_URL}/contribution/getPublished`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setContributionData(data);
        setisLoading(false); // Update after data is received
      });
  }, []);

  console.log("contributionData", contributionData);
  console.log("userData", userData);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-contributions">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Page</h2>
          {isLoading && <Loader></Loader>}

          {!isLoading && contributionData && (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {contributionData?.map((contribution: Contribution) => (
                <li
                  key={contribution.id}
                  className="flex justify-center w-full">
                  <ContributionCard contribution={contribution} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
