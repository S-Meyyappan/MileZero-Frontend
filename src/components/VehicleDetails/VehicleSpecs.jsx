import {

    IconGasStation,
    IconSnowflake,
    IconUsers,
    IconBriefcase,
    IconManualGearbox,
    IconAutomaticGearbox,
    IconSteeringWheel

} from "@tabler/icons-react";

import SpecItem from "./SpecItem";

function VehicleSpecs({ vehicle }) {

    const transmissionIcon =

        vehicle.transmission === "MT" ||
        vehicle.transmission === "MANUAL"

            ? IconManualGearbox
            : IconAutomaticGearbox;

    return (

        <section className="container mb-5">

            <div className="section-title mb-4">Specifications</div>

            <div className="row g-4">

                <SpecItem icon={IconGasStation} label="Fuel"value={vehicle.fuelType} />

                <SpecItem icon={transmissionIcon} label="Transmission" value={vehicle.transmission} />

                <SpecItem icon={IconSteeringWheel} label="Drive" value={vehicle.driveType} />

                <SpecItem icon={IconUsers} label="Seats" value={`${vehicle.seatCount} Seats`} />

                <SpecItem icon={IconBriefcase} label="Luggage" value={`${vehicle.luggageCapacity} L`}/>

                <SpecItem icon={IconSnowflake}label="Air Conditioning" value={ vehicle.withAc ? "Included": "Unavailable"}/>

            </div>

        </section>

    );

}

export default VehicleSpecs;