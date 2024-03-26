import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

const Home = () => {
    // const { toast } = useToast();

    const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated") || false);

    useEffect(() => {
        const items = localStorage.getItem("authenticated");
        // @ts-ignore
        if (items === true) {
            // @ts-ignore
            setauthenticated(true);
        }
    });

    if (!authenticated ) {
        return <Navigate replace to="/sign-in"/>;
    } else {
        return (
            <div className="flex flex-1">
                home
            </div>

        )
    }
};

export default Home;
