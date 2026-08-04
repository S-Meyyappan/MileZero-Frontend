import { useEffect, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/AuthActions";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")

    const [password, setPasword] = useState("")

    const [showPassword, setShowPassword] = useState(false);

    const auth = useSelector((state) => state.auth.form)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password))
        console.log("login page :",auth)
    };

    useEffect(() => {
        if (auth.token) {
            toast.success("Logged In Successfully");
            navigate("/dashboard");
        }

        if (auth.errMessage) {
            toast.error(auth.errMessage);
        }
    }, [auth, navigate]);

    return (
        <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                    Email Address
                </label>

                <input
                    type="email"
                    id="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={($event) => setEmail($event.target.value)}
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
                        placeholder="Enter your password"
                        onChange={($event) => setPasword($event.target.value)}
                        required
                    />

                    <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                    >
                        {showPassword ? (
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
                Sign In
            </button>

        </form>
    );
};

export default Login;