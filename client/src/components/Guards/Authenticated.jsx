import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

import { AuthContext } from "../../contexts/AuthContext";

const AuthenticatedGuard = ({
    children,
}) => {
    const { isAuthenticated } = useContext(AuthContext);
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children ? children : <Outlet />
};

export default AuthenticatedGuard;