import UserForm from "@/components/forms/UserForm.tsx";
import { Button } from "@/components/ui";
import { ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate()

  return (
      <div className="flex flex-1">
          <div className="flex-start">
              <Button
                  size="icon"
                  variant="ghost"
                  className="h-full w-20"
                  onClick={() => navigate("/users")}>
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
              <h2 className="h3-bold md:h2-bold text-left w-full text-black">User Creating</h2>
          </div>
          <div className="common-container mt-14">
              <UserForm/>
          </div>
      </div>
  );
};

export default CreateUser;
