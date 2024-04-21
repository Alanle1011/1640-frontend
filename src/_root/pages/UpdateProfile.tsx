
import UpdateProfileForm from "@/components/forms/UpdateProfileForm.tsx";
import {ILoginUser} from "@/types";


const UpdateProfile : React.FC<{ userData: ILoginUser }> = ({ userData }) => {
    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 justify-start w-full">
                    <img
                        src="/assets/icons/user-edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Edit User</h2>
                </div>

                <UpdateProfileForm userData={userData}/>
            </div>
        </div>
    );
};

export default UpdateProfile;
