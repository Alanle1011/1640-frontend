import ContributionDetails from "@/components/forms/ContributionDetails";
import { Button } from "@/components/ui";
import { ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewContribution = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <img
              src="/assets/icons/edit.svg"
              width={36}
              height={36}
              alt="details"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">
              Contribution Details
            </h2>
          </div>
          <ContributionDetails />
        </div>
      </div>
  );
};

export default ViewContribution;
