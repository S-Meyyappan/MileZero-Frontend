
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
    IconArrowLeft,
    IconCategory,
    IconCar,
    IconCurrencyDollar,
    IconRoad,
    IconPlus,
} from "@tabler/icons-react";

export default function CategoryAdd() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        basePricePerDay: "",
        basePricePerHour: "",
        basePricePerKm: "",
        includedKmPerDay: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNumberChange = (e) => {

        const { name, value } = e.target;

        if (Number(value) < 0) {
            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleIncludedKmChange = (e) => {

        const { value } = e.target;

        if (value !== "" && Number(value) <= 0) {
            return;
        }

        setForm((prev) => ({
            ...prev,
            includedKmPerDay: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.name.trim()) {
            toast.error("Category name cannot be empty");
            return;
        }

        if (
            form.basePricePerDay === "" ||
            form.basePricePerHour === "" ||
            form.basePricePerKm === ""
        ) {
            toast.error("Please fill all price fields");
            return;
        }

        if (
            Number(form.basePricePerDay) < 0 ||
            Number(form.basePricePerHour) < 0 ||
            Number(form.basePricePerKm) < 0
        ) {
            toast.error("Price cannot be negative");
            return;
        }

        if (
            !form.includedKmPerDay ||
            Number(form.includedKmPerDay) <= 0
        ) {
            toast.error(
                "Included kilometres must be greater than 0"
            );
            return;
        }

        const payload = {
            name: form.name.trim(),
            basePricePerDay: Number(
                form.basePricePerDay
            ),
            basePricePerHour: Number(
                form.basePricePerHour
            ),
            basePricePerKm: Number(
                form.basePricePerKm
            ),
            includedKmPerDay: Number(
                form.includedKmPerDay
            ),
        };

        try {

            setLoading(true);

            await axios.post(
                "http://localhost:8080/api/category/add",
                payload
            );

            toast.success(
                "Category added successfully"
            );

            navigate("/categories");

        } catch (error) {

            console.error(
                "Category creation failed:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to add category"
            );

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
                    className="btn btn-light border rounded-3"
                    onClick={() =>
                        navigate(-1)
                    }
                    title="Back to categories"
                >
                    <IconArrowLeft size={19} />
                </button>

                <div>

                    <div className="d-flex align-items-center gap-2">

                        <IconCategory
                            size={25}
                            stroke={1.8}
                        />

                        <h2 className="fw-bold mb-0">
                            Add Category
                        </h2>

                    </div>

                    <p className="text-muted mb-0 mt-1">
                        Create a new vehicle category and pricing.
                    </p>

                </div>

            </div>


            {/* Form */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4 p-lg-5">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* Category name */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Category Name
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconCar size={18} />
                                    </span>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control border-start-0"
                                        placeholder="e.g. Sedan"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Per day */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Base Price / Day
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconCurrencyDollar
                                            size={18}
                                        />
                                    </span>

                                    <input
                                        type="number"
                                        name="basePricePerDay"
                                        value={
                                            form.basePricePerDay
                                        }
                                        onChange={
                                            handleNumberChange
                                        }
                                        min="0"
                                        step="0.01"
                                        className="form-control border-start-0"
                                        placeholder="120.00"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Per hour */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Base Price / Hour
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconCurrencyDollar
                                            size={18}
                                        />
                                    </span>

                                    <input
                                        type="number"
                                        name="basePricePerHour"
                                        value={
                                            form.basePricePerHour
                                        }
                                        onChange={
                                            handleNumberChange
                                        }
                                        min="0"
                                        step="0.01"
                                        className="form-control border-start-0"
                                        placeholder="6.50"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Per km */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Base Price / KM
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconCurrencyDollar
                                            size={18}
                                        />
                                    </span>

                                    <input
                                        type="number"
                                        name="basePricePerKm"
                                        value={
                                            form.basePricePerKm
                                        }
                                        onChange={
                                            handleNumberChange
                                        }
                                        min="0"
                                        step="0.01"
                                        className="form-control border-start-0"
                                        placeholder="0.25"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Included KM */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Included KM / Day
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconRoad size={18} />
                                    </span>

                                    <input
                                        type="number"
                                        name="includedKmPerDay"
                                        value={
                                            form.includedKmPerDay
                                        }
                                        onChange={
                                            handleIncludedKmChange
                                        }
                                        min="1"
                                        step="1"
                                        className="form-control border-start-0"
                                        placeholder="50"
                                        required
                                    />

                                </div>

                                <div className="form-text">
                                    Must be greater than 0 km.
                                </div>

                            </div>

                        </div>


                        {/* Actions */}

                        <div className="border-top mt-5 pt-4 d-flex flex-column flex-sm-row justify-content-end gap-2">

                            <button
                                type="button"
                                className="btn btn-light border rounded-3 px-4"
                                onClick={() =>
                                    navigate(-1)
                                }
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary rounded-3 px-4 d-flex align-items-center justify-content-center"
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
                                        <IconPlus
                                            size={18}
                                            className="me-2"
                                        />
                                        Add Category
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
