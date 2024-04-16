import { Outlet } from "react-router-dom";

import { ILoginUser } from "@/types";
import { Button } from "@/components/ui";
import { ChevronsLeft } from "lucide-react";

const GuestLayout: React.FC<{ userData: ILoginUser }> = ({ userData }) => {

  if (!["COORDINATOR", "MANAGER", "ADMIN", "STUDENT"].includes(userData.role)) {
    return <div className="w-full md:flex"></div>;
  }
  return (
    <div className="w-full md:flex">
      <section className="flex h-full">
        <Outlet />
      </section>
    </div>
  );
};

export default GuestLayout;
