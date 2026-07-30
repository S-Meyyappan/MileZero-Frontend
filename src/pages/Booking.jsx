import React from "react";
import vehicles from "../data/Vehicle"
import { useNavigate, useParams } from "react-router";

export default function Booking() {

  const { vehicleId } = useParams()
  const navigate = useNavigate()

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

                <button className="btn btn-primary mb-4">
                  Book Now
                </button>
              </div>

            </div>
          </div>
        {/* ))} */}

      </div>
    </div>
  );
}