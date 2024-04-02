import { useParams } from "react-router-dom";
import ContributionDetailedForm from "@/components/forms/ContributionDetailedForm";

const DetailedContribution = () => {
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
                    <h2 className="h3-bold md:h2-bold text-left w-full">Contribution Details</h2>
                </div>

                <ContributionDetailedForm />
            </div>
        </div>
    );
};

export default DetailedContribution;