
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
    IconPlus,
    IconPencil,
    IconCheck,
    IconX,
    IconBuildingStore,
    IconMapPin,
    IconPhone,
    IconMap,
} from "@tabler/icons-react";

export default function BranchList() {

    const navigate = useNavigate();

    const [branches, setBranches] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [editForm, setEditForm] = useState({
        name: "",
        city: "",
        address: "",
        phone: "",
    });

    const getAllBranches = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/branch/get-all"
            );

            setBranches(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch branches:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to load branches"
            );
        }
    };

    useEffect(() => {
        getAllBranches();
    }, []);

    const startEdit = (branch) => {

        setEditingId(branch.id);

        setEditForm({
            name: branch.name,
            city: branch.city,
            address: branch.address,
            phone: branch.phone,
        });
    };

    const cancelEdit = () => {

        setEditingId(null);

        setEditForm({
            name: "",
            city: "",
            address: "",
            phone: "",
        });
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhoneChange = (e) => {

        const value = e.target.value;

        // Only digits and maximum 10 characters
        if (!/^\d*$/.test(value)) {
            return;
        }

        if (value.length > 10) {
            return;
        }

        setEditForm((prev) => ({
            ...prev,
            phone: value,
        }));
    };

    const handleUpdate = async (id) => {

        if (!editForm.name.trim()) {
            toast.error("Branch name cannot be empty");
            return;
        }

        if (!editForm.city.trim()) {
            toast.error("City cannot be empty");
            return;
        }

        if (!editForm.address.trim()) {
            toast.error("Address cannot be empty");
            return;
        }

        if (editForm.phone.length !== 10) {
            toast.error("Phone number must contain 10 digits");
            return;
        }

        const payload = {
            name: editForm.name.trim(),
            city: editForm.city.trim(),
            address: editForm.address.trim(),
            phone: editForm.phone,
        };

        try {

            await axios.put(
                `http://localhost:8080/api/branch/update/${id}`,
                payload
            );

            toast.success(
                "Branch updated successfully"
            );

            setEditingId(null);

            await getAllBranches();

        } catch (error) {

            console.error(
                "Branch update failed:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to update branch"
            );
        }
    };

    return (
        <div className="container py-4">

            {/* Header */}

            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">

                <div>

                    <div className="d-flex align-items-center gap-2 mb-1">

                        <IconBuildingStore
                            size={25}
                            stroke={1.8}
                        />

                        <h2 className="fw-bold mb-0">
                            Branches
                        </h2>

                    </div>

                    <p className="text-muted mb-0">
                        Manage your rental branches and locations.
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-primary rounded-3 px-4 d-flex align-items-center justify-content-center gap-2"
                    onClick={() =>
                        navigate("add")
                    }
                >
                    <IconPlus size={18} />
                    Add Branch
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
                                    BRANCH
                                </th>

                                <th className="py-3 text-muted small">
                                    CITY
                                </th>

                                <th className="py-3 text-muted small">
                                    ADDRESS
                                </th>

                                <th className="py-3 text-muted small">
                                    PHONE
                                </th>

                                <th className="text-end pe-4 py-3 text-muted small">
                                    ACTIONS
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {branches.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-5"
                                    >

                                        <IconBuildingStore
                                            size={42}
                                            stroke={1.4}
                                            className="text-secondary mb-2"
                                        />

                                        <div className="fw-semibold">
                                            No branches found
                                        </div>

                                        <div className="text-muted small">
                                            Add your first rental branch.
                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                branches.map((branch) => {

                                    const isEditing =
                                        editingId === branch.id;

                                    return (
                                        <tr key={branch.id}>

                                            {/* ID */}

                                            <td className="ps-4 text-muted">
                                                {branch.id}
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
                                                    />

                                                ) : (

                                                    <div className="d-flex align-items-center gap-3">

                                                        <div className="rounded-3 bg-primary-subtle text-primary p-2">
                                                            <IconBuildingStore
                                                                size={19}
                                                                stroke={1.8}
                                                            />
                                                        </div>

                                                        <span className="fw-semibold">
                                                            {branch.name}
                                                        </span>

                                                    </div>

                                                )}

                                            </td>


                                            {/* CITY */}

                                            <td>

                                                {isEditing ? (

                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={
                                                            editForm.city
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        className="form-control rounded-3"
                                                    />

                                                ) : (

                                                    <div className="d-flex align-items-center gap-2 text-muted">

                                                        <IconMapPin
                                                            size={17}
                                                            stroke={1.8}
                                                        />

                                                        {branch.city}

                                                    </div>

                                                )}

                                            </td>


                                            {/* ADDRESS */}

                                            <td>

                                                {isEditing ? (

                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={
                                                            editForm.address
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        className="form-control rounded-3"
                                                    />

                                                ) : (

                                                    <div className="d-flex align-items-center gap-2 text-muted">

                                                        <IconMap
                                                            size={17}
                                                            stroke={1.8}
                                                        />

                                                        <span>
                                                            {
                                                                branch.address
                                                            }
                                                        </span>

                                                    </div>

                                                )}

                                            </td>


                                            {/* PHONE */}

                                            <td>

                                                {isEditing ? (

                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        name="phone"
                                                        value={
                                                            editForm.phone
                                                        }
                                                        onChange={
                                                            handlePhoneChange
                                                        }
                                                        className="form-control rounded-3"
                                                        maxLength="10"
                                                    />

                                                ) : (

                                                    <div className="d-flex align-items-center gap-2">

                                                        <IconPhone
                                                            size={17}
                                                            stroke={1.8}
                                                            className="text-muted"
                                                        />

                                                        <span className="text-muted">
                                                            {branch.phone}
                                                        </span>

                                                    </div>

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
                                                                handleUpdate(
                                                                    branch.id
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
                                                            title="Edit branch"
                                                            onClick={() =>
                                                                startEdit(
                                                                    branch
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