import { Routes, Route } from "react-router-dom";

import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";

import RootLayout from "./_root/RootLayout";
import { CreatePost, EditPost, Empty, Home, PostDetails, Profile, UpdateProfile, UsersList, ContributionsList } from "@/_root/pages";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

import { DataTable } from "./contributions/DataTable";

import UserComponent from "./contributions/UserComponent";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />

          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/contributions" element={<ContributionsList />} />
          <Route path="/admin/congrats" element={<Empty />} />
          {/* <Route path="/contribution" element={<Contribution />} /> */}
          <Route path="/contribution" element={<DataTable columns={[]} data={[]} />} />
          <Route path="/user-component" element={<UserComponent />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
