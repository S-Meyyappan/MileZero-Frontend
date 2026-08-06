import {IconCreditCard,IconCalendarEvent,IconPhoto,IconUpload,IconShieldCheck,IconAlertTriangle,IconCircleX} from "@tabler/icons-react";

export default function DrivingLicenseCard({
    form,
    setForm,
    editing,
    licensePhoto,
    setlicensePhoto,
    licensePreview,
    setLicensePreview
}) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLicenseUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setlicensePhoto(file);
        setLicensePreview(
            URL.createObjectURL(file)
        )
    }

    const getLicenseStatus = () => {
        if (!form.licenseExpiryDate) {
            return {
                text: "Unknown",
                badge: "bg-secondary",
                icon: <IconAlertTriangle size={16} />
            };
        }

        const expiry = new Date(form.licenseExpiryDate);
        const today = new Date();

        const diffDays = Math.ceil(
            (expiry - today) /
            (1000 * 60 * 60 * 24)
        );

        if (diffDays < 0) {
            return {
                text: "Expired",
                badge: "bg-danger",
                icon: <IconCircleX size={16} />
            };

        }

        if (diffDays <= 30) {
            return {
                text: "Expires Soon",
                badge: "bg-warning text-dark",
                icon: <IconAlertTriangle size={16} />
            };

        }

        return {
            text: "Valid",
            badge: "bg-success",
            icon: <IconShieldCheck size={16} />
        }

    }

    const status = getLicenseStatus();

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <IconCreditCard className="text-primary" />
                        <h5 className="fw-bold mb-0"> Driving Licence </h5>
                    </div>

                    <span className={`badge ${status.badge} d-flex align-items-center gap-1`}>
                        {status.icon}
                        {status.text}
                    </span>
                </div>

                <div className="row g-4">

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Licence Number</label>
                        <input type="text" className="form-control" name="licenseNo"
                            value={form.licenseNo}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-semibold"> Expiry Date</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><IconCalendarEvent size={18} /></span>
                            <input
                                type="date"
                                className="form-control"
                                name="licenseExpiryDate"
                                value={form.licenseExpiryDate}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>
                    </div>

                </div>

                <hr className="my-4" />
                <label className="form-label fw-semibold">Driving Licence Photo</label>

                { licensePreview ? (

                        <div className="border rounded-4 p-3 mb-3 text-center">
                            <img
                                src={licensePreview}
                                alt="Driving Licence"
                                className="img-fluid rounded"
                                style={{
                                    maxHeight: "260px",
                                    objectFit: "contain"
                                }}
                            />
                        </div>

                    ) : (

                        <div className="border rounded-4 p-5 text-center text-muted mb-3">
                            <IconPhoto size={55} className="mb-3"/>
                            <div> No driving licence uploaded</div>
                        </div>

                    )

                }

                { editing && (

                        <div>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleLicenseUpload}
                            />
                            <small className="text-muted">Upload a clear image of the front side of your driving licence.</small>
                        </div>
                    )
                }

            </div>

        </div>

    );

}