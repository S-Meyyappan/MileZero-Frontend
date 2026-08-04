import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Register API
        console.log("Register submitted");
    };

    return (
        <form onSubmit={handleSubmit} noValidate>

            {/* Full Name */}
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label fw-semibold">
                    Full Name
                </label>

                <input
                    type="text"
                    id="fullName"
                    className="form-control"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                />
            </div>

            {/* Email */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                    Email Address
                </label>

                <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                />
            </div>

            {/* Phone */}
            <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">
                    Mobile Number
                </label>

                <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    autoComplete="tel"
                    required
                />
            </div>

            {/* Password */}
            <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                    Password
                </label>

                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control border-end-0"
                        placeholder="Create a password"
                        autoComplete="new-password"
                        required
                    />

                    <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <IconEyeOff size={18} />
                        ) : (
                            <IconEye size={18} />
                        )}
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label fw-semibold">
                    Confirm Password
                </label>

                <div className="input-group">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className="form-control border-end-0"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        required
                    />

                    <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                        }
                        aria-label={
                            showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showConfirmPassword ? (
                            <IconEyeOff size={18} />
                        ) : (
                            <IconEye size={18} />
                        )}
                    </button>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold py-2"
            >
                Create Account
            </button>

        </form>
    );
};

export default Register;