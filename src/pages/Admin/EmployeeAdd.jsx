import { useEffect, useState } from "react";
import axios from "axios";
import {
    IconArrowLeft,
    IconUserPlus,
    IconUser,
    IconPhone,
    IconMail,
    IconLock,
    IconEye,
    IconEyeOff,
    IconBuilding,
    IconBriefcase,
} from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export default function EmployeeAdd() {

    const navigate = useNavigate()

    const [branches, setBranches] = useState([]);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        role: "EMPLOYEE",
        branchId: "",
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {

        const getBranches = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8080/api/branch/get-all"
                );

                setBranches(response.data);

            } catch (error) {

                console.error(
                    "Error loading branches:",
                    error
                );

                toast.error("Unable to load branches");
            }
        };

        getBranches();

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.branchId) {
            toast.error("Please select a branch");
            return;
        }

        setLoading(true);

        try {

            const payload = {
                name: form.name,
                phone: form.phone,
                email: form.email || null,
                password: form.password,
                role: form.role,
                branchId: Number(form.branchId),
            };

            await axios.post(
                "http://localhost:8080/api/employee/add",
                payload
            );

            toast.success("Employee added successfully");

            navigate("/dashboard/employees")

        } catch (error) {

            console.error(
                "Employee creation failed:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Unable to add employee";

            toast.error(message);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container py-4">

            {/* Header */}

            <div className="d-flex align-items-center gap-3 mb-4">

                <button
                    type="button"
                    className="btn btn-light border rounded-3 d-flex align-items-center justify-content-center"
                    onClick={() => navigate(-1)}
                    title="Back to employees"
                >
                    <IconArrowLeft size={19} />
                </button>

                <div>

                    <div className="d-flex align-items-center gap-2">

                        <IconUserPlus
                            size={25}
                            stroke={1.8}
                        />

                        <h2 className="fw-bold mb-0">
                            Add Employee
                        </h2>

                    </div>

                    <p className="text-muted mb-0 mt-1">
                        Create a new employee account.
                    </p>

                </div>

            </div>


            {/* Form */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4 p-lg-5">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* Name */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Name
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconUser size={18} />
                                    </span>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="form-control border-start-0"
                                        placeholder="Enter employee name"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Phone */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Phone
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconPhone size={18} />
                                    </span>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="form-control border-start-0"
                                        placeholder="Enter phone number"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Email */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Email
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconMail size={18} />
                                    </span>

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="form-control border-start-0"
                                        placeholder="employee@example.com"
                                    />

                                </div>

                            </div>



                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Password
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconLock size={18} />
                                    </span>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="form-control border-start-0 border-end-0"
                                        placeholder="Create password"
                                        minLength="6"
                                        maxLength="15"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-light border border-start-0"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        title={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <IconEyeOff size={18} />
                                        ) : (
                                            <IconEye size={18} />
                                        )}
                                    </button>

                                </div>

                                <div className="form-text">
                                    6–15 characters, including a number and special symbol.
                                </div>

                            </div>



                            {/* Branch */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Branch
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconBuilding size={18} />
                                    </span>

                                    <select
                                        name="branchId"
                                        value={form.branchId}
                                        onChange={handleChange}
                                        className="form-select border-start-0"
                                        required
                                    >

                                        <option value="">
                                            Select branch
                                        </option>

                                        {branches.map((branch) => (

                                            <option
                                                key={branch.id}
                                                value={branch.id}
                                            >
                                                {branch.name} — {branch.city}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                            </div>


                            {/* Role */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Role
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconBriefcase size={18} />
                                    </span>

                                    <select
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        className="form-select border-start-0"
                                        required
                                    >

                                        <option value="EMPLOYEE">
                                            Employee
                                        </option>

                                        <option value="MANAGER">
                                            Manager
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>


                        {/* Actions */}

                        <div className="border-top mt-5 pt-4 d-flex flex-column flex-sm-row justify-content-end gap-2">

                            <button
                                type="button"
                                className="btn btn-light border rounded-3 px-4"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary rounded-3 px-4"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            aria-hidden="true"
                                        />
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <IconUserPlus
                                            size={18}
                                            className="me-2"
                                        />
                                        Add Employee
                                    </>
                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

