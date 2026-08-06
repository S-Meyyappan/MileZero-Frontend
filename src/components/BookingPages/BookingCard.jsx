import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import {
    IconCar,
    IconMapPin,
    IconCalendarEvent,
    IconCash,
    IconRoute,
    IconClock,
    IconEye,
    IconX,
    IconPencil,
    IconTruckDelivery,
    IconCircleCheck
} from "@tabler/icons-react";

export default function BookingCard({
    booking,
    refreshBookings
}) {

    const navigate = useNavigate();

    const auth = useSelector(state => state.auth.form);

    const role = auth.role;

    const isCustomer = role === "CUSTOMER"
    const isEmployee = role === "EMPLOYEE"
    const isManager = role === "MANAGER"
    const isAdmin = role === "ADMIN"

    const formatDate = (date) => {

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })

    }

    const viewPage = () => navigate(`${booking.bookingId}`)

    const getStatusBadge = (status) => {
        switch (status) {
            case "BOOKED": return "bg-primary";
            case "ACTIVE": return "bg-warning text-dark";
            case "RETURNED": return "bg-info text-dark";
            case "COMPLETED": return "bg-success";
            case "CANCELLED": return "bg-danger";
            case "NO_SHOW": return "bg-secondary";
            default: return "bg-dark";
        }
    }

    const headerBody = {
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    }

    const cancelBooking = async () => {

        const confirmCancel = window.confirm( `Cancel Booking #${booking.bookingId}?`);

        if (!confirmCancel) return;

        try {
            await axios.put( `http://localhost:8080/api/booking/cancel/${booking.bookingId}`, {}, headerBody );
            toast.success("Booking Cancelled");
            if (refreshBookings) {
                refreshBookings();
            }
        }
        catch (err) { toast.error( err?.response?.data?.message || "Unable to cancel booking.");
        }
    }


    const changeBookingStatus = async () => {

        try {
            const response = await axios.put(`http://localhost:8080/api/booking/change-status/no-show/${booking.bookingId}`)
            toast.success("Marked no Show")
            if (refreshBookings) {
                refreshBookings();
            }
        } 
        catch (err) { toast.error( err?.response?.data?.message || "Unable to mark no show" )}
    }

    const renderButtons = () => {

        if ( isCustomer && booking.bookingStatus === "BOOKED") {
            return (
                <>
                    <button className="btn btn-outline-primary" onClick={viewPage}>
                        <IconEye size={18} className="me-1" />
                        View
                    </button>
                    <button className="btn btn-outline-danger" onClick={cancelBooking}>
                        <IconX size={18} className="me-1" />
                        Cancel
                    </button>
                </>
            )}

        if ( isEmployee && booking.bookingStatus === "BOOKED") {
            return (
                <>
                    <button className="btn btn-outline-primary" onClick={viewPage}>
                        <IconEye size={18} className="me-1" />
                        View
                    </button>
                    <button className="btn btn-warning" onClick={changeBookingStatus}>
                        <IconPencil size={18} className="me-1" />
                        Mark No Show
                    </button>
                </>
            )}

        if ( isEmployee && booking.bookingStatus === "ACTIVE") {
            return (

                <button className="btn btn-success">
                    <IconTruckDelivery size={18} className="me-1"/>
                    Return Vehicle
                 </button>
            )}

        if ((isManager || isAdmin) && booking.bookingStatus === "RETURNED") {
            return (
                <>
                    <button className="btn btn-success">
                        <IconCircleCheck size={18} className="me-1"/>
                        Booking Completed
                    </button>

                    <button className="btn btn-outline-primary" onClick={viewPage}>
                        <IconEye size={18} className="me-1" />
                        View
                    </button>
                </>
            )}

        return (
            <button className="btn btn-outline-primary" onClick={viewPage}>
                <IconEye size={18}className="me-1"/>
                View
            </button>

        )}



    return (

        <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <h5 className="fw-bold mb-1">Booking #{booking.bookingId}</h5>
                        <small className="text-muted">{booking.bookingType} Booking</small>
                    </div>
                    <span className={`badge ${getStatusBadge(booking.bookingStatus)} px-3 py-2`}>
                        {booking.bookingStatus}
                    </span>
                </div>


                {/* Vehicle */}
                <div className="border rounded-4 p-3 mb-4">
                    <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"style={{width: 55,height: 55}}>
                            <IconCar className="text-primary"size={28}/>
                        </div>

                        <div className="flex-grow-1">
                            <div className="fw-bold">{booking.vehicle.model}</div>
                            <small className="text-muted">
                                Rate : {" "} ₹{booking.bookedRate} {" / "} {booking.bookingType === "DAILY" ? "Day": "Hour"}
                            </small>
                        </div>

                        <div className="text-end">
                            <small className="text-muted d-block">Estimate</small>
                            <h5 className="fw-bold text-primary mb-0">₹{booking.estimatedCost}</h5>
                        </div>
                    </div>
                </div>

                {/* Pickup */}
                <div className="d-flex mb-4">
                    <IconMapPin className="text-success me-3 mt-1" size={20}/>
                    <div>
                        <div className="fw-semibold">Pickup</div>
                        <div>{booking.pickupBranch.name}</div>
                        <small className="text-muted">{booking.pickupBranch.city}</small>
                        <br />
                        <small className="text-muted">
                            <IconCalendarEvent size={14} className="me-1"/>
                            {formatDate(booking.plannedPickup)}
                        </small>
                    </div>
                </div>

                {/* Return */}
                <div className="d-flex mb-4">
                    <IconMapPin className="text-danger me-3 mt-1" size={20}/>
                    <div>
                        <div className="fw-semibold">Return </div>
                        <div>{booking.returnBranch.name}</div>
                        <small className="text-muted">{booking.returnBranch.city}</small>
                        <br />
                        <small className="text-muted">
                            <IconCalendarEvent size={14} className="me-1" />
                            {formatDate(booking.plannedReturn)}
                        </small>
                    </div>
                </div>

                <hr />

                {/* Summary */}
                <div className="row text-center">

                    <div className="col-4">
                        <IconClock className="text-primary mb-2"/>
                        <div className="fw-bold">{booking.duration}</div>
                        <small className="text-muted">{booking.bookingType === "DAILY"? "Days": "Hours"}</small>
                    </div>

                    <div className="col-4">
                        <IconRoute className="text-primary mb-2"/>
                        <div className="fw-bold">{booking.includedKm}</div>
                        <small className="text-muted">Included KM</small>
                    </div>

                    <div className="col-4">
                        <IconCash className="text-primary mb-2"/>
                        <div className="fw-bold">₹{booking.estimatedCost}</div>
                        <small className="text-muted">Estimate</small>
                    </div>

                </div>

                {/* Add-ons */}

                { booking.bookingAddons.length > 0 && (

                        <>
                            <hr />
                            <h6 className="fw-bold mb-3">Selected Add-ons</h6>

                            { booking.bookingAddons.map((addon, index) => (

                                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                                        <div>
                                            <span className="fw-semibold">{addon.name}</span>
                                            <small className="text-muted ms-2"> x {addon.quantity}</small>
                                        </div>
                                        <div className="fw-semibold">
                                            ₹{ (addon.pricePerDay *addon.quantity).toFixed(2) }
                                        </div>
                                    </div>
                                ))
                            }
                        </>

                    )

                }

                <hr />

                {/* Cost Summary */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Estimated Cost </span>
                    <span className="fw-bold">₹{booking.estimatedCost}</span>
                </div>

                { booking.finalCost && (
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted">Final Cost</span>
                            <span className="fw-bold text-success"> ₹{booking.finalCost}</span>
                        </div>
                    )
                }

                <hr />

                {/* Footer */}

                <div className="d-flex justify-content-end gap-2 flex-wrap">
                    {renderButtons()}
                </div>

            </div>

        </div>

    );

}