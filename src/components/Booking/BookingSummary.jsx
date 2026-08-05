import { IconReceipt2 } from "@tabler/icons-react";

export default function BookingSummary({
    quote,
    requestedKm,
    selectedAddons,
    addons,
    onContinue,
}) {

    const chosenAddons = addons.filter(
        (addon) => selectedAddons[addon.id] > 0)


    return (
        <div className="bg-white rounded-4 shadow-sm border p-4 mt-4">

            <div className="d-flex align-items-center gap-2 mb-4">

                <IconReceipt2
                    size={24}
                    stroke={1.8}
                    className="text-primary"
                />

                <div>

                    <h4 className="fw-bold mb-0">
                        Booking Summary
                    </h4>

                    <small className="text-muted">
                        Review your booking before checkout.
                    </small>

                </div>

            </div>

            <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">
                    Vehicle Rental
                </span>

                <strong>
                    ₹{quote?.baseCost}
                </strong>

            </div>

            <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">
                    Total Distance
                </span>

                <strong>
                    {quote?.totalIncludedKm} km
                </strong>

            </div>

            <div className="d-flex justify-content-between mb-4">

                <span className="text-muted">
                    Requested Distance
                </span>

                <strong>
                    {requestedKm} km
                </strong>

            </div>

            {chosenAddons.length > 0 && (
                <>
                    <hr />

                    <h6 className="fw-bold mb-3">
                        Selected Add-ons
                    </h6>

                    {chosenAddons.map((addon) => (

                        <div
                            key={addon.id}
                            className="d-flex justify-content-between mb-2"
                        >

                            <span>

                                {addon.name}

                                <small className="text-muted">
                                    {" "}
                                    ×
                                    {
                                        selectedAddons[
                                        addon.id
                                        ]
                                    }
                                </small>

                            </span>

                            <span>
                                ₹
                                {(
                                    addon.pricePerDay *
                                    selectedAddons[
                                    addon.id
                                    ]
                                ).toFixed(2)}
                            </span>

                        </div>

                    ))}

                    <div className="d-flex justify-content-between mt-3">

                        <span className="text-muted">
                            Add-on Total
                        </span>

                        <strong>
                            ₹{quote?.addonCost}
                        </strong>

                    </div>
                </>
            )}

            <hr />

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <small className="text-muted">
                        Estimated Total
                    </small>

                    <h2 className="fw-bold text-primary mb-0">
                        ₹{quote?.totalEstimateCost}
                    </h2>

                </div>

            </div>

                <button
                    className="btn btn-primary w-100 rounded-3 py-3 fw-semibold"
                    onClick={onContinue}
                >
                    Continue to Checkout
                </button>

        </div>
    );
}