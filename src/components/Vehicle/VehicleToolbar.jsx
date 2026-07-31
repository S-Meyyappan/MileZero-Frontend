function VehicleToolbar({ filters, setFilters }) {

    const updateFilter = (key, value) => {

        setFilters(prev => ({
            ...prev,
            [key]: value
        }));

    };

    return (

        <section className="mb-5">

            <div className="row g-3 align-items-center">

                {/* Brand */}
                <div className="col-lg-2 col-md-4">
                    <select
                        className="form-select"
                        value={filters.brand}
                        onChange={(e) =>
                            updateFilter("brand", e.target.value)
                        }
                    >
                        <option value="">All Brands</option>
                        <option>Toyota</option>
                        <option>Honda</option>
                        <option>Hyundai</option>
                        <option>BMW</option>
                    </select>
                </div>


                {/* Fuel */}
                <div className="col-lg-2 col-md-4">
                    <select
                        className="form-select"
                        value={filters.fuel}
                        onChange={(e) =>
                            updateFilter("fuel", e.target.value)
                        }
                    >
                        <option value="">Fuel Type</option>
                        <option>Petrol</option>
                        <option>Diesel</option>
                        <option>Electric</option>
                    </select>
                </div>


                {/* Transmission */}
                <div className="col-lg-2 col-md-4">
                    <select
                        className="form-select"
                        value={filters.transmission}
                        onChange={(e) =>
                            updateFilter(
                                "transmission",
                                e.target.value
                            )
                        }
                    >

                        <option value=""> Transmission </option>
                        <option>Manual</option>
                        <option>Automatic</option>
                        <option>CVT</option>
                    </select>
                </div>


                {/* Seats */}
                <div className="col-lg-2 col-md-4">
                    <select
                        className="form-select"
                        value={filters.seats}
                        onChange={(e) =>
                            updateFilter("seats", e.target.value)
                        }
                    >

                        <option value="">Seats</option>
                        <option>2</option>
                        <option>4</option>
                        <option>5</option>
                        <option>7</option>
                    </select>
                </div>


                {/* Sort */}
                <div className="col-lg-4 col-md-8">
                    <select
                        className="form-select"
                        value={filters.sort}
                        onChange={(e) =>
                            updateFilter("sort", e.target.value)
                        }
                    >
                        <option value="recommended">Recommended</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                        <option value="year"> Newest First</option>
                    </select>
                </div>

            </div>

        </section>

    );

}

export default VehicleToolbar;