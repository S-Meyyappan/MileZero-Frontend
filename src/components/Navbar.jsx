import { Link } from "react-router";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light shadow-sm py-3">
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="src/assets/milezero-logo.png"
                        alt="RoadReady"
                        width="70"
                        height="35"
                        className="me-2 rounded-circle"
                    />
                    MileZero
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarlist"
                    aria-controls="navbarlist"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="navbarlist">
                    <ul className="navbar-nav mx-auto gap-lg-3">
                        {/*Logo <-___________ Links __________-> Login : Auto margin on links x-axis eatsup  */}
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/vehicles">
                                Vehicles
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About Us
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                Contact Us
                            </Link>
                        </li>
                    </ul>

                    {/* Login */}
                    <button className="btn btn-primary px-4 rounded-pill m-1">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;