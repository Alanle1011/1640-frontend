import { ContributionCard, GridList } from "@/components/shared";
import { useToast } from "@/components/ui/use-toast";
import { ILoginUser } from "@/types";
import { useState, useEffect } from "react";
export type Contribution = {
  id: string;
  content: string;
  title: string;
  uploadedUserId: string;
  imageId: string;
  documentId: string;
  updatedAt: string;
  uploadedUserName: string;
  // faculty:string;
  submissionPeriod: string;
  doc: Document;
};


export type Document = {
  id: string;
  document: File[];
};

const MyContribution: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

  const [contributionData, setContributionData] = useState<Contribution[]>([]);
  const [documentData, setDocumentData] = useState<Document[]>();

  //contributionData = array of Contribution
  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/contribution/user/${userData.userId}`, {
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
      });
  }, []);

  console.log("contributionData", contributionData);
  console.log("documentData", documentData);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-contributions">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            My Contributions
          </h2>

          <ul className="flex flex-col flex-1 gap-9 w-full ">
              <GridList contribution={contributionData} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyContribution;
