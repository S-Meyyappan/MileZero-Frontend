import { Navigate, Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { logoutUser } from "../store/actions/AuthActions";

function AuthenticateUser() {

    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {

        const verifyUser = async () => {

            if (!auth.form.token) { return }

            try {

                const response = await axios.get( "http://localhost:8080/api/auth/check-user",
                    {
                        headers: {
                            Authorization: `Bearer ${auth.form.token}`
                        }
                    }
                )

                const { username, role } = response.data;

                if ( username !== auth.form.username || role !== auth.form.role) {
                    dispatch(logoutUser());
                }

            } catch (error) {

                if (error.response?.status === 401) {
                    dispatch(logoutUser());
                } 
                else {
                    toast.error( error.response?.data?.message || "Unable to authenticate user")
                }
            }
        }

        verifyUser();

    }, [auth.form.token, auth.form.username, auth.form.role, dispatch]);


    if (!auth.initialized) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" />
            </div>
        );
    }

    if (!auth.form.token) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
}

export default AuthenticateUser;