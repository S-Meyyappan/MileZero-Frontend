import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

import axios from "axios";
import toast from "react-hot-toast";

import {
    IconArrowLeft,
    IconCarGarage
} from "@tabler/icons-react";

import VehicleCard from "../../components/Vehicle/VehicleCard";
import BookingCustomerCard from "../../components/BookingDetailPages/BookingCustomerCard";
import PickupFormCard from "../../components/Pickup/PickupFormCard";
import ImageUploadCard from "../../components/Pickup/ImageUploadCard";

export default function RecordPickup() {

    const { bookingId } = useParams();

    const navigate = useNavigate();

    const auth = useSelector(state => state.auth.form);

    const [booking, setBooking] = useState(null);

    const [loading, setLoading] = useState(true);

    const [pageError, setPageError] = useState(null);

    const [saving, setSaving] = useState(false);

    const [images, setImages] = useState([]);

    const [form, setForm] = useState({
        odometer: "",
        fuelLevel: "FULL",
        remarks: "",
        bookingId: bookingId,
        vehicleId: ""
    })

    const headerConfig = {
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    };

    const loadBooking = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8080/api/booking/get/check-pickuplog/${bookingId}`, headerConfig)

            setBooking(response.data)

            setForm(prevForm => ({
                ...prevForm,
                odometer: response.data.vehicle.odometer,
                vehicleId: response.data.vehicle.id
            }))
        }

        catch (err) {
            const message = err.response?.data?.message;

            if (message === "Pickuplog already exists for this booking") {
                setPageError("pickup-exists");
                return;
            }

            toast.error(message || "Unable to load booking.");
        }
        finally { setLoading(false) }
    }

    useEffect(() => {
        loadBooking()
    }, [bookingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async () => {

        setLoading(true)

        const fd = new FormData()

        fd.append("odometer", form.odometer)
        fd.append("fuelLevel", form.fuelLevel)
        fd.append("remarks", form.remarks ?? "")
        fd.append("vehicleId", form.vehicleId)
        fd.append("bookingId", form.bookingId)
        images.forEach(file => {
            fd.append("files", file)
        })

        console.log(images);
        for (const [key, value] of fd.entries()) {
            console.log(key, value);
        }

        try {
            await axios.post("http://localhost:8080/api/pickuplog/add", fd, headerConfig)
            toast.success("Pickup recorded successfully")
            loadBooking()
        }

        catch (err) { toast.error(err?.response?.data.message || "Unable to schedule pickup") }
        finally { setLoading(false) }

    }

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" />
            </div>
        )
    }

    if (pageError) {
        return pageError === "pickup-exists" ? (
            <div className="container py-5 text-center">
                <h1 className="fw-bold text-success">
                    Pickup Recorded
                </h1>

                <p className="text-muted mt-3">
                    A pickup has been recorded for this booking.
                    You cannot create another pickup log.
                </p>

                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate(-1)}
                >
                    Back to Booking
                </button>
            </div>
        ) : (
            <div className="container py-5 text-center">
                <h1 className="fw-bold">Booking Not Found</h1>

                <p className="text-muted mt-3">
                    The booking you're looking for doesn't exist or has been removed.
                </p>

                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/dashboard/my-bookings")}
                >
                    View My Bookings
                </button>
            </div>
        );
    }


    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4">

                {/* Header */}

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(`/dashboard/my-bookings/${booking.bookingId}`)}>
                            <IconArrowLeft size={18} className="me-2" />
                            Back
                        </button>
                        <h2 className="fw-bold mb-1">Record Vehicle Pickup</h2>
                        <p className="text-muted mb-0">Booking #{booking?.bookingId}</p>
                    </div>

                    <IconCarGarage size={60} className="text-success" />
                </div>

                {/* Vehicle + Customer */}

                <div className="row g-4 mb-4">

                    <div className="col-lg-5">

                        <VehicleCard
                            vehicle={booking?.vehicle}
                            showWishlist={false}
                            showViewDetails={false}
                            showRegistrationNo={true}
                        />

                    </div>

                    <div className="col-lg-7">

                        <BookingCustomerCard
                            customer={booking?.customer}
                        />

                    </div>

                </div>

                {/* Form */}

                <PickupFormCard
                    form={form}
                    onChange={handleChange}
                    loading={saving}
                />

                {/* Images */}

                <ImageUploadCard
                    images={images}
                    onImagesChange={setImages}
                    loading={saving}
                />

                {/* Buttons */}

                <div className="d-flex justify-content-end gap-2 mt-4">

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}
                        disabled={saving}
                    >

                        Cancel

                    </button>

                    <button
                        className="btn btn-success"
                        onClick={handleSubmit}
                        disabled={saving}
                    >

                        Record Pickup

                    </button>

                </div>

            </div>

        </div>

    )

}