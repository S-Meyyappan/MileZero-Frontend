import {
    IconCalendar,
    IconGasStation,
    IconAutomaticGearbox,
    IconManualGearbox
} from "@tabler/icons-react";

import "../../css/VehicleHero.css"
import { useState } from "react";
import { useNavigate } from "react-router";

function VehicleHero({ vehicle }) {

    const navigate = useNavigate()

    const transmissionIcon = () => {
        if (vehicle?.transmission === "MT" || vehicle?.transmission === "MANUAL") {
            return <IconManualGearbox size={18} />;
        }
        return <IconAutomaticGearbox size={18} />;
    };

    const [selectedImage, setSelectedImage] = useState("https://placehold.co/600x400")
    const images = ["https://placehold.co/600x400", "https://placehold.co/600x300", "https://placehold.co/600x200"]

    return (

        <section className="mb-5">

            <div className="container">

                {/* Heading */}
                <div className="mb-4">
                    <div className="vehicle-brand">{vehicle?.manufacturer}</div>
                    <div className="display-lg">{vehicle?.model} </div>
                    <div className="vehicle-meta mt-2">
                        <span><IconCalendar size={17} />{vehicle?.manufacturingYear}</span>
                        <span><IconGasStation size={17} />{vehicle?.fuelType}</span>
                        <span>{transmissionIcon()}{vehicle?.transmission}</span>
                    </div>
                </div>

                {/* Image + Booking */}
                <div className="row g-4">

                    {/* Image */}

                    <div className="col-lg-8">

                        <div className="row g-3">

                            {/* Main Image */}
                            <div className="col-9">
                                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                                    <img
                                        src={selectedImage}
                                        className="img-fluid vehicle-main-image"
                                        alt={vehicle?.model}
                                    />
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="col-3">
                                <div className="d-flex flex-column gap-3 h-100">

                                    {images.slice(0).map((img, index) => (
                                        <div
                                            key={index}
                                            className={`card border-0 shadow-sm rounded-4 overflow-hidden flex-fill gallery-thumb ${selectedImage === img ? "active-thumb" : ""
                                                }`}
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <img
                                                src={img}
                                                className="img-fluid h-100 w-100 object-fit-cover"
                                                alt=""
                                            />
                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Booking */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 sticky-top booking-summary">
                            <div className="card-body">
                                <div className="price-label">Starting From</div>
                                <div className="vehicle-price">₹{vehicle?.category.basePricePerDay} <span>/day</span></div>
                                <div className="availability">Available</div>
                                <button className="btn btn-warning w-100 mt-4"onClick={() => navigate(`/booking/${vehicle?.id}`)}>Continue Booking</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </section>

    );

}

export default VehicleHero;