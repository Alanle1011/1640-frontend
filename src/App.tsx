import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  AllUsers,
  CreateContribution,
  EditPost,
  Home,
  PostDetails,
  Profile,
  UpdateProfile,
} from "@/_root/pages";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/SigninForm";

const App = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("loginStatus")|| '""') ; 
    if (items) {
      setUserData(items);
    }
  }, []);
  if (!userData) {
    return (
      <main className="flex h-screen">
        <Routes>
          <Route element={<AuthLayout />}>
          <Route index element={<SigninForm />} />
          <Route path="/sign-in" element={<SigninForm />} />
          </Route>
        </Routes>
      </main>
    );
  } else
  return (
    <main className="flex h-screen">
      <Routes>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-contribution" element={<CreateContribution />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
