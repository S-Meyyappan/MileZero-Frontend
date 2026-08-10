export default function VehicleBasicInfoCard({
    form,
    onChange,
    disabled
}) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({
            ...form,
            [name]: value
        })
    }

    return (

        <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Vehicle Information</h5>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Manufacturer </label>
                        <input type="text" name="manufacturer" className="form-control"
                            value={form.manufacturer}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Model</label>
                        <input type="text" name="model" className="form-control"
                            value={form.model}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Manufacturing Year </label>
                        <input type="number" name="manufacturingYear" className="form-control"
                            value={form.manufacturingYear}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Purchase Date</label>
                        <input type="date" name="purchaseDate" className="form-control"
                            value={form.purchaseDate}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Registration Number </label>
                        <input type="text" name="registrationNo" className="form-control"
                            value={form.registrationNo}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Chassis Number</label>
                        <input type="text" name="chassisNo"  className="form-control"
                            value={form.chassisNo}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-semibold">Status</label>
                        <select name="currentStatus" className="form-select" value={form.currentStatus}
                            onChange={handleChange}
                            disabled={disabled}
                        >

                            <option value="AVAILABLE">Available </option>
                            <option value="RENTED">Rented </option>
                            <option value="MAINTENANCE">Maintenance</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>

                    </div>

                </div>

            </div>

        </div>

    );
}