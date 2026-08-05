
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navigate/Navbar";
import TripSummary from "../components/Booking/TripSummary";
import BookingSummary from "../components/Booking/BookingSummary";
import Login from "../components/Authcomp/Login";
import Register from "../components/Authcomp/Register";
import BookingOverviewCard from "../components/BookingReview/BookingOverViewCard";
import toast from "react-hot-toast";
import {
    IconChecklist,
    IconShieldCheck,
    IconCircleCheck,
    IconUser
} from "@tabler/icons-react";
import CustomerSummaryCard from "../components/BookingReview/CustomerSummaryCard";
import { useNavigate } from "react-router";
import axios from "axios";

export default function BookingReview() {

    const [mode, setMode] = useState("login");

    const draft = useSelector(state => state.booking.draft);

    const auth = useSelector(state => state.auth.form);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleConfirmBooking = async () => {

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:8080/api/booking/add/me",
                draft.bookingBody,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            );

            toast.success("Booking Confirmed!");

            dispatch(clearBookingDraft());

            console.log("Booked successfully ", response.data)

        }
        catch (err) {

            toast.error(
                err.response?.data || "Unable to confirm booking."
            );

        }
        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

    },[auth, draft])

    if (!draft?.vehicle) {
        return (
            <>

                <div className="container py-5">

                    <div className="card shadow-sm border-0 rounded-4">

                        <div className="card-body text-center p-5">

                            <IconChecklist
                                size={60}
                                className="text-secondary mb-3"
                            />

                            <h3 className="fw-bold">
                                No Booking Found
                            </h3>

                            <p className="text-muted mb-4">
                                Your booking draft has expired or was never created.
                            </p>

                            <button
                                className="btn btn-primary"
                                onClick={() => window.history.back()}
                            >
                                Go Back
                            </button>

                        </div>

                    </div>

                </div>
            </>
        );
    }

    return (

        <>

            <div className="bg-light min-vh-100">

                <div className="container py-4">

                    {/* Header */}

                    <div className="mb-4">

                        <h2 className="fw-bold">
                            Review & Confirm Booking
                        </h2>

                        <p className="text-muted mb-0">
                            Please review your booking details before confirming your reservation.
                        </p>

                    </div>

                    <div className="row g-4">

                        {/* LEFT */}

                        <div className="col-lg-8">

                            <BookingOverviewCard
                                vehicle={draft.vehicle}
                                booking={{
                                    ...draft.bookingBody,
                                    pickupBranch: draft.form.pickupBranch,
                                    returnBranch: draft.form.dropBranch
                                }}
                                quote={draft.quote}
                                addons={draft.addons}
                                selectedAddons={draft.selectedAddons}
                            />

                            {/* Important Information */}

                            <div className="card border-0 shadow-sm rounded-4 mt-4">

                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center gap-2 mb-4">

                                        <IconShieldCheck
                                            className="text-primary"
                                        />

                                        <h5 className="fw-bold mb-0">
                                            Before You Confirm
                                        </h5>

                                    </div>

                                    <div className="d-flex mb-3">

                                        <IconCircleCheck
                                            size={20}
                                            className="text-success me-3 mt-1"
                                        />

                                        <div>

                                            <div className="fw-semibold">
                                                Carry your original driving licence
                                            </div>

                                            <small className="text-muted">
                                                It will be verified during pickup.
                                            </small>

                                        </div>

                                    </div>

                                    <div className="d-flex mb-3">

                                        <IconCircleCheck
                                            size={20}
                                            className="text-success me-3 mt-1"
                                        />

                                        <div>

                                            <div className="fw-semibold">
                                                Return fuel at the agreed level
                                            </div>

                                            <small className="text-muted">
                                                Fuel difference charges may apply.
                                            </small>

                                        </div>

                                    </div>

                                    <div className="d-flex mb-3">

                                        <IconCircleCheck
                                            size={20}
                                            className="text-success me-3 mt-1"
                                        />

                                        <div>

                                            <div className="fw-semibold">
                                                Cancellation available before pickup
                                            </div>

                                            <small className="text-muted">
                                                Subject to cancellation policy.
                                            </small>

                                        </div>

                                    </div>

                                    <div className="form-check mt-4">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="agreeTerms"
                                        />

                                        <label
                                            className="form-check-label"
                                            htmlFor="agreeTerms"
                                        >
                                            I agree to the Terms & Conditions.
                                        </label>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="col-lg-4">

                            <div
                                className="sticky-top"
                                style={{ top: "90px" }}
                            >

                                <div className="card border-0 shadow-sm rounded-4">

                                    <div className="card-body p-4">

                                        <div className="d-flex align-items-center gap-2 mb-4">

                                            <IconUser
                                                className="text-primary"
                                            />

                                            <h5 className="fw-bold mb-0">

                                                Customer

                                            </h5>

                                        </div>

                                        {
                                            !auth.token ? (

                                                <>

                                                    <p className="text-muted small mb-4">

                                                        Login or create an account to confirm your booking.

                                                    </p>

                                                    <div className="btn-group w-100 mb-4">

                                                        <button
                                                            className={`btn ${mode === "login"
                                                                ? "btn-primary"
                                                                : "btn-outline-primary"
                                                                }`}
                                                            onClick={() => setMode("login")}
                                                        >
                                                            Login
                                                        </button>

                                                        <button
                                                            className={`btn ${mode === "register"
                                                                ? "btn-primary"
                                                                : "btn-outline-primary"
                                                                }`}
                                                            onClick={() => setMode("register")}
                                                        >
                                                            Register
                                                        </button>

                                                    </div>

                                                    {
                                                        mode === "login"
                                                            ? <Login
                                                                onSuccess={() => {
                                                                    // Nothing to do.
                                                                    // CustomerSummaryCard will automatically render.
                                                                }}
                                                            />
                                                            : <Register />
                                                    }

                                                </>

                                            ) : (

                                                <>

                                                    <CustomerSummaryCard
                                                        token={auth.token}
                                                    />

                                                    <hr className="my-4" />

                                                    <div>

                                                        <h6 className="fw-bold mb-3">

                                                            Booking Actions

                                                        </h6>

                                                        <p className="text-muted small mb-4">

                                                            Your booking details have been reviewed.
                                                            Once confirmed, your reservation will be
                                                            created. Payment can be completed at the
                                                            pickup branch.

                                                        </p>

                                                        <button
                                                            className="btn btn-outline-secondary w-100 mb-3 py-2"
                                                            onClick={() => navigate(-1)}
                                                        >
                                                            ← Edit Booking
                                                        </button>

                                                        <button
                                                            className="btn btn-success w-100 py-3 fw-semibold"
                                                            disabled={loading}
                                                            onClick={handleConfirmBooking}
                                                        >
                                                            {
                                                                loading ? (
                                                                    <>
                                                                        <span
                                                                            className="spinner-border spinner-border-sm me-2"
                                                                            role="status"
                                                                        />
                                                                        Confirming Booking...
                                                                    </>
                                                                ) : (
                                                                    "Confirm Booking"
                                                                )
                                                            }
                                                        </button>

                                                        <small className="text-muted d-block text-center mt-3">

                                                            By confirming, you agree to the booking
                                                            terms and conditions.

                                                        </small>

                                                    </div>

                                                </>

                                            )
                                        }

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}