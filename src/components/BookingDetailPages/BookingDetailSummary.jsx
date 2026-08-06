import {
    IconReceipt2,
    IconClock,
    IconRoute,
    IconCash,
    IconWallet,
    IconCalendarStats,
    IconCircleCheck
} from "@tabler/icons-react";

export default function BookingDetailSummaryCard({ booking }) {

    const isDaily = booking.bookingType === "DAILY";

    const rows = [
        {
            label: "Booking Type",
            value: booking.bookingType
        },
        {
            label: "Booking Status",
            value: booking.bookingStatus
        },
        {
            label: "Duration",
            value: `${booking.duration} ${isDaily ? "Day(s)" : "Hour(s)"}`
        },
        {
            label: "Included Distance",
            value: `${booking.includedKm} KM`
        },
        {
            label: "Booked Rate",
            value: `₹${booking.bookedRate} / ${isDaily ? "Day" : "Hour"}`
        }
    ];

    return (

        <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

                <div className="d-flex align-items-center gap-2 mb-4">

                    <IconReceipt2 className="text-primary" />

                    <h5 className="fw-bold mb-0">

                        Booking Summary

                    </h5>

                </div>

                {
                    rows.map((row) => (

                        <div
                            key={row.label}
                            className="d-flex justify-content-between align-items-center py-3 border-bottom"
                        >

                            <span className="text-muted">

                                {row.label}

                            </span>

                            <span className="fw-semibold text-end">

                                {row.value}

                            </span>

                        </div>

                    ))
                }

                <div className="mt-4">

                    <div className="row g-3">

                        <div className="col-6">

                            <div className="border rounded-4 p-3 text-center h-100">

                                <IconClock
                                    className="text-primary mb-2"
                                />

                                <div className="small text-muted">

                                    Duration

                                </div>

                                <div className="fw-bold">

                                    {booking.duration}

                                </div>

                            </div>

                        </div>

                        <div className="col-6">

                            <div className="border rounded-4 p-3 text-center h-100">

                                <IconRoute
                                    className="text-primary mb-2"
                                />

                                <div className="small text-muted">

                                    Included KM

                                </div>

                                <div className="fw-bold">

                                    {booking.includedKm}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <hr className="my-4" />

                <div className="border rounded-4 p-3 mb-3">

                    <div className="d-flex align-items-center justify-content-between">

                        <div className="d-flex align-items-center">

                            <IconCash
                                className="text-success me-2"
                            />

                            <span className="fw-semibold">

                                Estimated Cost

                            </span>

                        </div>

                        <h5 className="fw-bold text-success mb-0">

                            ₹{booking.estimatedCost}

                        </h5>

                    </div>

                </div>

                <div className="border rounded-4 p-3">

                    <div className="d-flex align-items-center justify-content-between">

                        <div className="d-flex align-items-center">

                            <IconWallet
                                className="text-primary me-2"
                            />

                            <span className="fw-semibold">

                                Final Cost

                            </span>

                        </div>

                        {

                            booking.finalCost != null ? (

                                <h5 className="fw-bold text-primary mb-0">

                                    ₹{booking.finalCost}

                                </h5>

                            ) : (

                                <span className="badge bg-secondary">

                                    Pending

                                </span>

                            )

                        }

                    </div>

                </div>

                <div className="alert alert-light border mt-4 mb-0">

                    <div className="d-flex">

                        <IconCircleCheck
                            className="text-success me-2 mt-1"
                            size={18}
                        />

                        <small>

                            Charges may change after vehicle return if
                            additional distance, late return, fuel difference,
                            damage charges or other applicable fees are incurred.

                        </small>

                    </div>

                </div>

            </div>

        </div>

    );

}