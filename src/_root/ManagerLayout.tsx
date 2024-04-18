import { Outlet } from "react-router-dom";

import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { ILoginUser } from "@/types";

const ManagerLayout: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  if (!["COORDINATOR", "MANAGER", "ADMIN"].includes(userData.role)) {
    window.history.back();
    window.location.reload();
  }

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

export default ManagerLayout;
