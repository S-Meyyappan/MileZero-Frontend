import {
    IconReceipt2,
    IconCash,
    IconClock,
    IconRoute,
    IconCircleCheck
} from "@tabler/icons-react";

export default function BookingCostBreakdownCard({ booking }) {

    const isDaily = booking.bookingType === "DAILY";

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4">

                <div className="d-flex align-items-center gap-2 mb-4">

                    <IconReceipt2
                        className="text-primary"
                    />

                    <h5 className="fw-bold mb-0">

                        Cost Breakdown

                    </h5>

                </div>

                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">

                    <div className="d-flex align-items-center">

                        <IconCash
                            size={18}
                            className="text-primary me-2"
                        />

                        <span>

                            Booked Rate

                        </span>

                    </div>

                    <span className="fw-semibold">

                        ₹{booking.bookedRate} / {isDaily ? "Day" : "Hour"}

                    </span>

                </div>

                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">

                    <div className="d-flex align-items-center">

                        <IconClock
                            size={18}
                            className="text-primary me-2"
                        />

                        <span>

                            Duration

                        </span>

                    </div>

                    <span className="fw-semibold">

                        {booking.duration} {isDaily ? "Day(s)" : "Hour(s)"}

                    </span>

                </div>

                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">

                    <div className="d-flex align-items-center">

                        <IconRoute
                            size={18}
                            className="text-primary me-2"
                        />

                        <span>

                            Included Distance

                        </span>

                    </div>

                    <span className="fw-semibold">

                        {booking.includedKm} KM

                    </span>

                </div>

                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">

                    <span>

                        Estimated Cost

                    </span>

                    <span className="fw-bold">

                        ₹{booking.estimatedCost}

                    </span>

                </div>

                <div className="d-flex justify-content-between align-items-center py-3">

                    <span>

                        Final Cost

                    </span>

                    {

                        booking.finalCost != null ? (

                            <span className="fw-bold text-success">

                                ₹{booking.finalCost}

                            </span>

                        ) : (

                            <span className="badge bg-secondary">

                                Pending

                            </span>

                        )

                    }

                </div>

                <hr className="my-4" />

                <div className="bg-light rounded-4 p-4">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <small className="text-muted d-block">

                                {

                                    booking.finalCost != null
                                        ? "Amount Payable"
                                        : "Estimated Amount"

                                }

                            </small>

                            <h3 className="fw-bold mb-0">

                                ₹{

                                    booking.finalCost ??
                                    booking.estimatedCost

                                }

                            </h3>

                        </div>

                        <IconCash
                            size={40}
                            className="text-success"
                        />

                    </div>

                </div>

                <div className="alert alert-light border mt-4 mb-0">

                    <div className="d-flex">

                        <IconCircleCheck
                            className="text-success me-2 mt-1"
                            size={18}
                        />

                        <small>

                            The final amount is calculated after vehicle
                            return and may include additional distance,
                            fuel adjustments, late return charges or
                            damage-related fees.

                        </small>

                    </div>

                </div>

            </div>

        </div>

    );

}