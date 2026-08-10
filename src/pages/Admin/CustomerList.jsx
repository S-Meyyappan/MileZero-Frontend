
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
    IconTrash,
    IconUsers,
    IconLicense,
    IconCalendar,
    IconPhone,
    IconFile,
    IconShieldCheck,
} from "@tabler/icons-react";

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAllCustomers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/customer/get-all"
            );

            setCustomers(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch customers:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to load customers"
            );
        }
    };

    useEffect(() => {
        getAllCustomers();
    }, []);

    const handleDeleteClick = (customer) => {

        setSelectedCustomer(customer);

        toast(
            (t) => (
                <div className="p-1">

                    <div className="d-flex align-items-start gap-3">

                        <div className="rounded-circle bg-danger-subtle text-danger p-2">
                            <IconTrash size={20} />
                        </div>

                        <div className="flex-grow-1">

                            <div className="fw-semibold text-dark mb-1">
                                Delete {customer.name}?
                            </div>

                            <div className="text-muted small mb-3">
                                This action cannot be undone.
                            </div>

                            <div className="d-flex gap-2">

                                <button
                                    type="button"
                                    className="btn btn-light border btn-sm rounded-3"
                                    onClick={() =>
                                        toast.dismiss(t.id)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm rounded-3"
                                    onClick={() => {

                                        toast.dismiss(t.id);

                                        handleDelete(
                                            customer.id
                                        );

                                    }}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            ),
            {
                duration: Infinity,
                position: "top-center",
            }
        );
    };

    const handleDelete = async (id) => {

        try {

            setLoading(true);

            await axios.delete(
                `http://localhost:8080/api/customer/delete/${id}`
            );

            toast.success(
                "Customer deleted successfully"
            );

            await getAllCustomers();

            setSelectedCustomer(null);

        } catch (error) {

            console.error(
                "Customer deletion failed:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to delete customer"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="container py-4">

            {/* Header */}

            <div className="mb-4">

                <div className="d-flex align-items-center gap-2 mb-1">

                    <IconUsers
                        size={25}
                        stroke={1.8}
                    />

                    <h2 className="fw-bold mb-0">
                        Customers
                    </h2>

                </div>

                <p className="text-muted mb-0">
                    Manage registered customers and their
                    driving information.
                </p>

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
                                    CUSTOMER
                                </th>

                                <th className="py-3 text-muted small">
                                    PHONE
                                </th>

                                <th className="py-3 text-muted small">
                                    LICENSE
                                </th>

                                <th className="py-3 text-muted small">
                                    EXPIRY
                                </th>

                                <th className="py-3 text-muted small">
                                    INSURANCE
                                </th>

                                <th className="py-3 text-muted small">
                                    LICENSE PHOTO
                                </th>

                                <th className="text-end pe-4 py-3 text-muted small">
                                    ACTIONS
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {customers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center py-5"
                                    >

                                        <IconUsers
                                            size={42}
                                            stroke={1.4}
                                            className="text-secondary mb-2"
                                        />

                                        <div className="fw-semibold">
                                            No customers found
                                        </div>

                                        <div className="text-muted small">
                                            Registered customers will
                                            appear here.
                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                customers.map((customer) => (

                                    <tr key={customer.id}>

                                        {/* ID */}

                                        <td className="ps-4 text-muted">
                                            {customer.id}
                                        </td>


                                        {/* CUSTOMER */}

                                        <td>

                                            <div className="d-flex align-items-center gap-3">

                                                <div
                                                    className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                                                    style={{
                                                        width: "40px",
                                                        height: "40px"
                                                    }}
                                                >
                                                    <IconUsers
                                                        size={19}
                                                        stroke={1.8}
                                                    />
                                                </div>

                                                <div>

                                                    <div className="fw-semibold text-dark">
                                                        {customer.name}
                                                    </div>

                                                    <div className="text-muted small">
                                                        Customer #{customer.id}
                                                    </div>

                                                </div>

                                            </div>

                                        </td>


                                        {/* PHONE */}

                                        <td>

                                            <div className="d-flex align-items-center gap-2 text-muted">

                                                <IconPhone
                                                    size={17}
                                                    stroke={1.8}
                                                />

                                                {customer.phone}

                                            </div>

                                        </td>


                                        {/* LICENSE */}

                                        <td>

                                            <div className="d-flex align-items-center gap-2">

                                                <div className="rounded-3 bg-light p-2">
                                                    <IconLicense
                                                        size={17}
                                                        stroke={1.8}
                                                    />
                                                </div>

                                                <span className="fw-medium">
                                                    {customer.licenseNo}
                                                </span>

                                            </div>

                                        </td>


                                        {/* EXPIRY */}

                                        <td>

                                            <div className="d-flex align-items-center gap-2">

                                                <IconCalendar
                                                    size={17}
                                                    stroke={1.8}
                                                    className="text-muted"
                                                />

                                                <span className="text-muted">
                                                    {customer.licenseExpiryDate}
                                                </span>

                                            </div>

                                        </td>


                                        {/* INSURANCE */}

                                        <td>

                                            {customer.insurancePolicyNo ? (

                                                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2">

                                                    <IconShieldCheck
                                                        size={14}
                                                        className="me-1"
                                                    />

                                                    {
                                                        customer.insurancePolicyNo
                                                    }

                                                </span>

                                            ) : (

                                                <span className="badge bg-light text-muted border rounded-pill px-3 py-2">
                                                    Not provided
                                                </span>

                                            )}

                                        </td>


                                        {/* LICENSE PHOTO */}

                                        <td>

                                            {customer.licensePhoto ? (

                                                <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2">

                                                    <IconFile
                                                        size={14}
                                                        className="me-1"
                                                    />

                                                    Available

                                                </span>

                                            ) : (

                                                <span className="badge bg-light text-muted border rounded-pill px-3 py-2">
                                                    Not uploaded
                                                </span>

                                            )}

                                        </td>


                                        {/* DELETE */}

                                        <td className="pe-4 text-end">

                                            <button
                                                type="button"
                                                className="btn btn-outline-danger border-0 rounded-3"
                                                title="Delete customer"
                                                disabled={loading}
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        customer
                                                    )
                                                }
                                            >

                                                <IconTrash
                                                    size={19}
                                                    stroke={1.8}
                                                />

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}