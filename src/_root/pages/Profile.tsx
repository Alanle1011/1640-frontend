import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { Button } from "@/components/ui";
import { GridPostList } from "@/components/shared";
import { ILoginUser } from "@/types";

const Profile: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  const { pathname } = useLocation();

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
            <div>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
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
