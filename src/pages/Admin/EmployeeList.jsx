
import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
    IconPlus,
    IconPencil,
    IconTrash,
    IconUserUp,
    IconUserDown,
    IconCheck,
    IconX,
    IconUsers,
    IconBuilding,
    IconMapPin
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

export default function EmployeeList() {

    const navigate = useNavigate()

    const [employees, setEmployees] = useState([]);
    const [branches, setBranches] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [editForm, setEditForm] = useState({
        name: "",
        phone: "",
        branchId: ""
    });

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [actionType, setActionType] = useState(null);

    const [errMsg, setErrMsg] = useState("Something went wrong. Please try again.")

    const getEmployees = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/employee/get-all"
            );

            setEmployees(response.data);

        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    useEffect(() => {

        const getBranches = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8080/api/branch/get-all"
                );

                setBranches(response.data);

            } catch (error) {

                console.error(
                    "Error fetching branches:",
                    error
                );

            }
        };

        getBranches();

    }, []);

    const showToast = (id) => {

        const toastElement =
            document.getElementById(id);

        if (toastElement) {

            const toastInstance =
                new Toast(toastElement, {
                    autohide: false
                });

            toastInstance.show();
        }
    };

    const hideToast = (id) => {

        const toastElement =
            document.getElementById(id);

        if (toastElement) {

            const toastInstance =
                Toast.getInstance(toastElement);

            if (toastInstance) {
                toastInstance.hide();
            }
        }
    };

    const startEdit = (employee) => {

        setEditingId(employee.id);

        setEditForm({
            name: employee.name,
            phone: employee.phone,
            branchId: employee.branchId
        });
    };

    const cancelEdit = () => {

        setEditingId(null);

        setEditForm({
            name: "",
            phone: "",
            branchId: ""
        });
    };

    const handleEditChange = (e) => {

        const { name, value } = e.target;

        setEditForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = async (id) => {

        const body = {
              name: editForm.name,
              phone: editForm.phone,
            branchId: editForm.branchId
         }
    

        console.log(
            "Edit employee:",
            id,
            editForm
        );

        cancelEdit();

        await axios.put(
            `http://localhost:8080/api/employee/update/${id}`,body
        );

        await getEmployees();
    };

    const handleBranchChange = (e) => {

        const branchId = e.target.value;

        const selectedBranch = branches.find(
            (branch) =>
                String(branch.id) ===
                String(branchId)
        );

        setEditForm((prev) => ({
            ...prev,
            branchId
        }));

        console.log(
            "Selected branch:",
            selectedBranch
        );
    };

    const openActionConfirmation = (
        employee,
        type
    ) => {

        setSelectedEmployee(employee);
        setActionType(type);

        showToast(
            "employeeActionToast"
        );
    };

    const handleConfirmAction = async () => {

        if (!selectedEmployee) return;

        try {

            if (actionType === "promote") {

                await axios.post(
                    `http://localhost:8080/api/employee/set-manager/${selectedEmployee.id}`
                );
            }

            if (actionType === "demote") {

                await axios.post(
                    `http://localhost:8080/api/employee/remove-manager/${selectedEmployee.id}`
                );
            }

            hideToast(
                "employeeActionToast"
            );

            await getEmployees();

            showToast("successToast");

        } catch (error) {

            console.error(
                "Employee role action failed:",
                error
            );

            setErrMsg(error?.response?.data.message || "Unable to perform the action")

            hideToast(
                "employeeActionToast"
            );

            showToast("errorToast");
        }
    };

    const openDeleteConfirmation = (
        employee
    ) => {

        setSelectedEmployee(employee);

        showToast(
            "deleteEmployeeToast"
        );
    };

    const handleConfirmDelete = async () => {

        if (!selectedEmployee) return;

        await axios.delete(`http://localhost:8080/api/employee/delete/${selectedEmployee.id}`)

        console.log(
            "Delete employee:",
            selectedEmployee.id
        );

        hideToast(
            "deleteEmployeeToast"
        );
    };

    const getSelectedBranch = () => {

        return branches.find(
            (branch) =>
                String(branch.id) ===
                String(editForm.branchId)
        );
    };

    return (
        <>

            <div className="container py-4">

                {/* Page heading */}

                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">

                    <div>

                        <div className="d-flex align-items-center gap-2 mb-1">

                            <IconUsers
                                size={24}
                                stroke={1.8}
                            />

                            <h2 className="fw-bold mb-0">
                                Employees
                            </h2>

                        </div>

                        <p className="text-muted mb-0">
                            Manage employees, branches and roles.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="btn btn-primary rounded-3 px-4 d-flex align-items-center justify-content-center gap-2"
                        onClick={() => navigate("add")}
                    >
                        <IconPlus size={18} />
                        Add Employee
                    </button>

                </div>


                {/* Employee table */}

                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>

                                    <th className="ps-4 py-3 text-muted small">
                                        #
                                    </th>

                                    <th className="py-3 text-muted small">
                                        EMPLOYEE
                                    </th>

                                    <th className="py-3 text-muted small">
                                        PHONE
                                    </th>

                                    <th className="py-3 text-muted small">
                                        BRANCH & CITY
                                    </th>

                                    <th className="py-3 text-muted small">
                                        ROLE
                                    </th>

                                    <th className="text-end pe-4 py-3 text-muted small">
                                        ACTIONS
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {employees.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-5"
                                        >

                                            <IconUsers
                                                size={42}
                                                stroke={1.4}
                                                className="text-secondary mb-2"
                                            />

                                            <div className="fw-semibold">
                                                No employees found
                                            </div>

                                            <div className="text-muted small">
                                                Add your first employee to get started.
                                            </div>

                                        </td>

                                    </tr>

                                ) : (

                                    employees.map(
                                        (employee, index) => {

                                            const isEditing =
                                                editingId ===
                                                employee.id;

                                            return (

                                                <tr
                                                    key={
                                                        employee.id
                                                    }
                                                >

                                                    <td className="ps-4 text-muted">
                                                        {index + 1}
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
                                                                    handleEditChange
                                                                }
                                                                className="form-control rounded-3"
                                                                placeholder="Employee name"
                                                                autoFocus
                                                            />

                                                        ) : (

                                                            <div className="fw-semibold text-dark">
                                                                {
                                                                    employee.name
                                                                }
                                                            </div>

                                                        )}

                                                    </td>


                                                    {/* PHONE */}

                                                    <td>

                                                        {isEditing ? (

                                                            <input
                                                                type="text"
                                                                name="phone"
                                                                value={
                                                                    editForm.phone
                                                                }
                                                                onChange={
                                                                    handleEditChange
                                                                }
                                                                className="form-control rounded-3"
                                                                placeholder="Phone number"
                                                            />

                                                        ) : (

                                                            <span className="text-muted">
                                                                {
                                                                    employee.phone
                                                                }
                                                            </span>

                                                        )}

                                                    </td>


                                                    {/* BRANCH + CITY */}

                                                    <td>

                                                        {isEditing ? (

                                                            <select
                                                                name="branchId"
                                                                value={
                                                                    editForm.branchId
                                                                }
                                                                onChange={
                                                                    handleBranchChange
                                                                }
                                                                className="form-select rounded-3"
                                                            >

                                                                <option value="">
                                                                    Select branch
                                                                </option>

                                                                {branches.map(
                                                                    (
                                                                        branch
                                                                    ) => (

                                                                        <option
                                                                            key={
                                                                                branch.id
                                                                            }
                                                                            value={
                                                                                branch.id
                                                                            }
                                                                        >
                                                                            {
                                                                                branch.name
                                                                            }{" "}
                                                                            —{" "}
                                                                            {
                                                                                branch.city
                                                                            }
                                                                        </option>

                                                                    )
                                                                )}

                                                            </select>

                                                        ) : (

                                                            <div>

                                                                <div className="fw-medium d-flex align-items-center gap-2">

                                                                    <IconBuilding
                                                                        size={
                                                                            16
                                                                        }
                                                                        stroke={
                                                                            1.8
                                                                        }
                                                                    />

                                                                    {
                                                                        employee.branchName
                                                                    }

                                                                </div>

                                                                <div className="text-muted small d-flex align-items-center gap-1 mt-1">

                                                                    <IconMapPin
                                                                        size={
                                                                            14
                                                                        }
                                                                        stroke={
                                                                            1.8
                                                                        }
                                                                    />

                                                                    {
                                                                        employee.city
                                                                    }

                                                                </div>

                                                            </div>

                                                        )}

                                                    </td>


                                                    {/* ROLE */}

                                                    <td>

                                                        <span
                                                            className={`badge rounded-pill px-3 py-2 ${
                                                                employee.role ===
                                                                "MANAGER"
                                                                    ? "text-bg-primary"
                                                                    : "bg-light text-dark border"
                                                            }`}
                                                        >
                                                            {
                                                                employee.role
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td className="pe-4">

                                                        {isEditing ? (

                                                            <div className="d-flex justify-content-end gap-2">

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm rounded-3 d-flex align-items-center gap-1"
                                                                    onClick={() =>
                                                                        handleSaveEdit(
                                                                            employee.id
                                                                        )
                                                                    }
                                                                >
                                                                    <IconCheck
                                                                        size={
                                                                            16
                                                                        }
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
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    Cancel
                                                                </button>

                                                            </div>

                                                        ) : (

                                                            <div className="d-flex justify-content-end gap-1">

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-light border-0 rounded-3"
                                                                    title="Edit employee"
                                                                    onClick={() =>
                                                                        startEdit(
                                                                            employee
                                                                        )
                                                                    }
                                                                >
                                                                    <IconPencil
                                                                        size={
                                                                            18
                                                                        }
                                                                        stroke={
                                                                            1.8
                                                                        }
                                                                    />
                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="btn btn-light border-0 rounded-3"
                                                                    title={
                                                                        employee.role ===
                                                                        "MANAGER"
                                                                            ? "Demote to employee"
                                                                            : "Promote to manager"
                                                                    }
                                                                    onClick={() =>
                                                                        openActionConfirmation(
                                                                            employee,
                                                                            employee.role ===
                                                                                "MANAGER"
                                                                                ? "demote"
                                                                                : "promote"
                                                                        )
                                                                    }
                                                                >

                                                                    {employee.role ===
                                                                    "MANAGER" ? (

                                                                        <IconUserDown
                                                                            size={
                                                                                18
                                                                            }
                                                                            stroke={
                                                                                1.8
                                                                            }
                                                                        />

                                                                    ) : (

                                                                        <IconUserUp
                                                                            size={
                                                                                18
                                                                            }
                                                                            stroke={
                                                                                1.8
                                                                            }
                                                                        />

                                                                    )}

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="btn btn-light text-danger border-0 rounded-3"
                                                                    title="Delete employee"
                                                                    onClick={() =>
                                                                        openDeleteConfirmation(
                                                                            employee
                                                                        )
                                                                    }
                                                                >
                                                                    <IconTrash
                                                                        size={
                                                                            18
                                                                        }
                                                                        stroke={
                                                                            1.8
                                                                        }
                                                                    />
                                                                </button>

                                                            </div>

                                                        )}

                                                    </td>

                                                </tr>

                                            );
                                        }
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* Promote / Demote confirmation */}

            <div
                className="toast-container position-fixed top-0 start-50 translate-middle-x p-3"
                style={{ zIndex: 1055 }}
            >

                <div
                    id="employeeActionToast"
                    className="toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >

                    <div className="toast-header">

                        <strong className="me-auto">
                            {actionType === "promote"
                                ? "Promote employee"
                                : "Demote manager"}
                        </strong>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="toast"
                        />

                    </div>

                    <div className="toast-body">

                        <p className="mb-3">
                            Are you sure you want to{" "}
                            <strong>
                                {actionType === "promote"
                                    ? "promote"
                                    : "demote"}
                            </strong>{" "}
                            <strong>
                                {selectedEmployee?.name}
                            </strong>?
                        </p>

                        <div className="d-flex justify-content-end gap-2 border-top pt-3">

                            <button
                                type="button"
                                className="btn btn-light border btn-sm rounded-3"
                                data-bs-dismiss="toast"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={`btn btn-sm rounded-3 ${
                                    actionType === "promote"
                                        ? "btn-primary"
                                        : "btn-warning"
                                }`}
                                onClick={
                                    handleConfirmAction
                                }
                            >
                                Confirm
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* Delete confirmation */}

            <div
                className="toast-container position-fixed top-0 start-50 translate-middle-x p-3"
                style={{ zIndex: 1055 }}
            >

                <div
                    id="deleteEmployeeToast"
                    className="toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >

                    <div className="toast-header">

                        <strong className="me-auto">
                            Delete employee
                        </strong>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="toast"
                        />

                    </div>

                    <div className="toast-body">

                        <p className="mb-3">
                            Are you sure you want to delete{" "}
                            <strong>
                                {selectedEmployee?.name}
                            </strong>
                            ? This action can't be undone.
                        </p>

                        <div className="d-flex justify-content-end gap-2 border-top pt-3">

                            <button
                                type="button"
                                className="btn btn-light border btn-sm rounded-3"
                                data-bs-dismiss="toast"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger btn-sm rounded-3"
                                onClick={
                                    handleConfirmDelete
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* Success */}

            <div
                id="successToast"
                className="toast align-items-center text-bg-success border-0 position-fixed top-0 start-50 translate-middle-x"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{ zIndex: 1056 }}
            >

                <div className="d-flex">

                    <div className="toast-body">
                        Employee role updated successfully.
                    </div>

                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                    />

                </div>

            </div>


            {/* Error */}

            <div
                id="errorToast"
                className="toast align-items-center text-bg-danger border-0 position-fixed top-0 start-50 translate-middle-x"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{ zIndex: 1056 }}
            >

                <div className="d-flex">

                    <div className="toast-body">
                        {errMsg}
                    </div>

                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                    />

                </div>

            </div>

        </>
    );
}