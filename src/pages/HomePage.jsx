import { useNavigate } from "react-router";
import {
    IconMapPin,
    IconCalendarEvent,
    IconSearch,
    IconArrowRight,
    IconShieldCheck,
    IconWallet,
    IconBolt,
    IconCar,
    IconUsersGroup,
    IconShieldCheckFilled
} from "@tabler/icons-react";


import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import VehicleCard from "../components/VehicleCard";
import featuredVehicles from "../data/VehicleJson"

import { useState } from "react";

import heroCar from "../assets/carbg.jpg"

import "../css/HomePage.css";
import "../App.css"

function HomePage() {

    const navigate = useNavigate();

    const [pickupDate, setPickupDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(
        new Date(Date.now() + 86400000)
    );

    return (
        <>

            <section className="hero">

                <div className="container">

                    <div className="hero-wrapper">

                    <div className="row g-5 align-items-center">

                        {/* LEFT */}

                        <div className="col-lg-6">

                            <div className="hero-left">

                                <span className="hero-badge">

                                    Affordable Car Rentals

                                </span>

                                <div className="display-xl hero-title">

                                    Every Journey Starts at
                                    <span className="text-primary"> MileZero.</span>

                                    <br />

                                    Start Yours Today.

                                </div>

                                <p className="body-lg hero-text">

                                    Book reliable rental cars with transparent pricing,
                                    flexible pickup locations and a seamless booking
                                    experience.

                                </p>

                                <button
                                    className="btn btn-primary hero-btn"
                                    onClick={() => navigate("/vehicles")}
                                >

                                    View All Cars

                                    <IconArrowRight size={18} />

                                </button>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="col-lg-6 d-flex justify-content-center">

                            <div className="hero-right">

                                <div className="booking-card">

                                    <div className="booking-title">

                                        Book Your Ride

                                    </div>

                                    <div className="booking-field">

                                        <IconMapPin size={18} />

                                        <select>

                                            <option>Pickup Location</option>
                                            <option>Delhi</option>
                                            <option>Mumbai</option>
                                            <option>Bangalore</option>

                                        </select>

                                    </div>

                                    <div className="booking-field">

                                        <IconMapPin size={18} />

                                        <select>

                                            <option>Drop Location</option>
                                            <option>Delhi</option>
                                            <option>Mumbai</option>
                                            <option>Bangalore</option>

                                        </select>

                                    </div>

                                    <div className="booking-field">

                                        <IconCalendarEvent size={18} />

                                        <Flatpickr
                                            value={pickupDate}
                                            onChange={([date]) => setPickupDate(date)}
                                            options={{
                                                enableTime: true,
                                                dateFormat: "d M Y h:i K"
                                            }}
                                        />

                                    </div>

                                    <div className="booking-field">

                                        <IconCalendarEvent size={18} />

                                        <Flatpickr
                                            value={returnDate}
                                            onChange={([date]) => setReturnDate(date)}
                                            options={{
                                                enableTime: true,
                                                dateFormat: "d M Y h:i K"
                                            }}
                                        />

                                    </div>

                                    <button
                                        className="search-btn"
                                        onClick={() => navigate("/vehicles")}
                                    >

                                        <IconSearch size={18} />

                                        Search Cars

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    </div>

                </div>

            </section>

            {/* ===========================================
    Why Choose MileZero
=========================================== */}

            <section className="section why-section">

                <div className="container">

                    <div className="text-center mb-5">

                        <div className="section-title">

                            Why Choose MileZero

                        </div>

                        <p className="body-lg mt-2">

                            Everything you need for a simple, affordable and
                            stress-free rental experience.

                        </p>

                    </div>

                    <div className="row g-4">

                        <div className="col-lg-4">

                            <div className="feature-card">

                                <div className="feature-icon">

                                    <IconShieldCheck />

                                </div>

                                <div className="card-title mt-4">

                                    Verified Vehicles

                                </div>

                                <p className="caption mt-2">

                                    Every vehicle is regularly inspected,
                                    cleaned and verified before every trip.

                                </p>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="feature-card">

                                <div className="feature-icon">

                                    <IconWallet />

                                </div>

                                <div className="card-title mt-4">

                                    Transparent Pricing

                                </div>

                                <p className="caption mt-2">

                                    No hidden charges.
                                    Know exactly what you're paying.

                                </p>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="feature-card">

                                <div className="feature-icon">

                                    <IconBolt />

                                </div>

                                <div className="card-title mt-4">

                                    Instant Booking

                                </div>

                                <p className="caption mt-2">

                                    Reserve your ride in just a few clicks
                                    with instant confirmation.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ==========================================
    Featured Vehicles
========================================== */}

            <section className="section">

                <div className="container">

                    <div className="section-header">

                        <div>

                            <div className="section-title">

                                Featured Vehicles

                            </div>

                            <p className="body-lg">

                                Popular choices from our fleet.

                            </p>

                        </div>

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => navigate("/vehicles")}
                        >

                            View All →

                        </button>

                    </div>

                    <div className="row g-4">

                        {featuredVehicles.map((vehicle, index) => (

                            <div
                                className="col-lg-4 col-md-6"
                                key={index}
                            >

                                <VehicleCard

                                    vehicle={vehicle}

                                    image={vehicle.image}

                                    pricePerDay={vehicle.pricePerDay}

                                    onClick={() => navigate("/vehicles")}

                                />

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* ==========================================
    Statistics
========================================== */}

            <section className="stats-section">

                <div className="container">

                    <div className="stats-wrapper">

                        <div className="text-center mb-5">

                            <div className="stats-title">

                                MileZero in Numbers

                            </div>

                            <div className="stats-subtitle">

                                Trusted by thousands of drivers across India.

                            </div>

                        </div>

                        <div className="row g-4 text-center">

                            <div className="col-lg-3 col-6">

                                <div className="stat-item">

                                    <div className="stat-icon">

                                        <IconCar size={34} />

                                    </div>

                                    <div className="stat-number">

                                        250+

                                    </div>

                                    <div className="stat-label">

                                        Vehicles

                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-3 col-6">

                                <div className="stat-item">

                                    <div className="stat-icon">

                                        <IconUsersGroup size={34} />

                                    </div>

                                    <div className="stat-number">

                                        5K+

                                    </div>

                                    <div className="stat-label">

                                        Customers

                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-3 col-6">

                                <div className="stat-item">

                                    <div className="stat-icon">

                                        <IconMapPin size={34} />

                                    </div>

                                    <div className="stat-number">

                                        18+

                                    </div>

                                    <div className="stat-label">

                                        Cities

                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-3 col-6">

                                <div className="stat-item">

                                    <div className="stat-icon">

                                        <IconShieldCheckFilled size={34} />

                                    </div>

                                    <div className="stat-number">

                                        98%

                                    </div>

                                    <div className="stat-label">

                                        Safe Trips

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </>

    );
}

export default HomePage;