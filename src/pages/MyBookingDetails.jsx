import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

import axios from "axios";
import toast from "react-hot-toast";

import BookingHeader from "../components/BookingDetailPages/BookingHeader";
import BookingVehicleCard from "../components/BookingDetailPages/BookingVehicleCard";
import BookingDetailSummaryCard from "../components/BookingDetailPages/BookingDetailSummary";
import BookingTimeline from "../components/BookingDetailPages/BookingTImeline";
import BookingBranchCard from "../components/BookingDetailPages/BookingBranchCard";
import BookingCustomerCard from "../components/BookingDetailPages/BookingCustomerCard";
import BookingAddonsCard from "../components/BookingDetailPages/BookingAddonsCard";
import BookingCostBreakdownCard from "../components/BookingDetailPages/BookingCostBreakdown"
import BookingActionCard from "../components/BookingDetailPages/BookingActionCard"

import { IconChecklist } from "@tabler/icons-react";

export default function MyBookingDetails() {

    const { bookingId } = useParams();

    const navigate = useNavigate();

    const auth = useSelector(state => state.auth.form)

    const [booking, setBooking] = useState(null);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] = useState(false);

    const headerConfig = {
        headers: {
            Authorization:
                `Bearer ${auth.token}`
        }
    }

    const loadBooking = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/booking/get/${bookingId}`, headerConfig )
            setBooking(response.data);
        }
        catch (err) { toast.error(err.response?.data || "Unable to load booking.") }
        finally { setLoading(false) }
    }

    useEffect(() => {
        loadBooking();
    }, [bookingId]);

    const cancelBooking = async () => {
        const confirmCancel = window.confirm(`Cancel Booking #${booking.bookingId}?`)
        if (!confirmCancel) return;

        try {
            await axios.put(`http://localhost:8080/api/booking/cancel/${booking.bookingId}`,{},headerConfig)
            toast.success("Booking Cancelled");
            loadBooking()
        }
        catch (err) { toast.error( err?.response?.data?.message || "Unable to cancel booking." )}
    }

    const changeBookingStatus = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/booking/change-status/no-show/${booking.bookingId}`)
            toast.success("Marked no Show")
            loadBooking();

        } 
        catch (err) { toast.error( err?.response?.data?.message || "Unable to mark no show" )}
    }

    if (loading) {
        return (
            <>
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary"/>
                </div>
            </>
        )}


    if (!booking) {
        return (
            <>
                <div className="container py-5">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body text-center p-5">
                            <IconChecklist size={60} className="text-secondary mb-3"/>
                            <h3 className="fw-bold"> Booking Not Found</h3>
                            <p className="text-muted">
                                The requested booking
                                could not be found.
                            </p>
                            <button className="btn btn-primary"onClick={() =>navigate(-1)}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )}

    return (

        <>


            <div className="bg-light min-vh-100">

                <div className="container py-4">

                    <BookingHeader 
                        booking={booking}
                    />

                    <div className="row g-4 mb-4">

                        <div className="col-lg-7">

                            <BookingVehicleCard 
                                vehicle={booking.vehicle}
                            />

                        </div>

                        <div className="col-lg-5">

                            <BookingDetailSummaryCard 
                                booking={booking}
                            />

                        </div>

                    </div>

                    <BookingTimeline 
                        status={booking.bookingStatus}
                    />

                    <div className="row g-4 mb-4">

                        <div className="col-lg-6">

                            <BookingBranchCard
                                title="Pickup Details"
                                branch={booking.pickupBranch}
                                date={booking.plannedPickup}
                                color="success"
                            />

                        </div>

                        <div className="col-lg-6">

                            <BookingBranchCard
                                title="Return Details"
                                branch={booking.returnBranch}
                                date={booking.plannedReturn}
                                color="danger"
                            />

                        </div>

                    </div>

                    <BookingCustomerCard
                        customer={booking.customer}
                    />

                    <BookingAddonsCard
                        addons={booking.bookingAddons}
                    />

                    <div className="row g-4">

                        <div className="col-lg-8">

                            <BookingCostBreakdownCard
                                booking={booking}
                            />

                        </div>

                        <div className="col-lg-4">

                            <BookingActionCard
                                booking={booking}
                                role={auth.role}
                                loading={actionLoading}
                                onCancel={cancelBooking}
                                onEdit={changeBookingStatus}
                                onRecordPickup={() => {navigate("pickup")}}
                                onReturnVehicle={() => {navigate("return")}}
                                onCompleteBooking={() => { }}
                                onDownloadInvoice={() => { }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}