import ContributionForm from "@/components/forms/ContributionForm";
import { Button } from "@/components/ui";
import { ILoginUser } from "@/types";
import { ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateContribution: React.FC<{ userData: ILoginUser }> = ({
  userData,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1">
      <div className=" hidden lg:flex-start">
        <Button
          size="icon"
          variant="ghost"
          className="h-full w-20"
          onClick={() => navigate(-1)}>
          <ChevronsLeft />
        </Button>
      </div>

      <div className="custom-topbar">
        <img
          src="/assets/icons/user-add.svg"
          width={36}
          height={36}
          alt="add"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full text-black">
          Create Contribution
        </h2>
      </div>
      <div className="common-container mt-14">
        <ContributionForm userData={userData} />
      </div>
    </div>
  );
};

export default CreateContribution;
