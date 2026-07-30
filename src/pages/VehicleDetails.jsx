import { useParams, Link } from "react-router"; // Fixed routing package
import vehicles from "../data/Vehicle"; // Fixed named import format

function VehicleDetails() {
    const { vehicleId } = useParams();

    // Find vehicle object inside local state array
    const vehicle = vehicles.find((v) => v.id === Number(vehicleId));

    // Defensive fallback error guard
    if (!vehicle) {
        return (
            <div className="container text-center my-5 py-5">
                <h2 className="text-danger fw-bold">Vehicle Not Found</h2>
                <p className="text-muted">The vehicle code you requested does not exist in our system inventory.</p>
                <Link to="/vehicles" className="btn btn-primary mt-3">Back to Vehicles</Link>
            </div>
        );
    }

    // Fallback defaults if specific fields are missing from your JSON object
    const specs = vehicle.specifications || {
        transmission: "Automatic",
        gearType: "6 Speed",
        seats: "5",
        luggage: "3 Bags",
        fuel: "Petrol",
        mileage: "18 km/l"
    };

    const pricing = vehicle.pricing || [
        { duration: "Per Hour", cost: "120" },
        { duration: "Per Day", cost: "1100" },
        { duration: "Per Km", cost: "32" },
        { duration: "Late fees", cost: "500" }
    ];

    return (
        <div className="container my-5">
            {/* Top Header Layer: Title and Rating Breadcrumb */}
            <div className="mb-4">
                <h1 className="fw-bold display-6 mb-1">{vehicle.name}</h1>
            </div>

            {/* Section 1: Carousel Showcase + Gallery Panel Grid */}
            <div className="row g-4">
                <div className="col-lg-9">
                    <div id="vehicleImagesCarousel" className="carousel slide shadow-sm rounded overflow-hidden" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#vehicleImagesCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#vehicleImagesCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#vehicleImagesCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner bg-light" style={{ height: "450px" }}>
                            <div className="carousel-item active h-100">
                                <img
                                    src="https://placehold.co/600x400"
                                    className="d-block w-100 h-100 img-fluid"
                                />
                            </div>
                            <div className="carousel-item h-100">
                                <img
                                    src="https://placehold.co/600x400"
                                    className="d-block w-100 h-100 img-fluid"
                                />
                            </div>
                            <div className="carousel-item h-100">
                                <img
                                    src="https://placehold.co/600x400"
                                    className="d-block w-100 h-100 img-fluid"
                                />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#vehicleImagesCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#vehicleImagesCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* Side Thumbnails Column */}
                <div className="col-lg-3">
                    <div className="row g-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((imgIndex) => (
                            <div className="col-6" key={imgIndex}>
                                <img
                                    src={"https://placehold.co/600x400"}
                                    className="img-fluid rounded border shadow-sm d-block w-100"
                                    alt="Gallery perspective slice"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 2: Technical Specifications Parameter Blocks */}
            <div className="card mt-4 shadow-sm border-0">
                <div className="card-header bg-white fw-bold fs-5 py-3 border-bottom">
                    Specifications
                </div>
                <div className="card-body py-4">
                    <div className="row g-3">
                        <div className="col-6 col-md-4 col-lg-2">
                            <span className="text-muted small text-uppercase d-block">Transmission</span>
                            <strong className="fs-5 text-dark">{specs.transmission}</strong>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <span className="text-muted small text-uppercase d-block">Gear Type</span>
                            <strong className="fs-5 text-dark">{specs.gearType}</strong>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <span className="text-muted small text-uppercase d-block">Seats</span>
                            <strong className="fs-5 text-dark">{specs.seats} Seater</strong>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <span className="text-muted small text-uppercase d-block">Luggage Limit</span>
                            <strong className="fs-5 text-dark">{specs.luggage}</strong>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <span className="text-muted small text-uppercase d-block">Fuel Base</span>
                            <strong className="fs-5 text-dark">{specs.fuel}</strong>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <span className="text-muted small text-uppercase d-block">Tested Mileage</span>
                            <strong className="fs-5 text-dark">{specs.mileage}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Feature Badges (Grouped Categories) */}
            <div className="card shadow-sm mt-4 border-0">
                <div className="card-header bg-white fw-bold fs-5 py-3 border-bottom">
                    Included Features
                </div>
                <div className="card-body py-4">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <h5 className="fw-bold text-secondary mb-3"> Safety Layout</h5>
                            <div className="d-flex flex-wrap gap-2">
                                <span className="badge bg-success-subtle text-success border border-success p-2 px-3 rounded-pill">Anti-lock Braking (ABS)</span>
                                <span className="badge bg-success-subtle text-success border border-success p-2 px-3 rounded-pill">Dual Front Airbags</span>
                                <span className="badge bg-success-subtle text-success border border-success p-2 px-3 rounded-pill">Reverse Parking Camera</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h5 className="fw-bold text-secondary mb-3"> Cabin Comfort</h5>
                            <div className="d-flex flex-wrap gap-2">
                                <span className="badge bg-primary-subtle text-primary border border-primary p-2 px-3 rounded-pill">Climate Control AC</span>
                                <span className="badge bg-primary-subtle text-primary border border-primary p-2 px-3 rounded-pill">Premium Leather Seats</span>
                                <span className="badge bg-primary-subtle text-primary border border-primary p-2 px-3 rounded-pill">Adaptive Cruise Control</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h5 className="fw-bold text-secondary mb-3"> Tech & Infotainment</h5>
                            <div className="d-flex flex-wrap gap-2">
                                <span className="badge bg-dark-subtle text-dark border border-dark p-2 px-3 rounded-pill">Wireless Bluetooth</span>
                                <span className="badge bg-dark-subtle text-dark border border-dark p-2 px-3 rounded-pill">Android Auto Link</span>
                                <span className="badge bg-dark-subtle text-dark border border-dark p-2 px-3 rounded-pill">Apple CarPlay Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Operational Pricing Matrix Table */}
            <div className="card shadow-sm mt-4 border-0">
                <div className="card-header bg-white fw-bold fs-5 py-3 border-bottom d-flex justify-content-between align-items-center">
                    <span>Rental Tariff Breakdown</span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle mb-0 text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col" className="py-3">Rental Schedule / Duration</th>
                                    <th scope="col" className="py-3">Tariff Cost (INR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pricing.map((tier, idx) => (
                                    <tr key={idx}>
                                        <td>{tier.duration}</td>
                                        <td>Base ₹{tier.cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleDetails