import React from "react";
import vehicles from "../data/Vehicle"
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import addons from "../data/Addons";

export default function Booking() {

    const { vehicleId } = useParams()
    const navigate = useNavigate()

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


    // Find vehicle object inside local state array
    const v = vehicles.find((v) => v.id === Number(vehicleId));
    return (
        <div className="bg-light min-vh-100">

            {/* Sticky Search Form */}
            <div className="shadow-sm py-3 bg-warning-subtle">
                <div className="container-fluid">

                    <div className="row g-2 align-items-end">

                        <div className="col-lg-4">
                            <label className="form-label">Pick-up Location</label>
                            <input
                                className="form-control"
                                placeholder="Chennai Airport"
                            />
                        </div>

                        <div className="col-lg-2">
                            <label className="form-label">Pick-up Date</label>
                            <input type="date" className="form-control" />
                        </div>

                        <div className="col-lg-1">
                            <label className="form-label">Time</label>
                            <input type="time" className="form-control" />
                        </div>

                        <div className="col-lg-2">
                            <label className="form-label">Drop-off Date</label>
                            <input type="date" className="form-control" />
                        </div>

                        <div className="col-lg-1">
                            <label className="form-label">Time</label>
                            <input type="time" className="form-control" />
                        </div>

                        <div className="col-lg-2 d-grid">
                            <button className="btn btn-primary" onClick={() => navigate("/vehicles")}>
                                Search
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* Results */}
            <div className="container-fluid py-4">

                {/* {vehicle.map((v) => ( */}
                <div className="vd mb-3 shadow-sm" key={v.id}>
                    <div className="row g-0 align-items-center">

                        <div className="col-md-3 text-center p-3">
                            <img
                                src=""
                                className="img-fluid"
                                alt={v.name}
                            />
                        </div>

                        <div className="col-md-6">
                            <div className="vd-body">
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
                            <p>Total Price</p>
                            <h2 className="text-primary">
                                ₹{v.price.split(" ")[0]}
                            </h2>
                        </div>

                    </div>
                </div>
                {/* ))} */}

            </div>

            <div className="card shadow-sm mt-4">
                <div className="card-header bg-white">
                    <h5 className="mb-0">Choose Add-ons</h5>
                </div>

                <div className="card-body">
                    {addons.map((addon) => (
                        <div
                            key={addon.id}
                            className="d-flex justify-content-between align-items-center border-bottom py-3"
                        >
                            <div>
                                <h6 className="mb-1">{addon.name}</h6>
                                <small className="text-muted">
                                    ₹{addon.pricePerDay} / day
                                </small>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <button
                                    className="btn btn-outline-danger btn-sm border-0"
                                    onClick={() => decreaseAddon(addon.id)}
                                >
                                    <i class="bi bi-dash-circle-fill"></i>
                                </button>

                                <span
                                    className="fw-bold text-center"
                                    style={{ width: "30px" }}
                                >
                                    {selectedAddons[addon.id] || 0}
                                </span>

                                <button
                                    className="btn btn-outline-primary btn-sm border-0"
                                    onClick={() => increaseAddon(addon.id)}
                                >
                                    <i class="bi bi-plus-circle-fill"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Footer */}
                <div className="card shadow-sm mt-4">
                    <div className="card-body d-flex justify-content-between align-items-center">

                        <div>
                            <h5 className="mb-0">
                                Total: <span className="text-primary">₹{v.price}</span>
                            </h5>
                            <small className="text-muted">
                                Includes vehicle rental and selected add-ons
                            </small>
                        </div>

                        <button
                            className="btn btn-success px-4"
                        >
                            Confirm Booking
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}