import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { Button } from "@/components/ui";
import { GridList } from "@/components/shared";
import { ILoginUser } from "@/types";
import { useState, useEffect } from "react";

export type Contribution = {
  id: string;
  content: string;
  title: string;
  uploadedUserId: string;
  imageId: string;
  documentId: string;
  updatedAt: string;
  uploadedUserName: string;
  // faculty:string;
  submissionPeriod: string;
  doc: Document;
};

export type Document = {
  id: string;
  document: File[];
};

const Profile: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  const { pathname } = useLocation();

  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

  const [contributionData, setContributionData] = useState<Contribution[]>();
  const [documentData, setDocumentData] = useState<Document[]>();

  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/contribution/${userData.userId}`, {
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

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={"/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {userData.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @ {userData.email}
              </p>
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              @{userData.faculty}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div>
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-5xl w-full">
        <Link
          to={`/profile`}
          className={`profile-tab rounded-l-lg ${
            pathname === `/profile` && "!bg-dark-3"
          }`}>
          <img
            src={"/assets/icons/posts.svg"}
            alt="posts"
            width={20}
            height={20}
          />
          Posts
        </Link>
        <Link
          to={`/profile`}
          className={`profile-tab rounded-r-lg ${
            pathname === `/profile` && "!bg-dark-3"
          }`}>
          <img
            src={"/assets/icons/like.svg"}
            alt="like"
            width={20}
            height={20}
          />
          Liked Posts
        </Link>
      </div>
      <div className="home-container">
        <div className="home-contributions">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            My Contributions
          </h2>

          <ul className="flex flex-col flex-1 gap-9 w-full ">
          <GridList contribution={contributionData} />
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
