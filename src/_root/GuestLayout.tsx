import { Outlet } from "react-router-dom";

import { Bottombar, LeftSidebar, Topbar } from "@/components/shared";
import { ILoginUser } from "@/types";

const GuestLayout: React.FC<{ userData: ILoginUser }> = ({ userData }) => {

  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar userData={userData} />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar userData={userData} />
    </div>
  );
};

export default GuestLayout;
