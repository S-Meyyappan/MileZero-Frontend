import { IconClipboardCheck } from "@tabler/icons-react";

export default function PickupFormCard({
    form,
    onChange,
    loading = false
}) {

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4">

                <div className="d-flex align-items-center mb-4">

                    <IconClipboardCheck
                        size={28}
                        className="text-success me-2"
                    />

                    <h5 className="fw-bold mb-0">
                        Pickup Details
                    </h5>

                </div>

                <div className="row g-4">

                    <div className="col-md-6">

                        <label className="form-label fw-semibold">
                            Odometer <span className="text-danger">*</span>
                        </label>

                        <input
                            type="number"
                            min="0"
                            name="odometer"
                            className="form-control"
                            placeholder="Enter current odometer"
                            value={form.odometer}
                            onChange={onChange}
                            disabled={loading}
                            required
                        />

                    </div>

                    <div className="col-md-6">

                        <label className="form-label fw-semibold">
                            Fuel Level <span className="text-danger">*</span>
                        </label>

                        <select
                            name="fuelLevel"
                            className="form-select"
                            value={form.fuelLevel}
                            onChange={onChange}
                            disabled={loading}
                        >
                            <option value="EMPTY">Empty</option>
                            <option value="QUARTER">Quarter</option>
                            <option value="HALF">Half</option>
                            <option value="THREE_QUARTER">Three Quarter</option>
                            <option value="FULL">Full</option>
                        </select>

                    </div>

                    <div className="col-12">

                        <label className="form-label fw-semibold">
                            Remarks
                        </label>

                        <textarea
                            rows={4}
                            name="remarks"
                            className="form-control"
                            placeholder="Enter any remarks (optional)"
                            value={form.remarks}
                            onChange={onChange}
                            disabled={loading}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}