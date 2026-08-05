import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

function ProtectedRoute() {

    const { initialized, form } = useSelector(state => state.auth);

    if (!initialized) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" />
            </div>
        );
    }

    if (!form.token) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;