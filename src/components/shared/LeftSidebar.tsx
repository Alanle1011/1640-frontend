import { Link, NavLink, useLocation } from "react-router-dom";

import {
  adminSidebarLinks,
  managerSidebarLinks,
  sidebarLinks,
} from "@/constants";
import { ILoginUser, INavLink } from "@/types";
import { Button } from "../ui";

const LeftSidebar: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  const { pathname } = useLocation();
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

  function handleSignOut(): void {
    localStorage.clear();
    window.location.reload();
  }

  if (userData.role === "ADMIN") {
    return (
      <nav className="leftsidebarThinh">
        <div className="flex flex-col gap-11">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src={"/assets/images/logo.png"}
              alt="logo"
              width={170}
              height={36}
            />
          </Link>
          <Link to="/profile" className="flex gap-3 items-center">
            <img
              src={
                userData.imageId
                  ? `${VITE_WEBSERVICE_URL}/image/${userData.imageId}`
                  : "/assets/icons/profile-placeholder.svg"
              }
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{userData.name}</p>
              <p className="small-regular text-light-3">
                Role: {userData.role}
              </p>
            </div>
          </Link>

          <ul className="flex flex-col gap-6">
            {adminSidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;

              return (
                <li
                  key={link.label}
                  className={`leftsidebar-link group ${
                    isActive && "bg-primary-500"
                  }`}>
                  <NavLink
                    to={link.route}
                    className="flex gap-4 items-center p-4">
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      className={`group-hover:invert-white w-6 h-6 ${
                        isActive && "invert-white"
                      }`}
                    />
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => handleSignOut()}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </nav>
    );
  } else if (userData.role === "COORDINATOR" || userData.role === "MANAGER") {
    return (
      <nav className="leftsidebarThinh">
        <div className="flex flex-col gap-11">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src="/assets/images/logo.png"
              alt="logo"
              width={170}
              height={36}
            />
          </Link>
          <Link to="/profile" className="flex gap-3 items-center">
            <img
              src={
                userData.imageId
                  ? `${VITE_WEBSERVICE_URL}/image/${userData.imageId}`
                  : "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{userData.name}</p>
              <p className="small-regular text-light-3">
                Role: {userData.role}
              </p>
            </div>
          </Link>

          <ul className="flex flex-col gap-6">
            {managerSidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;

              return (
                <li
                  key={link.label}
                  className={`leftsidebar-link group ${
                    isActive && "bg-primary-500"
                  }`}>
                  <NavLink
                    to={link.route}
                    className="flex gap-4 items-center p-4">
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      className={`group-hover:invert-white w-6 h-6 ${
                        isActive && "invert-white"
                      }`}
                    />
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => handleSignOut()}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </nav>
    );
  } else if (userData.role === "GUEST") {
    return (
      <nav className="leftsidebarThinh">
        <div className="flex flex-col gap-11">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src="/assets/images/logo.png"
              alt="logo"
              width={170}
              height={36}
            />
          </Link>
          <Link to="/profile" className="flex gap-3 items-center">
            <img
              src={
                userData.imageId
                  ? `${VITE_WEBSERVICE_URL}/image/${userData.imageId}`
                  : "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold w-32">{userData.name}</p>
              <p className="small-regular text-light-3">
                Role: {userData.role}
              </p>
            </div>
          </Link>
        </div>

        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => handleSignOut()}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </nav>
    );
  } 
  return (
    <nav className="leftsidebarThinh">
      <div className="flex flex-col gap-11 ">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.png"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to="/profile" className="flex gap-3 items-center">
          <img
            src={
              userData.imageId
                ? `${VITE_WEBSERVICE_URL}/image/${userData.imageId}`
                : "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{userData.name}</p>
            <p className="small-regular text-light-3">Role: {userData.role}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white w-6 h-6 ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => handleSignOut()}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
