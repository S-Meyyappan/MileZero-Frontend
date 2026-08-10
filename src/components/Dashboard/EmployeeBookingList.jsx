import {
    IconArrowRight,
    IconCalendarEvent,
    IconCar,
    IconMapPin,
    IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

const EmployeeBookingList = ({
    bookings = [],
    type = "pickup",
    title,
    subtitle,
}) => {
    const navigate = useNavigate();

    const isReturn = type === "return";

    const formatDateTime = (date) => {
        if (!date) return "-";

        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }).format(new Date(date));
    };

    const getVehicleName = (booking) => {
        if (!booking?.vehicle) return "Vehicle"

        return `${booking.vehicle.manufacturer} ${booking.vehicle.model}`;
    }

    const getDate = (booking) => ( isReturn ? booking.plannedReturn : booking.plannedPickup )

    const getLocation = (booking) => ( isReturn ? booking?.returnBranch?.name : booking?.pickupBranch?.name )

    const handleViewBooking = (bookingId) => { navigate(`my-bookings/${bookingId}`);};

    return (
        <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className="h4 fw-bold mb-1">{title}</h2>
                    <p className="text-secondary mb-0">{subtitle}</p>
                </div>

                {bookings.length > 0 && (
                    <button type="button" className="btn btn-link text-primary text-decoration-none fw-medium p-0"
                        onClick={() => navigate("/employee/bookings")}
                    >
                        View all
                        <IconArrowRight size={17} className="ms-1"/>
                    </button>
                )}
            </div>

            {bookings.length === 0 ? (
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body text-center py-5 px-4">
                        <div className="d-inline-flex align-items-center justify-content-center bg-light text-primary rounded-circle p-3 mb-3">
                            <IconCalendarEvent size={28} stroke={1.7}/>
                        </div>
                        <h3 className="h5 fw-bold mb-2">
                            {isReturn ? "No upcoming returns" : "No upcoming pickups"}
                        </h3>
                        <p className="text-secondary mb-0">
                            {isReturn ? "There are no vehicles scheduled for return." : "There are no upcoming customer pickups."}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="row g-3">
                    {bookings.map((booking, index) => (
                        <div key={booking.bookingId} className="col-12 col-lg-6">
                            <div className="card h-100 border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">

                                    {/* Header */}
                                    <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                                        <div>
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <IconCar size={20}className="text-primary"/>

                                                <h3 className="h5 fw-bold mb-0">
                                                    {getVehicleName(booking)}
                                                </h3>
                                            </div>

                                            <div className="d-flex flex-column gap-1">
                                                <span className="text-secondary small">
                                                    Booking #{booking.bookingId}
                                                </span>

                                                <span className="small text-secondary d-flex align-items-center gap-1">
                                                    <IconUser size={15}/>
                                                    {booking.customer ?.name || "Customer"}
                                                </span>

                                                {booking.customer?.phone && (
                                                    <span className="small text-secondary">
                                                        {booking.customer.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <span className="badge rounded px-3 py-2" style={booking.bookingStatus === "ACTIVE" 
                                                                                            ? { backgroundColor: '#fff56f', color: '#4A4A4A' }
                                                                                            : { backgroundColor: '#dffcb8', color: '#4A4A4A' }
                                                                                    }>
                                            {booking.bookingStatus}
                                        </span>
                                    </div>

                                    {/* Vehicle */}
                                    <div className="d-flex flex-wrap gap-3 mb-4">
                                        <span className="small">
                                            <span className="text-secondary">
                                                Registration:{" "}
                                            </span>
                                            <strong>
                                                {booking.vehicle ?.registrationNo || "-"}
                                            </strong>
                                        </span>

                                        <span className="small">
                                            <span className="text-secondary">
                                                Type:{" "}
                                            </span>

                                            <strong>
                                                {booking.bookingType || "-"}
                                            </strong>
                                        </span>
                                    </div>

                                    {/* Dates */}
                                    <div className="row g-3 mb-4">
                                        <div className="col-12 col-md-5">
                                            <div className="small text-secondary fw-medium mb-1">
                                                {isReturn ? "RETURN" : "PICKUP"}
                                            </div>

                                            <div className="fw-semibold">
                                                {formatDateTime(getDate(booking))}
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-2 d-none d-md-flex align-items-center justify-content-center">
                                            <IconArrowRight size={20} className="text-secondary"/>
                                        </div>

                                        <div className="col-12 col-md-5">
                                            <div className="small text-secondary fw-medium mb-1">
                                                {isReturn ? "PICKUP" : "RETURN"}
                                            </div>

                                            <div className="fw-semibold">
                                                {formatDateTime( isReturn ? booking.plannedPickup : booking.plannedReturn )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="d-flex align-items-center gap-2 text-secondary mb-4">
                                        <IconMapPin size={18} />

                                        <span>
                                            {getLocation(booking) || "Branch"}
                                        </span>
                                    </div>

                                    {/* Footer */}
                                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                        <div className="d-flex flex-wrap gap-3">
                                            <span className="small">
                                                <strong>
                                                    {booking.includedKm ?? 0}
                                                </strong>{" "}
                                                km included
                                            </span>

                                            <span className="small">
                                                <strong>
                                                    ₹{Number(booking.estimatedCost ?? 0)}
                                                </strong>{" "}
                                                estimated
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary rounded-3"
                                            onClick={() => handleViewBooking(booking.bookingId)}
                                        >
                                            View Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default EmployeeBookingList;