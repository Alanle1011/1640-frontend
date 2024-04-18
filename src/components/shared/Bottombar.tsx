import { Link, useLocation } from "react-router-dom";

import { adminBottombarLinks, bottombarLinks } from "@/constants";
import { ILoginUser } from "@/types";

const Bottombar: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  const { pathname } = useLocation();

  if (userData.role === "STUDENT") {
    return (
      <section className="bottom-bar">
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              key={`bottombar-${link.label}`}
              to={link.route}
              className={`${
                isActive && "rounded-[10px] bg-primary-500"
              } flex-center flex-col gap-1 p-2 transition`}>
              <img
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className={`${isActive && "invert-white"}`}
              />

              <p className="tiny-medium text-black">{link.label}</p>
            </Link>
          );
        })}
      </section>
    );
  } else if (userData.role === "COORDINATOR") {
    return (
      <section className="bottom-bar">
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              key={`bottombar-${link.label}`}
              to={link.route}
              className={`${
                isActive && "rounded-[10px] bg-primary-500"
              } flex-center flex-col gap-1 p-2 transition`}>
              <img
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className={`${isActive && "invert-white"}`}
              />

              <p className="tiny-medium text-black">{link.label}</p>
            </Link>
          );
        })}
      </section>
    );
  }
  return (
    <section className="bottom-bar">
      {adminBottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive && "rounded-[10px] bg-primary-500"
            } flex-center flex-col gap-1 p-2 transition`}>
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`group-hover:invert-white w-6 h-6 ${
                isActive && "invert-white"
              }`}
            />

            <p className="tiny-medium text-black">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
