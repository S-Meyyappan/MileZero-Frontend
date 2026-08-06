import { useEffect, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginUser } from "../../store/actions/AuthActions";

const Register = ({ onSuccess }) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const auth = useSelector((state) => state.auth.form)

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        licenseNo: "",
        licenseExpiryDate: "",
        insurancePolicyNo: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if(!formData.name || !formData.phone || !formData.licenseNo || !formData.licenseExpiryDate || !formData.email || !formData.password){
            alert("Fill all required fields");
            return;
        }

        const payload = {
            name: formData.name,
            phone: formData.phone,
            licenseNo: formData.licenseNo,
            licenseExpiryDate: formData.licenseExpiryDate,
            insurancePolicyNo: formData.insurancePolicyNo,
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/customer/add", payload)

            dispatch(loginUser(formData.email, formData.password))

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {
            alert(error?.response?.message);
        }
    };

    useEffect(() => {

        if (auth.token) {

            toast.success("Logged In Successfully");

            if (onSuccess) {
                onSuccess();
            } else {
                navigate("/dashboard");
            }

        }

        if (auth.errMessage) {
            toast.error(auth.errMessage);
        }

    }, [auth]);

    return (
        <form onSubmit={handleSubmit} noValidate>

            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Full Name <span className=" text-danger">*</span>
                </label>

                <input
                    id="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>


            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Mobile Number <span className=" text-danger">*</span>
                </label>

                <input
                    id="phone"
                    type="tel"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>


            <div className="mb-3">
                <label className="form-label fw-semibold">
                    License Number <span className=" text-danger">*</span>
                </label>

                <input
                    id="licenseNo"
                    className="form-control"
                    placeholder="TN-07-20250089"
                    value={formData.licenseNo}
                    onChange={handleChange}
                    required
                />
            </div>


            <div className="mb-3">
                <label className="form-label fw-semibold">
                    License Expiry Date <span className=" text-danger">*</span>
                </label>

                <input
                    id="licenseExpiryDate"
                    type="date"
                    className="form-control"
                    value={formData.licenseExpiryDate}
                    onChange={handleChange}
                    required
                />
            </div>


            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Insurance Policy Number
                </label>

                <input
                    id="insurancePolicyNo"
                    className="form-control"
                    placeholder="VA-88392-XYZ"
                    value={formData.insurancePolicyNo}
                    onChange={handleChange}
                />
            </div>


            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Email <span className=" text-danger">*</span>
                </label>

                <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>


            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Password <span className=" text-danger">*</span>
                </label>

                <div className="input-group">

                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control border-end-0"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {showPassword ?
                            <IconEyeOff size={18}/> :
                            <IconEye size={18}/>
                        }
                    </button>

                </div>
            </div>


            <div className="mb-4">
                <label className="form-label fw-semibold">
                    Confirm Password <span className=" text-danger">*</span>
                </label>

                <div className="input-group">

                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control border-end-0"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ?
                            <IconEyeOff size={18}/> :
                            <IconEye size={18}/>
                        }
                    </button>

                </div>
            </div>


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