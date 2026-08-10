import {
    IconArrowRight,
    IconCalendarEvent,
    IconCircleCheck,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

const DashboardRecent = ({ bookings = [] }) => {
    const navigate = useNavigate();

    const formatDate = (date) => {
        if (!date) return "-";

        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    const getVehicleName = (booking) => {
        if (!booking?.vehicle) return "Vehicle";

        return `${booking.vehicle.manufacturer} ${booking.vehicle.model}`;
    };

    return (
        <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className="h4 fw-bold mb-1">Recent Bookings</h2>

                    <p className="text-secondary mb-0">
                        Your latest rental activity
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
                            No recent bookings
                        </h3>

                        <p className="text-secondary mb-4">
                            Your previous rental activity will appear here.
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
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="list-group list-group-flush">
                        {bookings.map((booking) => (
                            <button
                                key={booking.bookingId}
                                type="button"
                                className="list-group-item list-group-item-action border-0 px-4 py-3"
                                onClick={() =>
                                    navigate(`/bookings/${booking.bookingId}`)
                                }
                            >
                                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-light text-primary rounded-3 p-2 flex-shrink-0">
                                            <IconCar
                                                size={21}
                                                stroke={1.8}
                                            />
                                        </div>

                                        <div className="text-start">
                                            <div className="fw-semibold">
                                                {getVehicleName(booking)}
                                            </div>

                                            <div className="small text-secondary">
                                                Booking #{booking.bookingId}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap align-items-center gap-3">
                                        <div className="small text-secondary">
                                            {formatDate(
                                                booking.plannedPickup
                                            )}
                                            {" → "}
                                            {formatDate(
                                                booking.plannedReturn
                                            )}
                                        </div>

                                        <span className="badge text-bg-light border rounded-pill px-3 py-2">
                                            {booking.bookingStatus}
                                        </span>

                                        <IconArrowRight
                                            size={18}
                                            className="text-secondary"
                                        />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default DashboardRecent;