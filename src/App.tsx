import {Navigate, Route, Routes} from "react-router-dom";
import {
    AllUsers,
    ContributionsList,
    CreateContribution,
    CreateUser,
    DetailedContribution,
    EditContribution,
    EditUser,
    Home,
    MyContribution,
    PendingContribution,
    Profile,
    UpdateProfile,
} from "@/_root/pages";
import RootLayout from "./_root/RootLayout";
import {Toaster} from "@/components/ui/toaster";
import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/SigninForm";
import {useEffect, useState} from "react";
import {ILoginUser} from "./types";

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
                <Navigate replace to="/sign-in"/>
                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path="/sign-in" element={<SigninForm/>}/>
                    </Route>
                </Routes>
                <Toaster/>
            </main>
        );
    } else {
        return (
            <main className="flex h-screen">
                <Routes>
                    {/* user routes */}
                    <Route element={<RootLayout userData={userData}/>}>
                        <Route index element={<Home userData={userData}/>}/>
                        <Route path="/sign-in" element={<Navigate replace to="/"/>}/>
                        <Route
                            path="/create-contribution"
                            element={<CreateContribution/>}
                        />
                        <Route
                            path="/update-contribution"
                            element={<EditContribution/>}
                        />
                        {/*<Route*/}
                        {/*    path="/contributions"*/}
                        {/*    element={<PostDetails userData={userData}/>}*/}
                        {/*/>*/}
                        <Route
                            path="/profile"
                            element={<Profile userData={userData}/>}
                        />
                        <Route
                            path="/update-profile"
                            element={<UpdateProfile userData={userData}/>}
                        />
                        <Route
                            path="/my"
                            element={<MyContribution userData={userData}/>}
                        />
                        {/* admin routes */}
                        <Route path="/admin/users" element={<AllUsers/>}/>
                        <Route path="/admin/create-user" element={<CreateUser/>}/>
                        <Route path="/admin/user-edit/:id" element={<EditUser/>}/>
                        <Route path="/admin/pending" element={<PendingContribution/>}/>

                        <Route path="/admin/contributions" element={<ContributionsList/>}/>
                        <Route path="/admin/contribution-edit/:id" element={<EditContribution/>}/>
                        <Route path="/admin/contribution-details/:id" element={<DetailedContribution/>}/>
                        {/* <Route path="/admin/congrats" element={<Empty />} /> */}
                    </Route>
                </Routes>
                <Toaster/>
            </main>
        );
    }
};

export default App;
