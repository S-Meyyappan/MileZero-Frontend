import {
    IconHeart,
    IconHeartFilled,
    IconAutomaticGearbox,
    IconManualGearbox,
    IconGasStation,
    IconBolt,
    IconSnowflake,
    IconUsers,
    IconCylinder,
    IconSnowflakeOff
} from "@tabler/icons-react";

import { useNavigate } from "react-router";

import "../../css/VehicleCard.css"

function VehicleCard({
    vehicle,
    image,
    favourite = false,
    pricePerDay,
    onClick
}) {

    const navigate = useNavigate();

    const automaticTypes = ["AT", "AMT", "CVT", "DCT"];

    const transmissionIcon = automaticTypes.includes(vehicle?.transmission)
        ? <IconAutomaticGearbox size={18} />
        : <IconManualGearbox size={18} />;

    const fuelIcon =
        vehicle?.fuelType === "ELECTRIC"
            ? <IconBolt size={18} />
            : vehicle?.fuelType === "CNG"
                ? <IconCylinder size={18} />
                : <IconGasStation size={18} />;

    const withAcIcon = vehicle?.withAc 
            ? <IconSnowflake size={18} />
            : <IconSnowflakeOff size={18} />


    return (

        <div
            className="vehicle-card"
            onClick={onClick}
        >

            {/* Header */}

            <div className="vehicle-header">
                <span className="brand-badge">
                    {vehicle?.manufacturer || vehicle?.name}
                </span>

                <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
                    {favourite
                        ? <IconHeartFilled size={20} />
                        : <IconHeart size={20} />
                    }
                </button>
            </div>

            {/* Image */}
            <div className="vehicle-image-wrapper">
                <img src="https://placehold.co/600x400" alt={vehicle?.model} className="vehicle-image" />
            </div>

            {/* Details */}
            <div className="vehicle-content">
                <div className="vehicle-model">
                    {vehicle?.model}
                </div>

                <div className="vehicle-year">
                    {vehicle?.manufacturingYear}
                </div>

                <div className="vehicle-specs">
                    <div className="spec">
                        {transmissionIcon}
                        <span>{vehicle?.transmission}</span>
                    </div>

                    <div className="spec">
                        {fuelIcon}
                        <span>{vehicle?.fuelType}</span>
                    </div>

                    <div className="spec">
                        {withAcIcon}
                        <span>
                            {vehicle?.withAc ? "AC" : "No AC"}
                        </span>

                    </div>
                    <div className="spec">
                        <IconUsers size={18} />
                        <span>
                            {vehicle?.seatCount} Seats
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="vehicle-footer">
                <div>
                    <div className="vehicle-price">
                        ₹{vehicle?.category?.basePricePerDay}
                    </div>

                    <div className="price-day">
                        / day
                    </div>
                </div>

                <button className="details-btn" onClick={() => navigate(`/vehicle-details/${vehicle?.id}`)}>
                    View Details →
                </button>
            </div>

        </div>

    );

}

export default VehicleCard;