import { Navigate, Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { logoutUser } from "../store/actions/AuthActions";
import { checkUser } from "../utils/checkUser";

function AuthenticateUser({ allowedRoles = [] }) {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {

        if (!auth.initialized) {
            return;
        }

        const verify = async () => {

            if (!auth.form.token) {
                setChecking(false);
                return;
            }

            try {

                const result = await checkUser(auth.form.token,allowedRoles);

                if (!result.authenticated) {
                    dispatch(logoutUser());
                    return;
                }

                if (!result.authorized) {
                    setAuthorized(false);
                    setChecking(false);
                    return;
                }

                setAuthorized(true);
                setChecking(false);

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to authenticate user"
                );

                setChecking(false);
            }
        };

        verify();

    }, [
        auth.initialized,
        auth.form.token,
        dispatch,
        allowedRoles
    ]);

    // Redux is restoring localStorage
    if (!auth.initialized) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" />
            </div>
        );
    }

    // No token
    if (!auth.form.token) {
        return <Navigate to="/auth" replace />;
    }

    // Backend is checking token/role
    if (checking) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" />
            </div>
        );
    }

    // Logged in but not allowed
    if (!authorized) {
        return <Navigate to="/404" replace />;
    }

    return <Outlet />;
}

export default AuthenticateUser;