import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Contribution, ILoginUser } from "@/types";
import { Loader } from "lucide-react";
import { Button, Textarea, toast } from "../ui";

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
  const [userData, setUserData] = useState<ILoginUser>(
    // @ts-ignore
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [commentData, setCommentData] = useState<Comment[]>();
  const [content, setContent] = useState<string>()

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const submitNewComment = () => {
    if (content) {
      fetch(`${VITE_WEBSERVICE_URL}/comment?coordinatorId=${userData.userId}&contributionId=${contribution.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          content: content
        })
      })
      toast({
        description: "Comment sent.",
      })
      window.location.reload();
    }
  }

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
  }, [contribution, setContent]);

  if (!contribution || !commentData || commentData.length < 1) {
    return (
      <div className="w-full flex flex-col gap-5">
        <p className="base-semibold mt-5 text-left text-black">
          There are no comments yet.
        </p>

        {userData.role === "COORDINATOR" && (
          <div className="flex flex-col gap-3">
            <Textarea
              placeholder="Please type comment..."
              onChange={handleChangeContent} />
            <Button
              className="button_view"
              onClick={() => submitNewComment()}
            >
              Send
            </Button>
          </div>
        )}
      </div>
    )
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {commentData && commentData?.map((comment: Comment) => (
        <div
          key={comment?.id}
          className="flex flex-col gap-1 justify-center w-full">
          <div className="flex flex-row gap-3 justify-between items-center">
            <p className="base-semibold">{comment?.coordinatorName}</p>
            <p className="small-regular text-light-3">{comment?.createdAt}</p>
          </div>
          <div>
            <p className="small-semibold text-slate-500 ml-1">{comment?.content}</p>
          </div>
        </div>
      ))}

      {userData.role === "COORDINATOR" && (
        <div className="flex flex-col gap-3">
          <Textarea
            placeholder="Please type comment..."
            onChange={handleChangeContent} />
          <Button
            className="button_view"
            onClick={() => submitNewComment()}
          >
            Send
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContributionComment;
