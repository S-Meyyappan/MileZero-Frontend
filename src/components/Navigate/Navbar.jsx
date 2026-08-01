import { NavLink } from "react-router";
import {
    IconCar,
    IconLogin2,
    IconUserPlus,
    IconMenu2,
    IconCoinMoneroFilled,
    IconUser
} from "@tabler/icons-react";

import "../../css/Navbar.css"
import "../../App.css"

function Navbar() {

    // Replace later with authentication state
    const isLoggedIn = false;

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
                                <NavLink to="/about" className={({ isActive }) =>`nav-link px-3 ${isActive ? "active-nav" : ""}`}>
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
                                    <button className="btn btn-light d-flex align-items-center gap-2">
                                        <IconLogin2 size={18} />
                                        Login
                                    </button>
                                    <button className="btn btn-primary d-flex align-items-center gap-2">
                                        <IconUserPlus size={18} />
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <button className="btn btn-light rounded-circle p-2">
                                    <IconUser size={25} />
                                </button>
                            )}
                        </div>

                    </div>

                </nav>

            </div>

        </header>

    );

}

export default Navbar;