import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import {
    IconArrowRight,
    IconCalendarEvent,
    IconMapPin,
    IconSearch
} from "@tabler/icons-react";

import heroImage from "../assets/carbg.jpg"

import "../css/HomePage.css"
import "../App.css"

import WhyChoose from "../components/Homepage/WhyChoose";
import FeaturedVehicles from "../components/Homepage/FeatureVehicles";

import featuredVehicles from "../data/VehicleJson";

function Home() {
    const navigate = useNavigate();
    const [pickupDate, setPickupDate] = useState(new Date());

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [returnDate, setReturnDate] = useState(tomorrow);

    // Setup animation states
    const textToAnimate = "MileZero.";
    const [activeIndex, setActiveIndex] = useState(-1);
    const timeoutsRef = useRef([]);

    useEffect(() => {
        function runSelectionLoop() {
            // Clear any active timeouts from previous loops
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];

            // Step 1: Select letter-by-letter
            textToAnimate.split("").forEach((_, index) => {
                const t = setTimeout(() => {
                    setActiveIndex(index);
                }, index * 120); // Slightly faster selection speed (120ms)
                timeoutsRef.current.push(t);
            });

            // Step 2: Hold for 5 seconds, clear selection, wait 1.5s for the fade to complete, then restart
            const totalSelectionTime = textToAnimate.length * 120;
            const holdTime = 500; 

            const resetTimeout = setTimeout(() => {
                setActiveIndex(-1); // Triggers the "swoosh fade" CSS transition
                
                // Wait for the swoosh animation to completely finish before repeating
                const restartTimeout = setTimeout(runSelectionLoop, 1500);
                timeoutsRef.current.push(restartTimeout);

            }, totalSelectionTime + holdTime);

            timeoutsRef.current.push(resetTimeout);
        }

        runSelectionLoop();

        return () => timeoutsRef.current.forEach(clearTimeout);
    }, []);

    return (
        <>
        <section className="hero">
            <div className="container">
                <div
                    className="hero-wrapper rounded-5 overflow-hidden"
                    style={{
                        backgroundImage: `linear-gradient(rgba(17,24,39,.55),rgba(17,24,39,.45)),url(${heroImage})`
                    }}
                >
                    <div className="container-fluid p-4 p-lg-5">
                        <div className="row align-items-center g-5">
                            {/* Left */}
                            <div className="col-lg-12 text-white">
                                <span className="hero-badge">
                                    Affordable Car Rentals
                                </span>

                                <div className="display-xl mt-3">
                                    Every Journey Starts at &nbsp;
                                    
                                    <span className="ms-1">
                                        {textToAnimate.split("").map((char, index) => (
                                            <span 
                                                key={index} 
                                                className={`swoosh-letter ${index <= activeIndex ? "active" : ""}`}
                                                style={{
                                                    // This variable creates the sequential delay during the fade-out
                                                    "--letter-index": index 
                                                }}
                                            >
                                                {char}
                                            </span>
                                        ))}
                                    </span>

                                    <br />
                                    Start Yours Today.
                                </div>

                                <p className="body-lg text-white-50 mt-4 mb-4">
                                    Book reliable rental cars with transparent pricing,
                                    flexible pickup locations and a seamless booking experience.
                                </p>

                                <button
                                    className="btn btn-primary btn-lg px-4 d-inline-flex align-items-center gap-2"
                                    onClick={() => navigate("/vehicles")}
                                >
                                    View All Cars
                                    <IconArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <WhyChoose />

        <FeaturedVehicles 
            vehicles={featuredVehicles}
        />
        </>
    );
}

export default Home;
