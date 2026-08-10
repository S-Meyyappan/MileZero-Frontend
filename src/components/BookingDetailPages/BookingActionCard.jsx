import {
    IconEye,
    IconX,
    IconPencil,
    IconTruckDelivery,
    IconCircleCheck,
    IconDownload,
    IconReceipt2,
    IconCar,
    IconKey,
    IconKeyFilled,
    IconReportAnalytics
} from "@tabler/icons-react";

export default function BookingActionCard({
    booking,
    role,
    loading = false,
    onCancel,
    onEdit,
    onReturnVehicle,
    onCompleteBooking,
    onDownloadInvoice,
    onRecordPickup
}) {

    const isCustomer = role === "CUSTOMER";
    const isEmployee = role === "EMPLOYEE";
    const isManager = role === "MANAGER";
    const isAdmin = role === "ADMIN";

    return (

        <div
            className="sticky-top"
            style={{ top: "90px" }}
        >

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4">

                    <h5 className="fw-bold mb-4">

                        Booking Actions

                    </h5>

                    <div className="border rounded-4 p-3 mb-4">

                        <div className="d-flex justify-content-between mb-2">

                            <span className="text-muted">

                                Booking ID

                            </span>

                            <span className="fw-semibold">

                                #{booking.bookingId}

                            </span>

                        </div>

                        <div className="d-flex justify-content-between">

                            <span className="text-muted">

                                Status

                            </span>

                            <span className="badge bg-primary">

                                {booking.bookingStatus}

                            </span>

                        </div>

                    </div>

                    {/* Customer */}

                    {

                        isCustomer &&
                        booking.bookingStatus === "BOOKED" && (

                            <>

                                <button
                                    className="btn btn-danger w-100 mb-3"
                                    onClick={onCancel}
                                    disabled={loading}
                                >

                                    <IconX
                                        size={18}
                                        className="me-2"
                                    />

                                    Cancel Booking

                                </button>

                                <button
                                    className="btn btn-outline-primary w-100"
                                    onClick={onDownloadInvoice}
                                >

                                    <IconReceipt2
                                        size={18}
                                        className="me-2"
                                    />

                                    Download Invoice

                                </button>

                            </>

                        )

                    }

                    {/* Employee */}

                    {

                        isEmployee &&
                        booking.bookingStatus === "BOOKED" && (

                            <>
                                <button className="btn btn-warning w-100" onClick={onEdit}>
                                    <IconPencil size={18} className="mb-2" /> &nbsp;
                                    Mark No Show
                                </button>
                                <div className="m-3"></div>
                                <button className="btn btn-primary w-100" onClick={onRecordPickup} disabled={loading}>
                                    <IconKeyFilled size={18} className="mb-2" /> &nbsp;
                                    Record Pickup
                                </button>
                            </>
                        )

                    }

                    {

                        isEmployee &&
                        booking.bookingStatus === "ACTIVE" && (

                            <button
                                className="btn btn-success w-100"
                                onClick={onReturnVehicle}
                            >

                                <IconTruckDelivery
                                    size={18}
                                    className="me-2"
                                />

                                Return Vehicle

                            </button>

                        )

                    }

                    {/* Manager/Admin */}

                    {

                        booking.bookingStatus === "RETURNED" || booking.bookingStatus === "COMPLETED" && (
                            <>

                                <button
                                    className="btn btn-info w-100"
                                    onClick={onCompleteBooking}
                                >

                                    <IconCircleCheck
                                        size={18}
                                        className="me-2"
                                    />

                                    Complete Booking

                                </button>



                                <hr />

                                <div className="d-grid">

                                    <button className="btn text-dark w-100" style={{ backgroundColor: '#e2d9f3' }}
                                        onClick={() => navigate(`${booking.bookingId}/summary`)}
                                    >
                                        <IconReportAnalytics size={18} className="me-1" />
                                        Booking Summary
                                    </button>

                                </div>

                            </>

                        )}



                    <div className="alert alert-light border mt-4 mb-0">

                        <small className="text-muted">

                            Actions shown here depend on your role and the
                            current booking status. Additional actions will
                            become available as the booking progresses.

                        </small>

                    </div>

                </div>

            </div>

        </div>

    );

}