import { useNavigate } from "react-router";
import VehicleCard from "./VehicleCard";

function VehicleGrid({ vehicles }) {

    const navigate = useNavigate()

    return (

        <section>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <div className="section-title">
                        Available Vehicles
                    </div>
                    <p className="text-secondary mb-0">
                        {vehicles.length} vehicles available for booking
                    </p>
                </div>

            </div>

            {
                vehicles.length === 0 ?
                    (
                        <div className="text-center py-5">
                            <img src="/empty-search.svg" alt="No Vehicles" width="220" className="mx-auto mb-4"/>
                            <h4 className="fw-bold">No Vehicles Found</h4>
                            <p className="text-secondary">Try changing your filters or search.</p>
                        </div>

                )  :   (

                        <div className="row g-4">
                            {
                                vehicles.map(vehicle => (
                                    <div key={vehicle.id} className="col-xl-4 col-lg-4 col-md-6">
                                        <VehicleCard 
                                            vehicle={vehicle}
                                            onClick={() => navigate(`/vehicle-details/${vehicle?.id}`)}
                                            />
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
        </section>
    );
}

export default VehicleGrid;