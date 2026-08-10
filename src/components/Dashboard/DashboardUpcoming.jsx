import {
    IconArrowRight,
    IconCalendarEvent,
    IconCar,
    IconMapPin,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

const DashboardUpcoming = ({ bookings = [] }) => {

    const navigate = useNavigate();

    const formatDateTime = (date) => {
        if (!date) return "-";

        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "numeric",
            minute: "2-digit",
        }).format(new Date(date));
    };

    const getVehicleName = (booking) => {
        if (!booking?.vehicle) return "Vehicle";

        return `${booking.vehicle.manufacturer} ${booking.vehicle.model}`;
    };

    const getLocationName = (booking) => {
        return booking?.pickupBranch?.name || "Pickup location";
    };

    const handleViewBooking = (bookingId) => {
        navigate(`my-bookings/${bookingId}`);
    };

    return (
        <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className="h4 fw-bold mb-1">Upcoming Bookings</h2>
                    <p className="text-secondary mb-0">
                        Your scheduled rentals
                    </p>
                </div>

                {bookings.length > 0 && (
                    <button
                        type="button"
                        className="btn btn-link text-primary text-decoration-none fw-medium p-0"
                        onClick={() => navigate("/my-bookings")}
                    >
                        View all
                        <IconArrowRight size={17} className="ms-1" />
                    </button>
                )}
            </div>

            {bookings.length === 0 ? (
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body text-center py-5 px-4">
                        <div className="d-inline-flex align-items-center justify-content-center bg-light text-primary rounded-circle p-3 mb-3">
                            <IconCalendarEvent size={28} stroke={1.7} />
                        </div>

                        <h3 className="h5 fw-bold mb-2">
                            No upcoming bookings
                        </h3>

                        <p className="text-secondary mb-4">
                            Find a vehicle and plan your next trip.
                        </p>

                        <button
                            type="button"
                            className="btn btn-primary rounded-3 px-4"
                            onClick={() => navigate("/vehicles")}
                        >
                            Browse Vehicles
                        </button>
                    </div>
                </div>
            ) : (
                <div className="row g-3">
                    {bookings.map((booking, index) => {
                        const isFeatured = index === 0;
                        const vehicleName = getVehicleName(booking);

                        return (
                            <div
                                key={booking.bookingId}
                                className={isFeatured ? "col-12" : "col-12 col-lg-6"}
                            >
                                <div className="card h-100 border-0 shadow-sm rounded-4">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                                            <div>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <IconCar
                                                        size={20}
                                                        className="text-primary"
                                                    />

                                                    <h3 className="h5 fw-bold mb-0">
                                                        {vehicleName}
                                                    </h3>
                                                </div>

                                                <span className="text-secondary small">
                                                    Booking #{booking.bookingId}
                                                </span>
                                            </div>

                                            <span className="badge text-bg-primary rounded-pill px-3 py-2">
                                                {booking.bookingStatus}
                                            </span>
                                        </div>

                                        <div className="row g-3 mb-4">
                                            <div className="col-12 col-md-5">
                                                <div className="small text-secondary fw-medium mb-1">
                                                    PICKUP
                                                </div>

                                                <div className="fw-semibold">
                                                    {formatDateTime(
                                                        booking.plannedPickup
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-2 d-none d-md-flex align-items-center justify-content-center">
                                                <IconArrowRight
                                                    size={20}
                                                    className="text-secondary"
                                                />
                                            </div>

                                            <div className="col-12 col-md-5">
                                                <div className="small text-secondary fw-medium mb-1">
                                                    RETURN
                                                </div>

                                                <div className="fw-semibold">
                                                    {formatDateTime(
                                                        booking.plannedReturn
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-2 text-secondary mb-4">
                                            <IconMapPin size={18} />

                                            <span>
                                                {getLocationName(booking)}
                                            </span>
                                        </div>

                                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                            <div className="d-flex flex-wrap gap-3">
                                                <span className="small">
                                                    <strong>
                                                        {booking.duration}
                                                    </strong>{" "}
                                                    days
                                                </span>

                                                <span className="small">
                                                    <strong>
                                                        {booking.includedKm}
                                                    </strong>{" "}
                                                    km included
                                                </span>

                                                <span className="small">
                                                    <strong>
                                                        ₹
                                                        {Number(
                                                            booking.estimatedCost ?? 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>{" "}
                                                    estimated
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary rounded-3"
                                                onClick={() =>
                                                    handleViewBooking(
                                                        booking.bookingId
                                                    )
                                                }
                                            >
                                                View Booking
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default DashboardUpcoming;