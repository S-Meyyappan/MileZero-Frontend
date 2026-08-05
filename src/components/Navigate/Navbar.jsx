import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    IconCar,
    IconLogin2,
    IconUserPlus,
    IconMenu2,
    IconCoinMoneroFilled,
    IconUser
} from "@tabler/icons-react";
import { logoutUser } from "../../store/actions/AuthActions";
import { clearAuth } from "../../utils/authStorage";
import toast from "react-hot-toast";

import "../../css/Navbar.css"
import "../../App.css"

function Navbar() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const auth = useSelector((state) => state.auth.form)

    const isLoggedIn = !auth.token ? false : true

    const handleLogout = () => {

        dispatch(logoutUser());

        clearAuth();

        toast.success("Logged Out");

        navigate("/", { replace: true });

    };

    console.log(auth)

    return (

        <header className="py-3">

            <div className="container-fluid">

                <nav className="navbar navbar-expand-lg navbar-shell px-3 px-lg-4">

                    {/* Brand */}
                    <NavLink to="/" className="navbar-brand d-flex align-items-center gap-3 m-0">
                        <div className="brand-icon">
                            <IconCoinMoneroFilled size={24} />
                        </div>

                        <span className="brand-text">
                            MileZero
                        </span>
                    </NavLink>

                    {/* Mobile Toggle */}
                    <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
                        <IconMenu2 size={24} />
                    </button>

                    {/* Collapse */}
                    <div className="collapse navbar-collapse" id="navbarMenu">

                        {/* Navigation */}
                        <ul className="navbar-nav mx-auto rounded-pill my-3 my-lg-0">
                            <li className="nav-item">
                                <NavLink end to="/" className={({ isActive }) => `nav-link px-3 ${isActive ? "active-nav" : ""}`}>
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/vehicles" className={({ isActive }) => `nav-link px-3 ${isActive ? "active-nav" : ""}`}>
                                    Vehicles
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/about" className={({ isActive }) => `nav-link px-3 ${isActive ? "active-nav" : ""}`}>
                                    About
                                </NavLink>
                            </li>

                            <li className="nav-item">

                                <NavLink to="/contact" className={({ isActive }) => `nav-link px-3 ${isActive ? "active-nav" : ""}`}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>

                        {/* Right */}

                        <div className="d-flex gap-2">
                            {!isLoggedIn ? (
                                <>
                                    <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => navigate("/auth")} >
                                        <IconLogin2 size={18} />
                                        Login
                                    </button>
                                </>
                            ) : (
                                <div className="dropdown">
                                    <button
                                        className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 rounded-pill px-3"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <IconUser size={20} />
                                        <span>{auth.username}</span>
                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => navigate("/dashboard")}
                                            >
                                                <IconUser size={18} className="me-2" />
                                                My Profile
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => navigate("/dashboard/bookings")}
                                            >
                                                My Bookings
                                            </button>
                                        </li>

                                        <li><hr className="dropdown-divider" /></li>

                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>

                </nav>

            </div>

        </header>

    );

}

export default Navbar;