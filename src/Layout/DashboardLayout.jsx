import { Outlet, useNavigate } from "react-router";

import {
    IconBell,
    IconLogout2,
    IconSearch
} from "@tabler/icons-react";

import Sidebar from "../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/AuthActions";
import { useEffect } from "react";
import toast from "react-hot-toast";

function DashboardLayout() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const auth = useSelector((state) => state.auth.form)
    console.log("dashboard :", auth)

    const role = auth.role;

    const handleLogout = () => {

        dispatch(logoutUser());

        clearAuth();

        toast.success("Logged Out");

        navigate("/", { replace: true });

    };

    return (

        <div className="d-flex bg-body-tertiary">

            {/* Sidebar */}

            <Sidebar role={role} />

            {/* Main */}

            <main className="flex-grow-1">

                {/* Header */}

                <header className="bg-white border-bottom">

                    <div className="container-fluid m-2 py-1">

                        <div className="d-flex justify-content-between align-items-center">

                            {/* Left */}
                            <div>
                                <h3 className="display-sm mb-1">Dashboard</h3>
                                <div className="text-body-secondary">Welcome back !</div>
                            </div>

                            {/* Right */}

                            <div className="d-flex align-items-center gap-3">

                                {/* Search
                                <div
                                    className="input-group"
                                    style={{ width: "260px" }}
                                >

                                    <span className="input-group-text bg-white">

                                        <IconSearch size={18} />

                                    </span>

                                    <input
                                        className="form-control"
                                        placeholder="Search..."
                                    />

                                </div> */}

                                {/* Notification */}
                                <button className="btn btn-light rounded-circle">
                                    <IconBell size={20} />
                                </button>

                                {/* User */}
                                <div className="dropdown">
                                    <button
                                        className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                                        data-bs-toggle="dropdown"
                                    >
                                        <div
                                            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "38px",
                                                height: "38px"
                                            }}
                                        >
                                            {auth.username.slice(0, 1)}
                                        </div>
                                        <span>{auth.username}</span>

                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-end">
                                        {/* <li><button className="dropdown-item">Profile</button></li>
                                        <li><button className="dropdown-item">Settings</button></li>
                                        <li><hr className="dropdown-divider" /></li> */}
                                        <li><button className="dropdown-item text-danger" onClick={() => handleLogout()}>
                                            <div className="d-flex flex-grow-1 justify-content-around align-items-center">
                                                Logout 
                                                <IconLogout2 size={18} />
                                            </div>
                                            
                                        </button>
                                        </li>
                                    </ul>

                                </div>

                            </div>

                        </div>

                    </div>

                </header>

                {/* Content */}

                <section className="container-fluid p-4">

                    <Outlet />

                </section>

            </main>

        </div>

    );

}

export default DashboardLayout;