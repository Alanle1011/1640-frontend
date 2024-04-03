import { Navigate, Route, Routes } from "react-router-dom";
import {
  AllUsers,
  CreateUser,
  EditUser,
  CreateContribution,
  // Empty,
  Home,
  Profile,
  UpdateProfile,
  PendingContribution,
  EditContribution,
  MyContribution,
  ContributionsList,
  // UsersList,
} from "@/_root/pages";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/SigninForm";
import React, { useEffect, useState } from "react";
import { ILoginUser } from "./types";
import ContributionDetails from "./_root/pages/ContributionDetails";
import AdminLayout from "./_root/AdminLayout";
import UserLayout from "./_root/UserLayout";
import ManagerLayout from "./_root/ManagerLayout";

const App = () => {
  const [userData, setUserData] = useState<ILoginUser>(
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
          {/* user routes */}
          <Route element={<UserLayout userData={userData} />}>
            <Route index element={<Home userData={userData} />} />
            <Route path="/sign-in" element={<Navigate replace to="/" />} />
            <Route
              path="/create-contribution"
              element={<CreateContribution userData={userData} />}
            />
            <Route
              path="/update-contribution"
              element={<EditContribution userData={userData} />}
            />
            <Route
              path="/contributions"
              element={<ContributionDetails userData={userData} />}
            />
            <Route path="/profile" element={<Profile userData={userData} />} />
            <Route
              path="/update-profile"
              element={<UpdateProfile userData={userData} />}
            />
            <Route
              path="/my"
              element={<MyContribution userData={userData} />}
            />
          </Route>
          <Route element={<AdminLayout userData={userData} />}>
            {/* admin routes */}
            <Route path="/users" element={<AllUsers />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/edit-user" element={<EditUser />} />
          </Route>
          <Route element={<ManagerLayout userData={userData} />}>
            {/* manager routes */}
            <Route path="/pending" element={<PendingContribution />} />
            <Route path="/contributions" element={<ContributionsList />} /> 
          </Route>
        </Routes>
        <Toaster />
      </main>
    );
  }
};

export default App;
