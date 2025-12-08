import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

import { AuthContext } from "../../contexts/AuthContext";

const AdminGuard = ({
    children,
}) => {
    const { isAdmin } = useContext(AuthContext);
    
    if (!isAdmin) {
        return <Navigate to="/404" />;
    }

    return children ? children : <Outlet />
};

export default AdminGuard;