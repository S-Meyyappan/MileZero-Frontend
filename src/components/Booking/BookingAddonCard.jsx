import * as Icons from "@tabler/icons-react";

export default function BookingAddonCard({
    addon,
    quantity,
    onIncrease,
    onDecrease,
}) {

    const Icon = Icons[addon.icon] || Icons.IconPackage;

    return (

        <div className="border rounded-4 p-4 h-100 booking-addon-card">

            <div className="d-flex text-primary align-items-center mb-2">
                <Icon size={34} stroke={1.8} />
                <h5 className="fw-semibold text-black mx-2">
                {addon.name}
            </h5>
            </div>

            <p className="text-muted small mb-4" style={{ minHeight: 42 }}>
                {addon.description}
            </p>

            <div className="fw-semibold text-primary mb-4">
                ₹{addon.pricePerDay}
                <span className="text-muted fw-normal">
                    {" "} / day
                </span>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-2">

                <button
                    className="btn btn-light border rounded-circle p-2"
                    onClick={onDecrease}
                    disabled={quantity === 0}
                >
                    <Icons.IconMinus size={16} />
                </button>

                <span
                    className="fw-bold fs-5"
                    style={{ minWidth: 24 }}
                >
                    {quantity}
                </span>

                <button
                    className="btn btn-primary rounded-circle p-2"
                    onClick={onIncrease}
                >
                    <Icons.IconPlus size={16} />
                </button>

            </div>

        </div>

    );
}