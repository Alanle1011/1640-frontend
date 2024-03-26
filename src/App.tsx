import { Route, Routes } from "react-router-dom";
import {
  AllUsers,
  CreateContribution,
  EditPost,
  // Empty,
  Home,
  PostDetails,
  Profile,
  UpdateProfile,
  // UsersList,
} from "@/_root/pages";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

// import ContributionForm from "./components/forms/ContributionForm";
// import ContributionsList from "./_root/pages/ContributionsList";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/SigninForm";
import { useEffect, useState } from "react";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>
        {/* user routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/admin/all-users" element={<AllUsers />} />
          <Route path="/create-contribution" element={<CreateContribution />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          {/* admin routes */}
          <Route path="/admin/users" element={<AllUsers />} />
          {/* <Route path="/admin/contributions" element={<ContributionsList />} /> */}
          {/* <Route path="/admin/congrats" element={<Empty />} /> */}
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
  // }
};

export default App;
