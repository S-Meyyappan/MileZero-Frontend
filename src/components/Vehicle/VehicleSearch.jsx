import { IconSearch } from "@tabler/icons-react";

function VehicleSearch({
    search,
    setSearch,
    count
}) {

    return (

        <section className="mb-4">

            <div className="row align-items-center g-3">

                {/* Left */}
                <div className="col-lg-6">
                    <div className="section-title">
                        Find Your Perfect Ride
                    </div>
                    <p className="text-secondary mb-0">
                        Search from our growing fleet of reliable vehicles.
                    </p>
                </div>

                {/* Right */}
                <div className="col-lg-6">
                    <div className="input-group">
                        <span className="input-group-text bg-white">
                            <IconSearch size={18} />
                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by manufacturer or model..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                    </div>

                </div>

            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="text-secondary">
                    Showing
                    <span className="fw-semibold text-dark mx-1">{count}</span>
                    vehicles
                </div>
            </div>

        </section>

    );

}

export default VehicleSearch;