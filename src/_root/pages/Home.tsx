import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ContributionCard } from "@/components/shared";
import { ILoginUser } from "@/types";
export type Contribution = {
  id: string;
  content: string;
  title: string;
  uploadedUserId: string;
  imageId: string;
  documentId: string;
  updatedAt: string;
  uploadedUserName: string;
  submissionPeriod: string;
};

export type Image = {
  id: string;
  imageId: File[];
};

export type Document = {
  id: string;
  documentId: File[];
};

const Home: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

  const [contributionData, setContributionData] = useState<Contribution[]>();
  const [imageData, setImageData] = useState<Image[]>();
  const [documentData, setDocumentData] = useState<Document[]>();

  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/contribution`, {
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
        setImageData(data);
        setDocumentData(data);
      });
  }, []);

  console.log("contributionData", contributionData);
  console.log("imageData", imageData);
  console.log("documentData", documentData);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-contributions">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>

          <ul className="flex flex-col flex-1 gap-9 w-full ">
            {contributionData?.map((contribution: Contribution) => (
              <li key={contribution.id} className="flex justify-center w-full">
                <ContributionCard contribution={contribution}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
