import {IconPencil,IconDeviceFloppy,IconX} from "@tabler/icons-react";

export default function ProfileActionCard({
    editing,
    loading,
    saving,
    onEdit,
    onCancel,
    onSave
}) {

    return (

        <div className="sticky-top"style={{ top: "90px" }}>

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4">

                    <h5 className="fw-bold mb-3">Profile Actions</h5>
                    <p className="text-muted small mb-4">
                        Keep your personal information and driving licence
                        details up to date to ensure a smooth booking
                        experience.
                    </p>

                    { !editing ? (

                            <button className="btn btn-primary w-100 py-2" onClick={onEdit} disabled={loading}>
                                <IconPencil size={18} className="me-2"  />
                                Edit Profile
                            </button>

                        ) : (

                            <>

                                <button className="btn btn-success w-100 py-2 mb-3" onClick={onSave} disabled={saving}>
                                    { saving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"/>Saving...
                                            </>
                                        ) : (
                                            <>
                                                <IconDeviceFloppy size={18} className="me-2"/>
                                                Save Changes
                                            </>
                                        )
                                    }
                                </button>

                                <button className="btn btn-outline-secondary w-100" onClick={onCancel} disabled={saving}>
                                    <IconX size={18} className="me-2" />
                                    Cancel
                                </button>
                            </>
                        )
                    }

                    <hr />

                    <div className="small text-muted">
                        <strong>Note:</strong>
                        <br />
                        Updating your licence details may require
                        verification before they are reflected in future
                        bookings.
                    </div>

                </div>

            </div>

        </div>

    );

}