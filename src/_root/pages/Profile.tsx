import { Link, Outlet } from "react-router-dom";

import { ContributionCard, Loader } from "@/components/shared";
import { Button, useToast } from "@/components/ui";
import { ILoginUser } from "@/types";
import { useEffect, useState } from "react";

export type Contribution = {
  id: string;
  content: string;
  title: string;
  uploadedUserId: string;
  imageId: string;
  documentId: string;
  updatedAt: string;
  uploadedUserName: string;
  faculty: string;
  submissionPeriod: string;
  documentName: string;
  documentType: string;
  doc: Document;
};

export type Document = {
  id: string;
  document: File[];
};

const Profile: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
  const { toast } = useToast();

  const [contributionData, setContributionData] = useState<Contribution[]>();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/contribution/user/${userData.userId}`, {
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
        setContributionData(data);
      });
  }, []);

  console.log("contributionData", contributionData);

  const downloadAll = async () => {
    setisLoading(true);
    const response = await fetch(`${VITE_WEBSERVICE_URL}/database/export`);
    const blob = await response.blob();
    const filename = "all_data.zip";
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    const event = new CustomEvent("download-zip", {
      detail: { blob, filename },
    });
    window.dispatchEvent(event);

    const response1 = await fetch(
      `${VITE_WEBSERVICE_URL}/document/downloadAll`
    );
    const blob1 = await response1.blob();
    const filename1 = "doc.zip";
    const link1 = document.createElement("a");
    link1.href = URL.createObjectURL(blob);
    link1.download = filename1;
    link1.click();
    const event1 = new CustomEvent("doc-zip", {
      detail: { blob1, filename1 },
    });
    window.dispatchEvent(event1);

    const response2 = await fetch(`${VITE_WEBSERVICE_URL}/image/downloadAll`);
    const blob2 = await response2.blob();
    const filename2 = "image.zip";
    const link2 = document.createElement("a");
    link2.href = URL.createObjectURL(blob);
    link2.download = filename2;
    link2.click();
    const event2 = new CustomEvent("image-zip", {
      detail: { blob2, filename2 },
    });
    window.dispatchEvent(event2);
    setisLoading(false);
    toast({
      description: "Download Success",
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-4">
          <div className="relative">
            <img
              src={userData.imageId ? `${VITE_WEBSERVICE_URL}/image/${userData.imageId}` : "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="w-22 h-full lg:h-28 lg:w-28 rounded-full hover:bg "
            />
            <div className="hover:text-black hover:bg-[#0000004D] rounded-full text-transparent absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center">
              <button>Update Image</button>
            </div>
          </div>

          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {userData.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @ {userData.email}
              </p>
            </div>
            {userData.faculty && (
              <p className="small-medium md:base-medium text-center xl:text-left mt-3 max-w-screen-sm">
                @ {userData.faculty}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link
              to={`/update-profile`}
              className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`}>
              <img
                src={"/assets/icons/edit.svg"}
                alt="edit"
                width={20}
                height={20}
              />
              <p className="flex whitespace-nowrap small-medium">
                Edit Profile
              </p>
            </Link>
            {userData.role === "Manager" ||
              (userData.role === "ADMIN" && (
                <Button
                  onClick={() => downloadAll()}
                  className={` h-12 bg-light-1 px-5 text-black flex-center gap-2 border rounded-lg border-dark-2 p-4 w-fit`}>
                  {isLoading && <Loader />}
                  {!isLoading && (
                    <>
                      <img
                        src={"/assets/icons/file.png"}
                        alt="edit"
                        width={20}
                        height={20}
                      />
                      <p className="flex whitespace-nowrap small-medium">
                        Download All
                      </p>
                    </>
                  )}
                </Button>
              ))}
          </div>
        </div>
      </div>

      <div className="my-container">
        <div className="home-contributions">
          <ul className="flex flex-col flex-1 gap-9 w-full ">
            {contributionData?.map((contribution: Contribution) => (
              <li key={contribution.id} className="flex justify-center w-full">
                <ContributionCard contribution={contribution} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes> */}
      <Outlet />
    </div>
  );
};

export default Profile;
