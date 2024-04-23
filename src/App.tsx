import {
  ContributionsList,
  CreateContribution,
  CreateUser,
  EditContribution,
  EditUser,
  Home,
  PendingContribution,
  Profile,
  UpdateProfile,
  UsersList,
  ViewContribution,
} from "@/_root/pages";
import CreateSubmission from "@/_root/pages/CreateSubmission.tsx";
import EditSubmission from "@/_root/pages/EditSubmission.tsx";
import SubmissionList from "@/_root/pages/SubmissionList.tsx";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/SigninForm";
import AdminLayout from "./_root/AdminLayout";
import GuestLayout from "./_root/GuestLayout";
import ManagerLayout from "./_root/ManagerLayout";
import StudentLayout from "./_root/StudentLayout";
import "./globals.css";
import { ILoginUser } from "./types";
import Faculty from "@/_root/pages/Faculty.tsx";
import FalcultyList from "@/_root/pages/Faculty.tsx";
import CreateFaculty from "@/_root/pages/CreateFaculty.tsx";

const App = () => {
  const [userData, setUserData] = useState<ILoginUser>(
    // @ts-ignore
    JSON.parse(localStorage.getItem("userData")) || null
  );
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData") || '""');
    if (data) {
      setUserData(data);
    }
  }, []);
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated") || false
  );

  useEffect(() => {
    const items = localStorage.getItem("authenticated");
    // @ts-ignore
    if (items === true) {
      // @ts-ignore
      setauthenticated(true);
    }
  });
  console.log("authenticated", authenticated);

  if (!authenticated) {
    return (
      <main className="flex h-screen">
        <Navigate replace to="/sign-in" />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    );
  } else {
    return (
      <main className="flex h-screen">
        <Routes>
          {/* guest routes */}
          <Route element={<GuestLayout userData={userData} />}>
            <Route index element={<Home userData={userData} />} />
            <Route path="/sign-in" element={<Navigate replace to="/" />} />
            <Route
              path="/contribution-details/:id"
              element={<ViewContribution userData={userData} />}
            />
            <Route path="/profile" element={<Profile userData={userData} />} />
            <Route
              path="/update-profile"
              element={<UpdateProfile userData={userData} />}
            />
          </Route>
          {/* student routes */}
          <Route element={<StudentLayout userData={userData} />}>
            <Route
              path="/create-contribution"
              element={<CreateContribution userData={userData} />}
            />
            <Route
              path="/contribution-edit/:id"
              element={<EditContribution userData={userData} />}
            />
          </Route>
          <Route element={<ManagerLayout userData={userData} />}>
            {/* manager-coordinator routes */}
            <Route path="/pending" element={<PendingContribution />} />
            <Route path="/contributions" element={<ContributionsList />} />
          </Route>
          <Route element={<AdminLayout userData={userData} />}>
            {/* admin routes */}
            <Route path="/users" element={<UsersList />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/periods" element={<SubmissionList />} />
            <Route path="/create-submission" element={<CreateSubmission />} />
            <Route path="/edit-submission/:id" element={<EditSubmission />} />
            <Route path="/faculties" element={<FalcultyList />} />
            <Route path="/create-faculties" element={<CreateFaculty />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    );
  }
};

export default App;
