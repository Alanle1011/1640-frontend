import UserForm from "@/components/forms/UserForm.tsx";
import React from "react";

const CreateSubmission = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create New Submission</h2>
        </div>

        <UserForm />
      </div>
    </div>
  );
};

export default CreateSubmission;
