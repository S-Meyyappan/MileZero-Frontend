import { IconRoad } from "@tabler/icons-react";

const quickKm = [25, 50, 100, 200];

export default function ExtraKmSelector({
    includedKm,
    requestedKm,
    setRequestedKm,
}) {
    return (
        <div className="bg-white rounded-4 shadow-sm border p-4 mt-4">

            <div className="d-flex align-items-center gap-2 mb-4">
                <IconRoad
                    size={24}
                    stroke={1.8}
                    className="text-primary"
                />

                <div>
                    <h4 className="fw-bold mb-0">
                        Distance
                    </h4>

                    <small className="text-muted">
                        Adjust your estimated travel distance.
                    </small>
                </div>
            </div>

            <div className="row g-3 mb-4">

                <div className="col-md-4">

                    <div className="border rounded-4 p-3 text-center h-100">

                        <small className="text-muted d-block">
                            Included
                        </small>

                        <h3 className="fw-bold text-primary mb-0">
                            {includedKm}
                        </h3>

                        <small className="text-muted">
                            km
                        </small>

                    </div>

                </div>

                <div className="col-md-8">

                    <label className="form-label fw-semibold">
                        Total Distance Required
                    </label>

                    <input
                        type="number"
                        min={includedKm}
                        className="form-control form-control-lg rounded-3"
                        value={requestedKm}
                        onChange={(e) =>
                            setRequestedKm(Number(e.target.value))
                        }
                    />

                </div>

            </div>

            <p className="text-muted small mb-2">
                Quick Select
            </p>

            <div className="d-flex flex-wrap gap-2">

                {quickKm.map((km) => {

                    const active =
                        requestedKm === includedKm + km;

                    return (
                        <button
                            key={km}
                            className={`btn ${
                                active
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                            } rounded-pill`}
                            onClick={() =>
                                setRequestedKm(
                                    includedKm + km
                                )
                            }
                        >
                            +{km} km
                        </button>
                    );
                })}

            </div>

        </div>
    );
}