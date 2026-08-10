import { useNavigate } from "react-router";

import {
    IconArrowLeft,
    IconCar,
    IconCalendarEvent
} from "@tabler/icons-react";

export default function BookingHeader({ booking }) {

    const navigate = useNavigate();

    const formatDate = (date) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

    const getStatusBadge = (status) => {

        switch (status) {

            case "BOOKED":
                return "bg-primary";

            case "ACTIVE":
                return "bg-warning text-dark";

            case "RETURNED":
                return "bg-info text-dark";

            case "COMPLETED":
                return "bg-success";

            case "CANCELLED":
                return "bg-danger";

            case "NO_SHOW":
                return "bg-secondary";

            default:
                return "bg-dark";
        }

    };

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4">

                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => navigate(`/dashboard/my-bookings`)}
                >
                    <IconArrowLeft
                        size={18}
                        className="me-2"
                    />
                    Back to Bookings
                </button>

                <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                    <div className="d-flex align-items-center">

                        <div
                            className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-4"
                            style={{
                                width: 75,
                                height: 75
                            }}
                        >
                            <IconCar
                                size={38}
                                className="text-primary"
                            />
                        </div>

                        <div>

                            <h2 className="fw-bold mb-1">

                                Booking #{booking.bookingId}

                            </h2>

                            <h5 className="text-primary mb-2">

                                {booking.vehicle.manufacturer}
                                {" "}
                                {booking.vehicle.model}

                            </h5>

                            <div className="text-muted">

                                {booking.vehicle.manufacturingYear}

                                {" • "}

                                {booking.vehicle.category.name}

                                {" • "}

                                {booking.vehicle.fuelType}

                                {" • "}

                                {booking.vehicle.transmission}

                                {" • "}

                                {booking.vehicle.driveType}

                            </div>

                            <small className="text-muted d-flex align-items-center mt-2">

                                <IconCalendarEvent
                                    size={16}
                                    className="me-2"
                                />

                                Pickup

                                {" • "}

                                {formatDate(
                                    booking.plannedPickup
                                )}

                            </small>

                        </div>

                    </div>

                    <div className="text-lg-end">

                        <span
                            className={`badge ${getStatusBadge(
                                booking.bookingStatus
                            )} px-4 py-3 fs-6`}
                        >

                            {booking.bookingStatus}

                        </span>

                        <div className="mt-3">

                            <small className="text-muted d-block">

                                Booking Type

                            </small>

                            <div className="fw-semibold">

                                {booking.bookingType}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}