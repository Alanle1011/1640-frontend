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
    if (contribution) {
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
    <div className="w-full">
      <h2 className="h3-bold_comment md:h2-bold_comment text-left w-full text-black">
        There are no comments yet
      </h2>
    </div>
  };

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-9 w-full ">
        {commentData?.map((comment: Comment) => (
          <li key={comment?.id} className="flex justify-center w-full">
            {/* <div className="shad-input border-input"> */}
            <p>{comment?.content}</p>
            <p>trenphyr</p>
            {/* </div> */}
          </li>
        ))}
      </ul>
      <p>Comment Section</p>
    </div>
  );
};

export default ContributionComment;
