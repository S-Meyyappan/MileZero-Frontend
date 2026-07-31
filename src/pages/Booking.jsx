import React, { useState } from "react";
import vehicles from "../data/Vehicle";
import addons from "../data/Addons";
import { useNavigate, useParams, Link } from "react-router";
import Navbar from "../components/Navbar";

export default function Booking() {
    const { vehicleId } = useParams();
    const navigate = useNavigate();

    const [selectedAddons, setSelectedAddons] = useState({});

    const increaseAddon = (id) => {
        setSelectedAddons((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const decreaseAddon = (id) => {
        setSelectedAddons((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0),
        }));
    };

    // Find selected vehicle
    const v = vehicles.find((v) => v.id === Number(vehicleId));

    if (!v) {
        return (
            <div className="container text-center my-5 py-5">
                <h2 className="text-danger fw-bold">Vehicle Not Found</h2>
                <p className="text-muted">The vehicle code you requested does not exist in our system inventory.</p>
                <Link to="/vehicles" className="btn btn-primary mt-3">Back to Vehicles</Link>
            </div>
        );
    }

    // Vehicle price (convert string to number)
    const vehiclePrice = Number(v.price.toString().split(" ")[0]);

    // Total add-on price
    const addonTotal = addons.reduce((total, addon) => {
        const qty = selectedAddons[addon.id] || 0;
        return total + qty * addon.pricePerDay;
    }, 0);

    // Grand total
    const totalPrice = vehiclePrice + addonTotal;

    return (
        <div className="bg-light min-vh-100">
            <Navbar/>
            {/* Search Form */}
            <div className="shadow-sm py-3 bg-warning-subtle">
                <div className="container-fluid">
                    <div className="row g-2 align-items-end">
                        <div className="col-lg-2">
                            <label className="form-label">
                                Pick-up Location
                            </label>
                            <select className="form-select rounded-2">
                                        <option>Pickup Location</option>
                                        <option>Delhi</option>
                                        <option>Mumbai</option>
                                        <option>Bangalore</option>
                                    </select>
                        </div>

                        <div className="col-lg-2">
                            <label className="form-label">
                                Drop Location
                            </label>
                            <select className="form-select rounded-2">
                                        <option>Drop Location</option>
                                        <option>Delhi</option>
                                        <option>Mumbai</option>
                                        <option>Bangalore</option>
                                    </select>
                        </div>

                        <div className="col-lg-2">
                            <label className="form-label">
                                Pick-up Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                            />
                        </div>

                        <div className="col-lg-1">
                            <label className="form-label">Time</label>
                            <input
                                type="time"
                                className="form-control"
                            />
                        </div>

                        <div className="col-lg-2">
                            <label className="form-label">
                                Drop-off Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                            />
                        </div>

                        <div className="col-lg-1">
                            <label className="form-label">Time</label>
                            <input
                                type="time"
                                className="form-control"
                            />
                        </div>

                        <div className="col-lg-2 d-grid">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/vehicles")}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle Details */}
            <div className="container-fluid py-4">
                <div className="card shadow-sm mb-4">
                    <div className="row g-0 align-items-center">
                        <div className="col-md-3 text-center p-3">
                            <img
                                src={v.image}
                                alt={v.name}
                                className="img-fluid"
                            />
                        </div>

                        <div className="col-md-6">
                            <div className="card-body">
                                <h4>{v.name}</h4>
                                <p className="text-muted">{v.type}</p>

                                <div className="row">
                                    <div className="col-6">
                                        <p>Transmission: {v.transmission}</p>
                                        <p>Seats: {v.seats}</p>
                                    </div>

                                    <div className="col-6">
                                        <p>Bags: {v.bags}</p>
                                        <p>Doors: {v.doors}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 text-center">
                            <p>Vehicle Price</p>
                            <h2 className="text-primary">
                                ₹{vehiclePrice}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Add-ons */}
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="mb-0">Choose Add-ons</h5>
                    </div>

                    <div className="card-body">
                        {addons.map((addon) => {
                            const qty =
                                selectedAddons[addon.id] || 0;
                            const addonAmount =
                                qty * addon.pricePerDay;

                            return (
                                <div
                                    key={addon.id}
                                    className="d-flex justify-content-between align-items-center border-bottom py-3"
                                >
                                    <div>
                                        <h6 className="mb-1">
                                            {addon.name}
                                        </h6>

                                        <small className="text-muted d-block">
                                            ₹{addon.pricePerDay} /
                                            day
                                        </small>

                                        <small className="text-success fw-semibold">
                                            Total: ₹{addonAmount}
                                        </small>
                                    </div>

                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                            className="btn btn-outline-danger btn-sm border-0"
                                            onClick={() =>
                                                decreaseAddon(
                                                    addon.id
                                                )
                                            }
                                        >
                                            <i className="bi bi-dash-circle-fill"></i>
                                        </button>

                                        <span
                                            className="fw-bold text-center"
                                            style={{
                                                width: "30px",
                                            }}
                                        >
                                            {qty}
                                        </span>

                                        <button
                                            className="btn btn-outline-primary btn-sm border-0"
                                            onClick={() =>
                                                increaseAddon(
                                                    addon.id
                                                )
                                            }
                                        >
                                            <i className="bi bi-plus-circle-fill"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Total Summary */}
                <div className="card shadow-sm mt-4">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <p className="mb-1">
                                Vehicle Price:
                                <strong>
                                    {" "}
                                    ₹{vehiclePrice}
                                </strong>
                            </p>

                            <p className="mb-1">
                                Add-ons:
                                <strong>
                                    {" "}
                                    ₹{addonTotal}
                                </strong>
                            </p>

                            <h4 className="text-primary mb-0">
                                Grand Total: ₹{totalPrice}
                            </h4>

                            <small className="text-muted">
                                Includes vehicle rental and
                                selected add-ons
                            </small>
                        </div>

                        <button className="btn btn-success px-4">
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}