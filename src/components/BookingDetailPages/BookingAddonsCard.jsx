import {
    IconPackage,
    IconCircleCheck,
    IconInfoCircle
} from "@tabler/icons-react";

export default function BookingAddonsCard({ addons = [] }) {

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4">

                <div className="d-flex align-items-center gap-2 mb-4">

                    <IconPackage
                        className="text-primary"
                    />

                    <h5 className="fw-bold mb-0">

                        Selected Add-ons

                    </h5>

                </div>

                {

                    addons.length === 0 ? (

                        <div className="alert alert-light border mb-0 d-flex align-items-center">

                            <IconInfoCircle
                                className="text-secondary me-2"
                                size={20}
                            />

                            No add-ons were selected for this booking.

                        </div>

                    ) : (

                        <>

                            {

                                addons.map((addon, index) => {

                                    const total =
                                        addon.pricePerDay *
                                        addon.quantity;

                                    return (

                                        <div
                                            key={index}
                                            className={`border rounded-4 p-3 ${index !== addons.length - 1
                                                    ? "mb-3"
                                                    : ""
                                                }`}
                                        >

                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                                                <div>

                                                    <div className="fw-bold">

                                                        {addon.name}

                                                    </div>

                                                    <small className="text-muted">

                                                        Optional rental add-on

                                                    </small>

                                                </div>

                                                <span className="badge bg-success">

                                                    Selected

                                                </span>

                                            </div>

                                            <hr />

                                            <div className="row text-center">

                                                <div className="col-md-4">

                                                    <small className="text-muted d-block">

                                                        Price / Day

                                                    </small>

                                                    <div className="fw-semibold">

                                                        ₹{addon.pricePerDay}

                                                    </div>

                                                </div>

                                                <div className="col-md-4">

                                                    <small className="text-muted d-block">

                                                        Quantity

                                                    </small>

                                                    <div className="fw-semibold">

                                                        × {addon.quantity}

                                                    </div>

                                                </div>

                                                <div className="col-md-4">

                                                    <small className="text-muted d-block">

                                                        Total / Day

                                                    </small>

                                                    <div className="fw-bold text-primary">

                                                        ₹{total.toFixed(2)}

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })

                            }

                            <div className="alert alert-light border mt-4 mb-0">

                                <div className="d-flex">

                                    <IconCircleCheck
                                        className="text-success me-2 mt-1"
                                        size={18}
                                    />

                                    <small>

                                        Add-on charges are included in the
                                        estimated booking cost and are billed
                                        for the rental duration.

                                    </small>

                                </div>

                            </div>

                        </>

                    )

                }

            </div>

        </div>

    );

}