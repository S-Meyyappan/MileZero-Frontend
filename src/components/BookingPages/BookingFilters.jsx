import { IconSearch, IconFilter, IconRefresh } from "@tabler/icons-react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function BookingFilters({

    filters,
    onChange,
    onReset

}) {

    const handleChange = (key, value) => {
        onChange({
            ...filters,
            [key]: value
        })
    }

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body">

                <div className="row g-3 align-items-end">

                    {/* Search */}
                    <div className="col-lg-3">
                        <label className="form-label fw-semibold">Search</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><IconSearch size={18} /></span>
                            <input type="text" className="form-control" placeholder="Search booking..."
                                value={filters.search}
                                onChange={(e) => handleChange("search", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Status */}

                    <div className="col-lg-2">
                        <label className="form-label fw-semibold">Status</label>
                        <select className="form-select"
                            value={filters.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                        >

                            <option value=""> All</option>
                            <option value="BOOKED">Booked</option>
                            <option value="ACTIVE">Active</option>
                            <option value="RETURNED">Returned</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="NO_SHOW">No Show</option>

                        </select>

                    </div>

                    {/* Booking Type */}

                    <div className="col-lg-2">

                        <label className="form-label fw-semibold">

                            Booking Type

                        </label>

                        <select className="form-select"
                            value={filters.type}
                            onChange={(e) => handleChange("type", e.target.value)}
                        >

                            <option value="">All</option>
                            <option value="DAILY">Daily</option>
                            <option value="HOURLY">Hourly</option>
                        </select>

                    </div>

                    {/* Sort */}

                    <div className="col-lg-2">
                        <label className="form-label fw-semibold">Sort By</label>
                        <select className="form-select"
                            value={filters.sort}
                            onChange={(e) => handleChange("sort", e.target.value)}
                        >

                            <option value="">Default</option>
                            <option value="YEAR_HIGH_TO_LOW">Latest First</option>
                            <option value="YEAR_LOW_TO_HIGH"> Oldest First</option>
                            <option value="PRICE_HIGH_TO_LOW">Price High → Low</option>
                            <option value="PRICE_LOW_TO_HIGH">Price Low → High</option>
                        </select>
                    </div>

                    {/* Date Range */}

                    <div className="col-lg-3">
                        <label className="form-label fw-semibold">
                            Date Range
                        </label>

                        <Flatpickr
                            options={{
                                mode: "range",
                                dateFormat: "Y-m-d"
                            }}
                            value={filters.dateRange}
                            onClose={(dates) => {
                                if (dates.length === 2) {
                                    handleChange("dateRange", dates);
                                }
                            }}
                            className="form-control"
                            placeholder="Select date range"
                        />
                    </div>

                </div>

            </div>

        </div>

    );

}