
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
    IconPlus,
    IconPencil,
    IconCheck,
    IconX,
    IconCategory,
    IconCar,
    IconCurrencyDollar,
    IconRoad,
} from "@tabler/icons-react";

import { getAllCategories } from "../../store/actions/CategoryActions";

export default function CategoryList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = useSelector(
        (state) => state.category.list
    );

    const [editingId, setEditingId] = useState(null);

    const [editForm, setEditForm] = useState({
        name: "",
        basePricePerDay: "",
        basePricePerHour: "",
        basePricePerKm: "",
        includedKmPerDay: "",
    });

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const startEdit = (category) => {

        setEditingId(category.id);

        setEditForm({
            name: category.name,
            basePricePerDay: category.basePricePerDay,
            basePricePerHour: category.basePricePerHour,
            basePricePerKm: category.basePricePerKm,
            includedKmPerDay: category.includedKmPerDay,
        });
    };

    const cancelEdit = () => {

        setEditingId(null);

        setEditForm({
            name: "",
            basePricePerDay: "",
            basePricePerHour: "",
            basePricePerKm: "",
            includedKmPerDay: "",
        });
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNumberChange = (e) => {

        const { name, value } = e.target;

        // Prevent negative values
        if (Number(value) < 0) {
            return;
        }

        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleIncludedKmChange = (e) => {

        const { value } = e.target;

        // Only allow positive values
        if (value !== "" && Number(value) <= 0) {
            return;
        }

        setEditForm((prev) => ({
            ...prev,
            includedKmPerDay: value,
        }));
    };

    const handleSave = async (id) => {

        if (!editForm.name.trim()) {
            toast.error("Category name cannot be empty");
            return;
        }

        if (
            editForm.basePricePerDay === "" ||
            editForm.basePricePerHour === "" ||
            editForm.basePricePerKm === ""
        ) {
            toast.error("Please fill all price fields");
            return;
        }

        if (
            Number(editForm.basePricePerDay) < 0 ||
            Number(editForm.basePricePerHour) < 0 ||
            Number(editForm.basePricePerKm) < 0
        ) {
            toast.error("Price cannot be negative");
            return;
        }

        if (
            !editForm.includedKmPerDay ||
            Number(editForm.includedKmPerDay) <= 0
        ) {
            toast.error("Included kilometres must be greater than 0");
            return;
        }

        const payload = {
            name: editForm.name.trim(),
            basePricePerDay: Number(
                editForm.basePricePerDay
            ),
            basePricePerHour: Number(
                editForm.basePricePerHour
            ),
            basePricePerKm: Number(
                editForm.basePricePerKm
            ),
            includedKmPerDay: Number(
                editForm.includedKmPerDay
            ),
        };

        try {

            await axios.put(
                `http://localhost:8080/api/category/update/${id}`,
                payload
            );

            toast.success(
                "Category updated successfully"
            );

            setEditingId(null);

            dispatch(getAllCategories());

        } catch (error) {

            console.error(
                "Category update failed:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to update category"
            );
        }
    };

    return (
        <div className="container py-4">

            {/* Header */}

            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">

                <div>

                    <div className="d-flex align-items-center gap-2 mb-1">

                        <IconCategory
                            size={25}
                            stroke={1.8}
                        />

                        <h2 className="fw-bold mb-0">
                            Categories
                        </h2>

                    </div>

                    <p className="text-muted mb-0">
                        Manage vehicle categories and pricing.
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-primary rounded-3 px-4 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => navigate("add")}
                >
                    <IconPlus size={18} />
                    Add Category
                </button>

            </div>


            {/* Table */}

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">

                            <tr>

                                <th className="ps-4 py-3 text-muted small">
                                    #
                                </th>

                                <th className="py-3 text-muted small">
                                    CATEGORY
                                </th>

                                <th className="py-3 text-muted small">
                                    PER DAY
                                </th>

                                <th className="py-3 text-muted small">
                                    PER HOUR
                                </th>

                                <th className="py-3 text-muted small">
                                    PER KM
                                </th>

                                <th className="py-3 text-muted small">
                                    INCLUDED KM / DAY
                                </th>

                                <th className="text-end pe-4 py-3 text-muted small">
                                    ACTIONS
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center py-5"
                                    >

                                        <IconCategory
                                            size={42}
                                            stroke={1.4}
                                            className="text-secondary mb-2"
                                        />

                                        <div className="fw-semibold">
                                            No categories found
                                        </div>

                                        <div className="text-muted small">
                                            Add your first vehicle category.
                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                categories.map((category) => {

                                    const isEditing =
                                        editingId === category.id;

                                    return (
                                        <tr key={category.id}>

                                            {/* ID */}

                                            <td className="ps-4 text-muted">
                                                {category.id}
                                            </td>


                                            {/* NAME */}

                                            <td>

                                                {isEditing ? (

                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={
                                                            editForm.name
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        className="form-control rounded-3"
                                                        placeholder="Category name"
                                                    />

                                                ) : (

                                                    <div className="d-flex align-items-center gap-2">

                                                        <div className="rounded-3 bg-light p-2">
                                                            <IconCar
                                                                size={18}
                                                                stroke={1.8}
                                                            />
                                                        </div>

                                                        <span className="fw-semibold">
                                                            {
                                                                category.name
                                                            }
                                                        </span>

                                                    </div>

                                                )}

                                            </td>


                                            {/* PER DAY */}

                                            <td>

                                                {isEditing ? (

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        name="basePricePerDay"
                                                        value={
                                                            editForm.basePricePerDay
                                                        }
                                                        onChange={
                                                            handleNumberChange
                                                        }
                                                        className="form-control rounded-3"
                                                    />

                                                ) : (

                                                    <span className="fw-medium">
                                                        $
                                                        {
                                                            category.basePricePerDay
                                                        }
                                                    </span>

                                                )}

                                            </td>


                                            {/* PER HOUR */}

                                            <td>

                                                {isEditing ? (

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        name="basePricePerHour"
                                                        value={
                                                            editForm.basePricePerHour
                                                        }
                                                        onChange={
                                                            handleNumberChange
                                                        }
                                                        className="form-control rounded-3"
                                                    />

                                                ) : (

                                                    <span className="text-muted">
                                                        $
                                                        {
                                                            category.basePricePerHour
                                                        }
                                                    </span>

                                                )}

                                            </td>


                                            {/* PER KM */}

                                            <td>

                                                {isEditing ? (

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        name="basePricePerKm"
                                                        value={
                                                            editForm.basePricePerKm
                                                        }
                                                        onChange={
                                                            handleNumberChange
                                                        }
                                                        className="form-control rounded-3"
                                                    />

                                                ) : (

                                                    <span className="text-muted">
                                                        $
                                                        {
                                                            category.basePricePerKm
                                                        }
                                                    </span>

                                                )}

                                            </td>


                                            {/* INCLUDED KM */}

                                            <td>

                                                {isEditing ? (

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        step="1"
                                                        name="includedKmPerDay"
                                                        value={
                                                            editForm.includedKmPerDay
                                                        }
                                                        onChange={
                                                            handleIncludedKmChange
                                                        }
                                                        className="form-control rounded-3"
                                                    />

                                                ) : (

                                                    <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                                                        <IconRoad
                                                            size={14}
                                                            className="me-1"
                                                        />
                                                        {
                                                            category.includedKmPerDay
                                                        }{" "}
                                                        km
                                                    </span>

                                                )}

                                            </td>


                                            {/* ACTIONS */}

                                            <td className="pe-4">

                                                {isEditing ? (

                                                    <div className="d-flex justify-content-end gap-2">

                                                        <button
                                                            type="button"
                                                            className="btn btn-success btn-sm rounded-3 d-flex align-items-center gap-1"
                                                            onClick={() =>
                                                                handleSave(
                                                                    category.id
                                                                )
                                                            }
                                                        >

                                                            <IconCheck
                                                                size={16}
                                                            />

                                                            Save

                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-light border btn-sm rounded-3 d-flex align-items-center gap-1"
                                                            onClick={
                                                                cancelEdit
                                                            }
                                                        >

                                                            <IconX
                                                                size={16}
                                                            />

                                                            Cancel

                                                        </button>

                                                    </div>

                                                ) : (

                                                    <div className="d-flex justify-content-end">

                                                        <button
                                                            type="button"
                                                            className="btn btn-light border-0 rounded-3"
                                                            title="Edit category"
                                                            onClick={() =>
                                                                startEdit(
                                                                    category
                                                                )
                                                            }
                                                        >

                                                            <IconPencil
                                                                size={18}
                                                                stroke={1.8}
                                                            />

                                                        </button>

                                                    </div>

                                                )}

                                            </td>

                                        </tr>
                                    );
                                })

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}