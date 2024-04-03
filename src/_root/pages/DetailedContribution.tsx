import ContributionDetailedForm from "@/components/forms/ContributionDetailedForm";
import {Button} from "@/components/ui";
import {useNavigate} from "react-router-dom";

const DetailedContribution = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 justify-start w-full">
                    <Button
                        type="button"
                        className="shad-button_primary_4"
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <img
                        src="/assets/icons/edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Contribution Details</h2>
                </div>
                <ContributionDetailedForm/>
            </div>
        </div>
    );
};

export default DetailedContribution;