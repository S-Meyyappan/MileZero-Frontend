import {
    IconCheck,
    IconClock,
    IconGasStation,
    IconGauge,
    IconMapPin,
    IconReceipt,
    IconRoute,
    IconUser,
    IconCar,
    IconArrowLeft
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function CompleteBookingSummary() {

    const navigate = useNavigate()

    const { bookingId } = useParams()

    const [summary, setSummary] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSummary = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/booking/get-summary/${bookingId}`)
                setSummary(response.data)
            } catch (err) {
                toast.error(err.response?.data?.message || "Unable to load booking summary.")
            } finally {
                setLoading(false)
            }
        }
        getSummary()
    }, [])

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" />
            </div>
        )
    }

    const { booking, pickuplog, returnlog } = summary;

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("en-AU", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    const formatMoney = (value) => {
        if (value == null) return "$0.00";
        return `$${Number(value).toFixed(2)}`;
    };

    const kmTravelled =
        pickuplog && returnlog
            ? returnlog.odometer - pickuplog.odometer
            : null;

    const includedKm = Number(booking.includedKm ?? 0);

    const extraKm =
        kmTravelled != null
            ? Math.max(kmTravelled - includedKm, 0)
            : null;

    return (
        <div className="container card border-0 shadow-sm">

            {/* Header */}

            <div className="card-body p-4">

                <div className="mb-4">
                    <button
                        className="btn btn-outline-secondary d-inline-flex align-items-center"
                        onClick={() => navigate(`/dashboard/my-bookings`)}
                    >
                        <IconArrowLeft size={18} className="me-2" />
                        Back
                    </button>
                </div>

                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-1">

                            <IconCheck
                                size={22}
                                className="text-success"
                            />

                            <h4 className="fw-bold mb-0">
                                Booking Completed
                            </h4>
                        </div>

                        <p className="text-muted mb-0">
                            Booking #{booking.bookingId}
                        </p>
                    </div>

                    <span className="badge bg-success-subtle text-success px-3 py-2">
                        {booking.bookingStatus}
                    </span>

                </div>


                {/* Vehicle */}

                <div className="bg-light rounded p-3 mb-4">

                    <div className="d-flex align-items-center gap-3">

                        <div className="bg-white rounded p-2">
                            <IconCar size={28} />
                        </div>

                        <div className="flex-grow-1">

                            <h5 className="fw-bold mb-1">
                                {booking.vehicle.manufacturer}{" "}
                                {booking.vehicle.model}
                            </h5>

                            <div className="text-muted small">
                                {booking.vehicle.registrationNo}
                                {" • "}
                                {booking.vehicle.manufacturingYear}
                            </div>

                        </div>

                        <div className="text-end">

                            <div className="small text-muted">
                                {booking.bookingType} rental
                            </div>

                            <div className="fw-semibold">
                                {formatMoney(booking.bookedRate)}
                            </div>

                        </div>

                    </div>

                </div>


                {/* Customer + Branch */}

                <div className="row g-3 mb-4">

                    <div className="col-md-4">

                        <div className="border rounded p-3 h-100">

                            <div className="d-flex align-items-center gap-2 mb-2">
                                <IconUser size={18} />
                                <span className="fw-semibold">
                                    Customer
                                </span>
                            </div>

                            <div className="fw-semibold">
                                {booking.customer.name}
                            </div>

                            <div className="small text-muted">
                                {booking.customer.phone}
                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="border rounded p-3 h-100">

                            <div className="d-flex align-items-center gap-2 mb-2">
                                <IconMapPin size={18} />
                                <span className="fw-semibold">
                                    Branch
                                </span>
                            </div>

                            <div className="fw-semibold">
                                {booking.pickupBranch.name}
                            </div>

                            <div className="small text-muted">
                                {booking.pickupBranch.city}
                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="border rounded p-3 h-100">

                            <div className="d-flex align-items-center gap-2 mb-2">
                                <IconReceipt size={18} />
                                <span className="fw-semibold">
                                    Inspection Employee
                                </span>
                            </div>

                            <div className="fw-lighter">
                                Pickup : {pickuplog.employeeName}
                            </div>

                            <div className="fw-lighter">
                                Return : {returnlog.employeeName}
                            </div>

                        </div>

                    </div>

                </div>


                {/* Rental timeline */}

                <div className="border rounded p-3 mb-4">

                    <div className="fw-semibold mb-3">
                        Rental Timeline
                    </div>

                    <div className="row g-3">

                        <div className="col-md-6">

                            <div className="small text-muted">
                                Planned Pickup
                            </div>

                            <div className="fw-semibold">
                                {formatDate(booking.plannedPickup)}
                            </div>

                            {pickuplog && (
                                <div className="small text-success mt-1">
                                    Actual: {formatDate(pickuplog.actualPickup)}
                                </div>
                            )}

                        </div>

                        <div className="col-md-6">

                            <div className="small text-muted">
                                Planned Return
                            </div>

                            <div className="fw-semibold">
                                {formatDate(booking.plannedReturn)}
                            </div>

                            {returnlog && (
                                <div className="small text-success mt-1">
                                    Actual: {formatDate(returnlog.actualReturn)}
                                </div>
                            )}

                        </div>

                    </div>

                </div>


                {/* Vehicle usage */}

                {pickuplog && returnlog && (
                    <div className="border rounded p-3 mb-4">

                        <div className="fw-semibold mb-3">
                            Vehicle Usage
                        </div>

                        <div className="row g-3">

                            <div className="col-6 col-md-3">

                                <div className="small text-muted">
                                    Pickup Odometer
                                </div>

                                <div className="fw-semibold">
                                    {pickuplog.odometer.toLocaleString()} km
                                </div>

                            </div>

                            <div className="col-6 col-md-3">

                                <div className="small text-muted">
                                    Return Odometer
                                </div>

                                <div className="fw-semibold">
                                    {returnlog.odometer.toLocaleString()} km
                                </div>

                            </div>

                            <div className="col-6 col-md-3">

                                <div className="small text-muted">
                                    Distance
                                </div>

                                <div className="fw-semibold">
                                    {kmTravelled.toLocaleString()} km
                                </div>

                            </div>

                            <div className="col-6 col-md-3">

                                <div className="small text-muted">
                                    Included
                                </div>

                                <div className="fw-semibold">
                                    {includedKm.toLocaleString()} km
                                </div>

                            </div>

                        </div>

                        {extraKm > 0 && (
                            <div className="alert alert-warning mt-3 mb-0 py-2">
                                <IconRoute size={17} className="me-2" />
                                {extraKm.toLocaleString()} km over the
                                included distance.
                            </div>
                        )}

                    </div>
                )}


                {/* Fuel */}

                {pickuplog && returnlog && (
                    <div className="border rounded p-3 mb-4">

                        <div className="d-flex align-items-center gap-2 mb-3">
                            <IconGasStation size={18} />
                            <span className="fw-semibold">
                                Fuel
                            </span>
                        </div>

                        <div className="row">

                            <div className="col-6">

                                <div className="small text-muted">
                                    Pickup
                                </div>

                                <div className="fw-semibold">
                                    {pickuplog.fuelLevel}
                                </div>

                            </div>

                            <div className="col-6">

                                <div className="small text-muted">
                                    Return
                                </div>

                                <div className="fw-semibold">
                                    {returnlog.fuelLevel}
                                </div>

                            </div>

                        </div>

                    </div>
                )}


                {/* Addons */}

                {booking.bookingAddons?.length > 0 && (
                    <div className="border rounded p-3 mb-4">

                        <div className="fw-semibold mb-3">
                            Add-ons
                        </div>

                        {booking.bookingAddons.map((addon, index) => (
                            <div
                                key={index}
                                className="d-flex justify-content-between small mb-2"
                            >
                                <span>
                                    {addon.name} × {addon.quantity}
                                </span>

                                <span className="fw-semibold">
                                    {formatMoney(
                                        addon.pricePerDay * addon.quantity
                                    )}
                                    / day
                                </span>
                            </div>
                        ))}

                    </div>
                )}


                {/* Price */}

                <div className="bg-light rounded p-3">

                    <div className="d-flex align-items-center gap-2 mb-3">
                        <IconReceipt size={19} />
                        <span className="fw-semibold">
                            Final Booking Cost
                        </span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">
                            Estimated cost
                        </span>

                        <span>
                            {formatMoney(booking.estimatedCost)}
                        </span>
                    </div>

                    {returnlog?.extraCharges > 0 && (
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">
                                Extra charges
                            </span>

                            <span>
                                {formatMoney(returnlog.extraCharges)}
                            </span>
                        </div>
                    )}

                    <hr />

                    <div className="d-flex justify-content-between align-items-center">

                        <span className="fw-bold">
                            Final Cost
                        </span>

                        <span className="fs-4 fw-bold text-success">
                            {formatMoney(booking.finalCost)}
                        </span>

                    </div>

                </div>


                {/* Remarks */}

                {(pickuplog?.remarks || returnlog?.remarks) && (
                    <div className="mt-4">

                        <div className="fw-semibold mb-2">
                            Remarks
                        </div>

                        {pickuplog?.remarks && (
                            <div className="small text-muted mb-1">
                                <strong>Pickup:</strong>{" "}
                                {pickuplog.remarks}
                            </div>
                        )}

                        {returnlog?.remarks && (
                            <div className="small text-muted">
                                <strong>Return:</strong>{" "}
                                {returnlog.remarks}
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
}