import { useState } from "react";
import Login from "../components/Authcomp/Login";
import Register from "../components/Authcomp/Register";
import Navbar from "../components/Navigate/Navbar";

const AuthPage = () => {
    const [mode, setMode] = useState("login");

    return (
        <>
            <Navbar />
            <div className="bg-light min-vh-100 d-flex align-items-center py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-4 col-lg-5 col-md-7 col-sm-10 col-12">

                            <div className="card border-0 shadow-sm rounded-4">

                                <div className="card-body p-4 p-lg-5">

                                    {/* Logo */}
                                    <div className="text-center mb-4">
                                        <h2 className="fw-bold mb-2">
                                            MileZero
                                        </h2>

                                        <p className="text-muted mb-0">
                                            Book your next ride in minutes.
                                        </p>
                                    </div>

                                    {/* Switch */}
                                    <div className="btn-group w-100 mb-4" role="group">
                                        <button
                                            type="button"
                                            className={`btn ${mode === "login"
                                                    ? "btn-primary"
                                                    : "btn-outline-primary"
                                                }`}
                                            onClick={() => setMode("login")}
                                        >
                                            Sign In
                                        </button>

                                        <button
                                            type="button"
                                            className={`btn ${mode === "register"
                                                    ? "btn-primary"
                                                    : "btn-outline-primary"
                                                }`}
                                            onClick={() => setMode("register")}
                                        >
                                            Create Account
                                        </button>
                                    </div>

                                    {/* Heading */}
                                    <div className="text-center mb-4">
                                        <h4 className="fw-bold mb-2">
                                            {mode === "login"
                                                ? "Welcome Back"
                                                : "Create Your Account"}
                                        </h4>

                                        <p className="text-muted mb-0">
                                            {mode === "login"
                                                ? "Sign in to continue your booking."
                                                : "Join MileZero and start booking with ease."}
                                        </p>
                                    </div>

                                    {/* Form */}
                                    {mode === "login" ? (
                                        <Login />
                                    ) : (
                                        <Register />
                                    )}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;