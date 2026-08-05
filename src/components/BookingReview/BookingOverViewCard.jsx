import {
    IconMapPin,
    IconClock,
    IconReceipt2,
    IconCar,
    IconRoute,
    IconPackage,
    IconArrowDown
} from "@tabler/icons-react";

import VehicleCard from "../Vehicle/VehicleCard";

function BookingOverviewCard({
    vehicle,
    booking,
    quote,
    addons = [],
    selectedAddons = {}
}) {

    const chosenAddons = addons.filter(
        addon => selectedAddons[addon.id] > 0
    );

    const formatDate = (date) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

    return (

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">

                {/* HEADER */}

                <div className="d-flex align-items-center gap-2 mb-4">

                    <IconReceipt2
                        className="text-primary"
                        size={26}
                    />

                    <div>

                        <h4 className="fw-bold mb-0">
                            Booking Overview
                        </h4>

                        <small className="text-muted">
                            Review your booking before continuing.
                        </small>

                    </div>

                </div>

                {/* VEHICLE */}

                <VehicleCard
                    vehicle={vehicle}
                    variant="review"
                    showWishlist={false}
                    showViewDetails={false}
                />

                {/* JOURNEY */}

                <div className="mt-5">

                    <div className="d-flex align-items-center gap-2 mb-3">

                        <IconMapPin
                            className="text-primary"
                            size={22}
                        />

                        <h5 className="fw-bold mb-0">
                            Journey
                        </h5>

                    </div>

                    <div className="border rounded-4 p-3">

                        <div className="d-flex justify-content-between">
                            <div>
                                <small className="text-muted">
                                    Pickup
                                </small>

                                <h6 className="fw-semibold mb-1">
                                    {booking.pickupBranch.name}, {booking.pickupBranch.city}
                                </h6>

                                <small className="text-muted">
                                    {booking.pickupBranch.address}
                                </small>
                            </div>
                            <div>
                                <small className="text-muted">
                                    Date - Time
                                </small>
                                <h6 className="fw-semibold mb-1">
                                    {formatDate(
                                        booking.plannedPickup
                                    )}
                                </h6>
                            </div>
                        </div>

                        <div className="text-center py-2">

                            <IconArrowDown
                                className="text-primary"
                            />

                        </div>

                        <div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <small className="text-muted">
                                        Pickup
                                    </small>

                                    <h6 className="fw-semibold mb-1">
                                        {booking.returnBranch.name}, {booking.returnBranch.city}
                                    </h6>

                                    <small className="text-muted">
                                        {booking.returnBranch.address}
                                    </small>
                                </div>
                                <div>
                                    <small className="text-muted">
                                        Date - Time
                                    </small>
                                    <h6 className="fw-semibold mb-1">
                                        {formatDate(
                                            booking.plannedReturn
                                        )}
                                    </h6>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* RENTAL */}

                <div className="mt-5">

                    <div className="d-flex align-items-center gap-2 mb-3">

                        <IconClock
                            className="text-primary"
                            size={22}
                        />

                        <h5 className="fw-bold mb-0">
                            Rental Details
                        </h5>

                    </div>

                    <div className="border rounded-4">

                        <div className="d-flex justify-content-between px-3 py-3 border-bottom">

                            <span className="text-muted">
                                Booking Type
                            </span>

                            <strong>

                                {booking.bookingType}

                            </strong>

                        </div>

                        <div className="d-flex justify-content-between px-3 py-3 border-bottom">

                            <span className="text-muted">
                                Duration
                            </span>

                            <strong>

                                {quote.duration}

                                {" "}

                                {booking.bookingType === "DAILY"
                                    ? "Days"
                                    : "Hours"}

                            </strong>

                        </div>

                        <div className="d-flex justify-content-between px-3 py-3 border-bottom">

                            <span className="text-muted">
                                Requested Distance
                            </span>

                            <strong>

                                {booking.requestedKm} km

                            </strong>

                        </div>

                        <div className="d-flex justify-content-between px-3 py-3">

                            <span className="text-muted">
                                Total Distance
                            </span>

                            <strong>

                                {quote.totalIncludedKm} km

                            </strong>

                        </div>

                    </div>

                </div>

                {/* ADDONS */}

                <div className="mt-5">

                    <div className="d-flex align-items-center gap-2 mb-3">

                        <IconPackage
                            className="text-primary"
                            size={22}
                        />

                        <h5 className="fw-bold mb-0">
                            Selected Add-ons
                        </h5>

                    </div>

                    <div className="border rounded-4 p-3">

                        {

                            chosenAddons.length === 0 ?

                                <div className="text-muted">

                                    No add-ons selected.

                                </div>

                                :

                                chosenAddons.map(addon => (

                                    <div
                                        key={addon.id}
                                        className="d-flex justify-content-between py-2 border-bottom"
                                    >

                                        <div>

                                            {addon.name}

                                            <small className="text-muted ms-2">

                                                ×

                                                {

                                                    selectedAddons[addon.id]

                                                }

                                            </small>

                                        </div>

                                        <strong>

                                            ₹

                                            {

                                                addon.pricePerDay *

                                                selectedAddons[addon.id]

                                            }

                                        </strong>

                                    </div>

                                ))

                        }

                    </div>

                </div>

                {/* PRICE */}

                <div className="mt-5">

                    <div className="d-flex align-items-center gap-2 mb-3">

                        <IconRoute
                            className="text-primary"
                            size={22}
                        />

                        <h5 className="fw-bold mb-0">

                            Price Breakdown

                        </h5>

                    </div>

                    <div className="border rounded-4">

                        <div className="d-flex justify-content-between px-3 py-3 border-bottom">

                            <span className="text-muted">

                                Vehicle Rental

                            </span>

                            <strong>

                                ₹{quote.baseCost}

                            </strong>

                        </div>

                        <div className="d-flex justify-content-between px-3 py-3 border-bottom">

                            <span className="text-muted">

                                Add-ons

                            </span>

                            <strong>

                                ₹{quote.addonCost}

                            </strong>

                        </div>

                        <div className="px-4 py-4">

                            <small className="text-muted">

                                Estimated Total

                            </small>

                            <h2 className="fw-bold text-primary mt-1 mb-0">

                                ₹{quote.totalEstimateCost}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default BookingOverviewCard;