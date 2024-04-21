import ContributionDetails from "@/components/forms/ContributionDetails";
import { Button } from "@/components/ui";
import { ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ILoginUser } from "@/types";

const ViewContribution: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 w-full">
      <div className="hidden sm:flex flex-start">
        <Button
          size="icon"
          variant="ghost"
          className="h-full w-20"
          onClick={() => navigate("/contributions")}>
          <ChevronsLeft />
        </Button>
      </div>

      <div className="custom-topbar">
        <img
          src="/assets/icons/details.svg"
          width={36}
          height={36}
          alt="details"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full text-black">
          Contribution Details
        </h2>
      </div>
      <div className="custom-container mt-14">
        <ContributionDetails userData={userData} />
      </div>
    </div>
  );
};

export default ViewContribution;
