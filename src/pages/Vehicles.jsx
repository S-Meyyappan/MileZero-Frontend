import { use, useEffect, useState } from "react";
import vehicleCategories from "../data/vehicleCategories";
import vehicles from "../data/Vehicle";

function Vehicles() {
    const [selectedCategory, setSelectedCategory] = useState("All Vehicles");
    const [showFilters, setShowFilters] = useState(true);
    const [filteredVehicles, setFilteredVehicles] = useState(vehicles)

    useEffect(() => {
        if (selectedCategory === "All Vehicles") {
            setFilteredVehicles(vehicles)
        } else {
            setFilteredVehicles(vehicles.filter(vehicle => vehicle.category === selectedCategory))
        }
    }, [selectedCategory])

    return (
        <>
            {/* Categories */}
            <div className="container py-5">
                <h1 className="text-center fw-bold display-4 mb-5">
                    Select a vehicle group
                </h1>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                    {vehicleCategories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`btn rounded-pill px-4 py-3 d-flex align-items-center gap-2 ${selectedCategory === category.name
                                        ? "btn-primary text-white"
                                        : "btn-light"
                                    }`}
                            >
                                <Icon size={20} />
                                {category.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Vehicle Section */}
            <div className="container-fluid pb-5">

                {/* Filter Toggle */}
                <div className="d-flex justify-content-end mb-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>

                <div className="row g-4">

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="col-lg-3">

                            <div className="card shadow-sm rounded-4 p-4 sticky-top">

                                <h4 className="fw-bold mb-4">
                                    Filters
                                </h4>

                                <button className="btn btn-primary w-100">
                                    Apply Filters
                                </button>

                            </div>

                        </div>
                    )}

                    {/* Vehicle Grid */}
                    <div className={showFilters ? "col-lg-9" : "col-12"}>

                        <div className="row g-4">

                            {filteredVehicles.map((vehicle) => (

                                <div
                                    className={showFilters ? "col-lg-4" : "col-md-3"}
                                    key={vehicle.id}
                                >

                                    <div className="card h-100 shadow-sm border-0 rounded-4">

                                        <img
                                            src="https://placehold.co/600x400"
                                            className="card-img-top"
                                            alt={vehicle.name}
                                        />

                                        <div className="card-body">

                                            <h5 className="fw-bold">
                                                {vehicle.name}
                                            </h5>

                                            <p className="text-muted mb-2">
                                                {vehicle.category}
                                            </p>

                                            <h4 className="text-primary fw-bold">
                                                ₹ {vehicle.price}
                                            </h4>

                                        </div>

                                        <div className="card-footer bg-white border-0">

                                            <button className="btn btn-primary w-100 rounded-pill">
                                                View Details
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Vehicles;