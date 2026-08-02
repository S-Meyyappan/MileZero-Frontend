import VehicleHero from "../components/VehicleDetails/VehicleHero";
import VehicleSpecs from "../components/VehicleDetails/VehicleSpecs";
import VehicleCondition from "../components/VehicleDetails/VehicleCondition";
import VehicleFeatures from "../components/VehicleDetails/VehicleFeatures";
import FeaturedVehicles from "../components/Homepage/FeaturedVehicles";
import featuredVehicles from "../data/VehicleJson";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import CategoryPricing from "../components/VehicleDetails/CategoryPricing";


const Vehicle = () => {

    const { vehicleId }= useParams()
    const [vehicle, setVehicle] = useState(null)

   useEffect(()=>{
        const getVehicle = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/vehicle/get/${vehicleId}`)
                setVehicle(response.data)
                console.log("useEffecct" ,response?.data)
            } catch (error) {
                console.log(error)
            }
        }

        getVehicle()
   }, [])


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
                <VehicleFeatures features={vehicle?.features} />

                {/* Category Pricing */}
                <CategoryPricing category={vehicle?.category} />

                <FeaturedVehicles
                    vehicles={featuredVehicles}
                />

            </div>

        </>
    );
};


export default Vehicle;