import { Link, useNavigate } from "react-router";
import VehicleCard from "../Vehicle/VehicleCard";

function FeaturedVehicles({ vehicles }) {

    const navigate = useNavigate()

    return (

        <section className="py-5">

            <div className="container">

                {/* Header */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <div className="section-title">

                            Featured Vehicles

                        </div>

                        <p className="text-secondary mb-0">

                            Popular choices from our fleet.

                        </p>

                    </div>

                    <Link
                        to="/vehicles"
                        className="btn btn-outline-primary"
                    >

                        View All

                    </Link>

                </div>

                {/* Cards */}

                <div className="row g-4">

                    {vehicles.map(vehicle => (

                        <div
                            key={vehicle.id}
                            className="col-md-6 col-lg-3"
                        >

                            <VehicleCard
                                vehicle={vehicle}
                                onClick={() => navigate(`/vehicle-details/${vehicle?.id}`)}
                            />

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default FeaturedVehicles;