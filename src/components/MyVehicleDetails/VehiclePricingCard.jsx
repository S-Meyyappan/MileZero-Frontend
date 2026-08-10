export default function VehiclePricingCard({
    category
}) {

    if (!category) {
        return null;
    }

    return (

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">Category & Pricing</h5>
                    <span className="badge bg-primary-subtle text-primary px-3 py-2"> {category.name}</span>
                </div>

                <div className="row g-3">
                    <div className="col-md-3">
                        <div className="text-muted small">Per Day </div>
                        <div className="fw-bold fs-5"> ₹{category.basePricePerDay} </div>
                    </div>

                    <div className="col-md-3">
                        <div className="text-muted small">Per Hour</div>
                        <div className="fw-bold fs-5">₹{category.basePricePerHour}</div>
                    </div>

                    <div className="col-md-3">
                        <div className="text-muted small">Per KM </div>
                        <div className="fw-bold fs-5">₹{category.basePricePerKm}</div>
                    </div>

                    <div className="col-md-3">
                        <div className="text-muted small">Included KM / Day</div>
                        <div className="fw-bold fs-5">{category.includedKmPerDay} km</div>
                    </div>
                </div>

            </div>

        </div>

    )
}