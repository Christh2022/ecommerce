import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase.config";

function UserAuth() {
    const [currentUser, setCurrentUser] = useState({});
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setShowInfo(true);
            } else setCurrentUser(user);
        });
    }, []);
    return { currentUser, showInfo, setShowInfo };
}

export default UserAuth;
