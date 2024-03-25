import { Route, Routes } from "react-router-dom";
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
import { useEffect, useState } from "react";

const App = () => {
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated") || false
  )

  useEffect(() => {
    const items = localStorage.getItem("authenticated");
    // @ts-ignore
    if (items === true) {
      // @ts-ignore
      setauthenticated(true);
    }
  })

  if (!authenticated) {
    return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <main className="flex h-screen">
        <Routes>
          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route
              path="/create-contribution"
              element={<CreateContribution />}
            />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    );
  }
};

export default App;
