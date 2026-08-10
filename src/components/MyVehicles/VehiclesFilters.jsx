import {
    IconSearch,
    IconFilter,
    IconRefresh
} from "@tabler/icons-react";

export default function VehicleFilters({
    filters,
    onChange,
    onReset,
    vehicleCategories = [],
    brands = [],
    seats = [],
    fuelTypes = [],
    transmissions = []
}) {

    const handleChange = (event) => {
        const {name, value} = event.target
        onChange({
            ...filters,
            [name]: value
        });
    };

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body">

                {/* Filter Header */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                        <IconFilter size={20} />
                        <h5 className="fw-bold mb-0">Filters</h5>
                    </div>

                    <button type="button" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2" 
                        onClick={onReset}
                    >
                        <IconRefresh size={16} />Reset
                    </button>
                </div>


                <div className="row g-3 align-items-end">

                    {/* Search */}
                    <div className="col-lg-3">
                        <label className="form-label fw-semibold">Search</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <IconSearch size={18} />
                            </span>
                            <input type="text" name="search" className="form-control" placeholder="Search vehicle..."
                                value={filters.search}
                                onChange={(e) =>handleChange(e)}
                            />
                        </div>
                    </div>


                    {/* Category */}
                    <div className="col-lg-2">
                        <label className="form-label fw-semibold"> Category</label>
                        <select className="form-select" name="category"
                            value={filters.category}
                            onChange={(e) =>handleChange(e)}
                        >

                            <option value="">All</option>
                            {vehicleCategories.map((category, index) => (

                                <option key={index} value={category.name}>
                                    {category.name}
                                </option>

                            ))}

                        </select>
                    </div>


                    {/* Brand */}
                    <div className="col-lg-2">
                        <label className="form-label fw-semibold"> Brand </label>
                        <select className="form-select" name="brand"
                            value={filters.brand}
                            onChange={(e) => handleChange(e)}
                        >

                            <option value="">All</option>

                            {brands.map((brand, index) => (

                                <option key={index} value={brand}>
                                    {brand}
                                </option>

                            ))}

                        </select>
                    </div>


                    {/* Fuel Type */}
                    <div className="col-lg-2">
                        <label className="form-label fw-semibold"> Fuel Type</label>
                        <select className="form-select" name="fuelType"
                            value={filters.fuelType}
                            onChange={(e) => handleChange(e)}
                        >

                            <option value="">All</option>

                           {fuelTypes.map((fuelType, index) => (

                                <option key={index} value={fuelType}>
                                    {fuelType}
                                </option>
                                
                            ))}

                        </select>
                    </div>


                    {/* Transmission */}
                    <div className="col-lg-2">
                        <label className="form-label fw-semibold">Transmission</label>
                        <select className="form-select" name="transmission" value={filters.transmission}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value=""> All</option>
                            {transmissions.map((transmission, index) => (

                                <option key={index}value={transmission}>
                                    {transmission}
                                </option>
                            ))}

                        </select>

                    </div>


                    {/* Seats */}
                    <div className="col-lg-2">
                        <label className="form-label fw-semibold">Seats</label>
                        <select className="form-select" name="seats"
                            value={filters.seats}
                            onChange={(e) =>handleChange(e)}
                        >

                            <option value="">All</option>
                            {seats.map((seat, index) => (

                                <option key={index} value={seat}>
                                    {seat} Seats
                                </option>

                            ))}

                        </select>
                    </div>



                    {/* Sort */}
                    <div className="col-lg-2">
                        <label className="form-label fw-semibold">Sort By</label>
                        <select className="form-select" name="sort"
                            value={filters.sort}
                            onChange={(e) =>handleChange(e)}
                        >

                            <option value="">Default</option>
                            <option value="YEAR_HIGH_TO_LOW">Newest First</option>
                            <option value="YEAR_LOW_TO_HIGH">Oldest First</option>
                            <option value="PRICE_HIGH_TO_LOW">Price High → Low</option>
                            <option value="PRICE_LOW_TO_HIGH">Price Low → High</option>
                        </select>
                    </div>

                    <div className="col-lg-2">
                        <label className="form-label fw-semibold">Availability</label>

                        <select className="form-select" name="currentStatus"
                            value={filters.currentStatus}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Default</option>
                            <option value="AVAILABLE">Available</option>
                            <option value="RENTED">Rented</option>
                        </select>

                    </div>

                </div>

            </div>

        </div>

    );
}