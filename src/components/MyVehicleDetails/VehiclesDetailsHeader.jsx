import {
    IconArrowLeft,
    IconEdit,
    IconX,
    IconDeviceFloppy
} from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function VehicleDetailsHeader({
    vehicle,
    isEditing,
    isCreate,
    onEdit,
    onCancel,
    onSave,
    saving
}) {

    const navigate = useNavigate()

    const auth = useSelector(state => state.auth)
    
    const canEdit = isCreate ? true : auth?.form?.role === "MANAGER" || auth?.fom?.role === "ADMIN";

    return (

        <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

                <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)} disabled={saving}>
                    <IconArrowLeft size={18} className="me-2" />
                    Back
                </button>

                <div className="d-flex align-items-center gap-3">

                    {isCreate ? (

                        <div>
                            <h2 className="fw-bold mb-1">
                                Add New Vehicle
                            </h2>

                            <p className="text-muted mb-0">
                                Enter the vehicle details below
                            </p>
                        </div>

                    ) : (

                        <>
                            <div>
                                <h2 className="fw-bold mb-1">
                                    {vehicle?.manufacturer} {vehicle?.model}
                                </h2>

                                <p className="text-muted mb-0">
                                    {vehicle?.manufacturingYear}
                                    {" • "}
                                    {vehicle?.category?.name}
                                    {" • "}
                                    {vehicle?.registrationNo}
                                </p>
                            </div>

                            <span className="badge bg-success-subtle text-success px-3 py-2">
                                {vehicle?.currentStatus}
                            </span>
                        </>

                    )}

                </div>
            </div>

            {canEdit && !isEditing && (

                <button className="btn btn-primary" onClick={onEdit}>
                    <IconEdit size={18} className="me-2" />
                    Edit Vehicle
                </button>

            )}

            {canEdit && isEditing && (

                <div className="d-flex gap-2">

                    <button className="btn btn-outline-secondary" onClick={onCancel} disabled={saving}>
                        <IconX size={18} className="me-2" />
                        Cancel
                    </button>

                    <button className="btn btn-success" onClick={onSave} disabled={saving}>
                        {saving ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <IconDeviceFloppy size={18} className="me-2" />
                                Save Changes
                            </>
                        )}
                    </button>

                </div>

            )}

        </div>

    );
}