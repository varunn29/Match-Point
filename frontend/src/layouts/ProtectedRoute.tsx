import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute() {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    if (authContext === null) {
        throw new Error(
            "ProtectedRoute must be used inside AuthProvider."
        );
    }

    const { user, isLoading } = authContext;

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#070d13] text-white">
                <p>Checking your session...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return <Outlet />;
}

export default ProtectedRoute;