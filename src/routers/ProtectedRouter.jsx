
import UserAuth from "../custom-hooks/userAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
    const { currentUser } = UserAuth();
    return currentUser ? <Outlet/> : <Navigate to="/login" />;
};



export default ProtectedRouter;
