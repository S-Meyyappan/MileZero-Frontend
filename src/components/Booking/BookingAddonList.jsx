import BookingAddonCard from "./BookingAddonCard";

export default function BookingAddonList({
    addons,
    selectedAddons,
    increaseAddon,
    decreaseAddon,
}) {
    return (
        <div className="bg-white rounded-4 shadow-sm border p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h4 className="fw-bold mb-1">
                        Optional Add-ons
                    </h4>

                    <p className="text-muted mb-0">
                        Customize your trip with additional services.
                    </p>

                </div>

            </div>

            <div className="row g-3">

                {addons.map((addon) => (

                    <div
                        key={addon.id}
                        className="col-md-6"
                    >
                        <BookingAddonCard
                            addon={addon}
                            quantity={selectedAddons!= null ? selectedAddons[addon.id] : 0}
                            onIncrease={() => increaseAddon(addon.id)}
                            onDecrease={() => decreaseAddon(addon.id)}
                        />
                    </div>

                ))}

            </div>

        </div>
    );
}