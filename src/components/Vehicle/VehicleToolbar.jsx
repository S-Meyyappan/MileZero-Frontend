function VehicleToolbar({ filters, setFilters, brands, fuelTypes, transmissions, seatCount }) {

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
                        {
                            brands.map((b,index) => (
                                <option key={index} value={b}>{b}</option>
                            ))
                        }
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
                        {
                            fuelTypes.map((f,index) => (
                                <option key={index} value={f}>{f}</option>
                            ))
                        }
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
                        {
                            transmissions.map((t,index) => (
                                <option key={index} value={t}>{t}</option>
                            ))
                        }
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
                        {
                            seatCount?.map((s,index) => (
                                <option key={index} value={s}>{s}</option>
                            ))
                        }
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
                        <option value="DEFAULT">Recommended</option>
                        <option value="PRICE_LOW_TO_HIGH">Price: Low to High</option>
                        <option value="PRICE_HIGH_TO_LOW">Price: High to Low</option>
                        <option value="YEAR_HIGH_TO_LOW"> Newest First</option>
                    </select>
                </div>

            </div>

        </section>

    );

}

export default VehicleToolbar;