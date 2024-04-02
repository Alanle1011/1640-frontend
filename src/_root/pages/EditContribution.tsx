import { useParams } from "react-router-dom";
import ContributionEditForm from "@/components/forms/ContributionEditForm";

const EditContribution = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Contribution Editing</h2>
        </div>

        <ContributionEditForm />
      </div>
    </div>
  );
};

export default EditContribution;