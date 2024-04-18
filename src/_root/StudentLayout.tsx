import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { ILoginUser } from "@/types";

const StudentLayout: React.FC<{userData: ILoginUser}> = ({userData}) => {
  
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar userData={userData}/>

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar  userData={userData}/>
    </div>
  );
};

export default StudentLayout;
