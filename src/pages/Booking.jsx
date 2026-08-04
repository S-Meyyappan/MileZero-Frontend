import BookingAddonList from "../components/Booking/BookingAddonList";
import TripSummary from "../components/Booking/TripSummary";
import BookingSummary from "../components/Booking/BookingSummary";
import ExtraKmSelector from "../components/Booking/ExtraKmSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAddons } from "../store/actions/AddonActions";
import axios from "axios";
import { useParams } from "react-router";

export default function Booking() {

    const dispatch = useDispatch()

    const [requestedKm, setRequestedKm] = useState(0);

    const [selectedAddons, setSelectedAddons] = useState({});

    const increaseAddon = (id) => {
        setSelectedAddons(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const decreaseAddon = (id) => {
        setSelectedAddons(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0)
        }));
    };

    
    const [quote, setQuote] = useState(null)

    const { vehicleId } = useParams()

    const [vehicle, setVehicle] = useState(null)

    const addons = useSelector((state) => state.addon.list)

    const form = useSelector((state) => state.search.form)

    const getBookingBody = () => {
            
            const selectedAddonList = Object.entries(selectedAddons).map(([id, quantity]) => ({
                addonId: Number(id),
                quantity,
            }));

            const bookingBody = {
                "plannedPickup": new Date(form.pickupDate).toISOString(),
                "plannedReturn": new Date(form.returnDate).toISOString(),
                "requestedKm": requestedKm,
                "customerId": 2,
                "categoryId": vehicle?.category.id,
                "pickupBranchId": form?.pickupBranch.id,
                "returnBranchId": form?.pickupBranch.id,
                "bookingType": "DAILY",
                "bookingAddons": selectedAddonList,
                "vehicleId": vehicle.id
            }

            return bookingBody
        }

        const handleContinue = async () => {
            const body = getBookingBody()

            const response = await axios.post("http://localhost:8080/api/booking/add", body)

            console.log(response.data)
        console.log("Continue Booking");
    };

    useEffect(() => {
        dispatch(getAllAddons())

        const getVehicle = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/vehicle/get/${vehicleId}`)
                setVehicle(response.data)
                console.log("useEffecct", response?.data)
            } catch (error) {
                console.log(error)
            }
        }

        getVehicle()

    }, [dispatch])

    useEffect(() => {
        
        const calculateQuote = async () => {

            if (!vehicle || !form?.pickupDate || !form?.returnDate) return;

            const quoteBody = getBookingBody()

            console.log("quoteBody",quoteBody)

            const response = await axios.post("http://localhost:8080/api/booking/calculate-quote", quoteBody)
            setQuote(response.data)

        }

        calculateQuote()
    }, [requestedKm, form, selectedAddons])


    return (
        <div className="bg-light min-vh-100">
            <div className="container-fluid py-4">

                <div className="row g-4">

                    {/* Left Sidebar */}
                    <div className="col-lg-4 col-xl-3">

                        <TripSummary
                            vehicle={vehicle}
                            booking={form}
                        />

                    </div>

                    {/* Main Content */}
                    <div className="col-lg-8 col-xl-9">

                        <div className="row g-4">

                            {/* Configuration */}
                            <div className="col-xl-8">

                                <BookingAddonList
                                    addons={addons}
                                    selectedAddons={selectedAddons}
                                    increaseAddon={increaseAddon}
                                    decreaseAddon={decreaseAddon}
                                />

                                <ExtraKmSelector
                                    includedKm={vehicle?.category.includedKmPerDay}
                                    requestedKm={requestedKm}
                                    setRequestedKm={setRequestedKm}
                                />

                            </div>

                            {/* Sticky Summary */}
                            <div className="col-xl-4">

                                <div
                                    className="sticky-top"
                                    style={{ top: "90px" }}
                                >
                                    <BookingSummary
                                        addons={addons}
                                        quote={quote}
                                        requestedKm={requestedKm}
                                        selectedAddons={selectedAddons}
                                        onContinue={handleContinue}
                                    />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}