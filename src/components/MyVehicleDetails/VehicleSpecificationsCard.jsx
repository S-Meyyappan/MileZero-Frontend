export default function VehicleSpecificationsCard({
    form,
    onChange,
    disabled,
    fuelTypes = [],
    transmissions = []
}) {

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;
        onChange({
            ...form,
            [name]: type === "checkbox"
                ? checked
                : value
        })
    }

    return (

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">

                <h5 className="fw-bold mb-4">Specifications</h5>

                <div className="row g-3">

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Fuel Type</label>
                        <select name="fuelType" className="form-select"
                            value={form.fuelType}
                            onChange={handleChange}
                            disabled={disabled}
                        >
                            <option value="" >SELECT</option>
                            {fuelTypes.map((fuelType, index) => (
                                <option key={index} value={fuelType}>
                                    {fuelType}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Transmission</label>
                        <select name="transmission" className="form-select"
                            value={form.transmission}
                            onChange={handleChange}
                            disabled={disabled}
                        >
                            <option value="" >SELECT</option>
                             {transmissions.map((transmission, index) => (
                                <option key={index}value={transmission}>
                                    {transmission}
                                </option>
                            ))}
                            </select>
                    </div>


                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Drive Type</label>
                        <select name="driveType" className="form-select"
                            value={form.driveType}
                            onChange={handleChange}
                            disabled={disabled}
                        >
                            <option value="" >SELECT</option>
                            <option value="FWD">FWD</option>
                            <option value="RWD">RWD</option>
                            <option value="AWD">AWD</option>
                        </select>
                    </div>


                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Current Odometer</label>
                        <input type="number" name="currentOdometer" className="form-control"
                            value={form.currentOdometer}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>


                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Seat Count</label>
                        <input type="number" name="seatCount" className="form-control"
                            value={form.seatCount}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>


                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Luggage Capacity</label>
                        <input type="number" name="luggageCapacity" className="form-control"
                            value={form.luggageCapacity}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>

                    <div className="col-12">
                        <div className="form-check form-switch">
                            <input type="checkbox" className="form-check-input" id="withAc" name="withAc"
                                checked={form.withAc}
                                onChange={handleChange}
                                disabled={disabled}
                            />
                            <label className="form-check-label fw-semibold" htmlFor="withAc">Air Conditioning</label>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    );
}