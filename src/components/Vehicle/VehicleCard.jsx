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
import { useSelector } from "react-redux";

function VehicleCard({
    vehicle,
    image,
    favourite = false,
    pricePerDay,
    onClick,
    variant = "default",
    showWishlist = true,
    showViewDetails = true,
    showRegistrationNo = false,
}) {

    const navigate = useNavigate();

    const form = useSelector((state) => state.search.form)

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
            className={`vehicle-card ${variant === "review"
                    ? "vehicle-card-review"
                    : ""
                }`}
            onClick={onClick}
        >

            {/* Header */}

            <div className="vehicle-header">
                <span className="brand-badge">
                    {vehicle?.manufacturer || vehicle?.name}
                </span>

                {showWishlist && (

                    <button
                        className="wishlist-btn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {
                            favourite
                                ? <IconHeartFilled size={20} />
                                : <IconHeart size={20} />
                        }
                    </button>

                )}
            </div>

            {/* Image */}
            <div className="vehicle-image-wrapper">
                <img src={`/vehicle/${vehicle.image}`} alt={vehicle?.model} className="vehicle-image" />
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
                { showRegistrationNo ? (
                    <div>
                    <div className="vehicle-price">
                        {vehicle?.registrationNo}
                    </div>
                    </div>
                ) : (
                    <div>
                    <div className="vehicle-price">
                        ₹{form.bookingMode === "DAY" ? vehicle?.category?.basePricePerDay : vehicle?.category?.basePricePerHour}
                    </div>

                    <div className="price-day">
                        {form.bookingMode === "DAY" ? "/ day" : "/ hour"}
                    </div>
                </div>)}

                {showViewDetails && (

                    <button
                        className="details-btn"
                        onClick={onClick}
                    >
                        View Details →
                    </button>
                )}
            </div>

        </div>

    );

}

export default VehicleCard;