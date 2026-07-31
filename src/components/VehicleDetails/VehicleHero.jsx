import {
    IconCalendar,
    IconGasStation,
    IconAutomaticGearbox,
    IconManualGearbox
} from "@tabler/icons-react";

import "../../css/VehicleHero.css"

function VehicleHero({ vehicle }) {

    const transmissionIcon = () => {
        if ( vehicle.transmission === "MT" || vehicle.transmission === "MANUAL") {
            return <IconManualGearbox size={18} />;
        }
        return <IconAutomaticGearbox size={18} />;
    };

    return (

        <section className="mb-5">

            <div className="container">

                {/* Heading */}
                <div className="mb-4">
                    <div className="vehicle-brand">{vehicle.manufacturer}</div>
                    <div className="display-lg">{vehicle.model} </div>
                    <div className="vehicle-meta mt-2">
                        <span><IconCalendar size={17}/>{vehicle.manufacturingYear}</span>
                        <span><IconGasStation size={17}/>{vehicle.fuelType}</span>
                        <span>{transmissionIcon()}{vehicle.transmission}</span>
                    </div>
                </div>

                {/* Image + Booking */}
                <div className="row g-4">

                    {/* Image */}

                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <img src="https://placehold.co/1200x700"alt={vehicle.model} className="img-fluid vehicle-image"/>
                        </div>
                    </div>

                    {/* Booking */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 sticky-top booking-summary">
                            <div className="card-body">
                                <div className="price-label">Starting From</div>
                                <div className="vehicle-price">₹1,799 <span>/day</span></div>
                                <div className="availability">Available Today</div>
                                <button className="btn btn-warning w-100 mt-4">Continue Booking</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </section>

    );

}

export default VehicleHero;