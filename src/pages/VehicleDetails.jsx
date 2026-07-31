import VehicleHero from "../components/VehicleDetails/VehicleHero";
import VehicleSpecs from "../components/VehicleDetails/VehicleSpecs";
import VehicleCondition from "../components/VehicleDetails/VehicleCondition";
import VehicleFeatures from "../components/VehicleDetails/VehicleFeatures";


const Vehicle = () => {

    // Temporary data
    // Later this comes from API using vehicleId
    const vehicle = {
        "manufacturer": "Honda",
        "model": "City",
        "manufacturingYear": 2024,
        "fuelType": "PETROL",
        "transmission": "CVT",
        "driveType": "AWD",
        "withAc": true,
        "seatCount": 5,
        "luggageCapacity": 400,
        "currentOdometer": 11140,
        "features": [
            {
                "id": 1,
                "name": "Adaptive Cruise Control",
                "featureGroup": "SAFETY",
                "description": "Automatically adjusts the vehicle speed to maintain a safe distance from vehicles ahead.",
                "isActive": true
            },
            {
                "id": 3,
                "name": "Blind Spot Monitoring",
                "featureGroup": "TECHNOLOGY",
                "description": "Alerts the driver when vehicles are detected in adjacent lanes.",
                "isActive": true
            },
            {
                "id": 7,
                "name": "Heads-up Display",
                "featureGroup": "COMFORT",
                "description": "Displays speed and navigation details directly onto the windshield.",
                "isActive": true
            },
            {
                "id": 8,
                "name": "Autonomous Emergency Braking",
                "featureGroup": "SAFETY",
                "description": "Automatically applies brakes to prevent low-speed collisions.",
                "isActive": true
            }
        ]
    }


    return (
        <>

            <div className="py-4">

                {/* Hero Image + Booking Summary */}
                <VehicleHero vehicle={vehicle} />


                {/* Main Specifications */}
                <VehicleSpecs vehicle={vehicle} />


                {/* Vehicle Condition */}
                <VehicleCondition vehicle={vehicle} />


                {/* Features */}
                <VehicleFeatures features={vehicle.features} />

            </div>

        </>
    );
};


export default Vehicle;