import { Route, Routes } from "react-router-dom";

import { CreatePost, EditPost, Empty, Home, PostDetails, Profile, UpdateProfile, UsersList, } from "@/_root/pages";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

import ContributionForm from "./components/forms/ContributionForm";
import ContributionsList from "./_root/pages/ContributionsList";

const App = () => {
    return (
        <main className="flex h-screen">
            <Routes>
                {/* public routes */}
                {/* <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route> */}

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
                </Route>
            </Routes>

            <Toaster />
        </main>
    );
};

export default App;
