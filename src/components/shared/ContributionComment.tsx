import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Contribution } from "@/types";
import { Loader } from "lucide-react";

export type Comment = {
  id: string;
  content: string;
  coordinatorName: string;
  createdAt: string;
};
const ContributionComment: React.FC<{ contribution: Contribution }> = ({
  contribution,
}) => {
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
  const [commentData, setCommentData] = useState<Comment[]>();

  useEffect(() => {
    if(contribution){
      fetch(`${VITE_WEBSERVICE_URL}/comment/contribution/${contribution.id}`, {
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
          setCommentData(data);
        });
    }
  }, [contribution]);

  console.log("commentData", commentData);

  if (!contribution || !commentData || commentData.length < 1) {
    <div className="flex flex-1">
      <div className="flex-start gap-3 justify-start w-full px-5 fixed bg-blue-500 border-topbar">
        <img src="/assets/icons/edit.svg" width={36} height={36} alt="edit" />
        <h2 className="h3-bold_comment md:h2-bold_comment text-left w-full text-black">
          Contribution Comment
        </h2>
      </div>
      <div>
        <h2 className="h3-bold_comment md:h2-bold_comment text-left w-full text-black">
          There are no comments yet
        </h2>
      </div>
    </div>;
  }

  return (
    <div className="flex flex-1">
      <div className="flex-start gap-3 justify-start w-full px-5 fixed bg-blue-500 border-topbar">
        <img src="/assets/icons/edit.svg" width={36} height={36} alt="edit" />
        <h2 className="h3-bold_comment md:h2-bold_comment text-left w-full text-black">
          Contribution Comment
        </h2>
      </div>
      <ul className="flex flex-col flex-1 gap-9 w-full ">
        {commentData?.map((comment: Comment) => (
          <li key={comment?.id} className="flex justify-center w-full">
            <div className="shad-input border-input">
              <p> {comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContributionComment;
