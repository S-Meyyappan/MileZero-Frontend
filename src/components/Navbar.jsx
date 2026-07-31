import { NavLink } from "react-router";
import { IconLogin2, IconUserPlus, IconCoinMoneroFilled } from "@tabler/icons-react";
import "../css/Navbar.css";

function Navbar() {
    return (
        <header className="app-header">

            <div className="container">

                <nav className="app-navbar px-3">

                    {/* Logo */}

                    <NavLink to="/" className="brand">

                        <div className="brand-icon">
                            <IconCoinMoneroFilled
                                size={48}
                                stroke={2}
                                color="#2563EB"
                            />
                        </div>

                        <div>

                            <div className="brand-title">
                                MileZero
                            </div>

                        </div>

                    </NavLink>

                    {/* Navigation */}

                    <div className="nav-pill">

                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/vehicles"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            Vehicles
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            About
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            Contact
                        </NavLink>

                    </div>

                    {/* Actions */}

                    <div className="nav-actions">

                        <button className="btn-login">

                            <IconLogin2 size={18} />

                            Login

                        </button>

                        <button className="btn-signup">

                            <IconUserPlus size={18} />

                            Sign Up

                        </button>

                    </div>

                    {/* Mobile */}

                    <button
                        className="navbar-toggler d-lg-none border-0 shadow-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mobileNav"
                    >
                        ☰
                    </button>

                </nav>

                {/* Mobile Menu */}

                <div
                    className="collapse d-lg-none mt-3"
                    id="mobileNav"
                >

                    <div className="mobile-menu">

                        <NavLink to="/" className="mobile-link">
                            Home
                        </NavLink>

                        <NavLink to="/vehicles" className="mobile-link">
                            Vehicles
                        </NavLink>

                        <NavLink to="/about" className="mobile-link">
                            About
                        </NavLink>

                        <NavLink to="/contact" className="mobile-link">
                            Contact
                        </NavLink>

                        <hr />

                        <button className="btn-login w-100 mb-2">
                            Login
                        </button>

                        <button className="btn-signup w-100">
                            Sign Up
                        </button>

                    </div>

                </div>

            </div>

        </header>
    );
}

export default Navbar;