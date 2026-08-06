import {
    IconCar,
    IconGasStation,
    IconSettings,
    IconSteeringWheel,
    IconUsers,
    IconBriefcase,
    IconSnowflake
} from "@tabler/icons-react";

export default function BookingVehicleCard({ vehicle }) {

    const specs = [
        {
            label: "Fuel",
            value: vehicle.fuelType,
            icon: <IconGasStation size={20} className="text-primary" />
        },
        {
            label: "Transmission",
            value: vehicle.transmission,
            icon: <IconSettings size={20} className="text-primary" />
        },
        {
            label: "Drive Type",
            value: vehicle.driveType,
            icon: <IconSteeringWheel size={20} className="text-primary" />
        },
        {
            label: "Seats",
            value: vehicle.seatCount,
            icon: <IconUsers size={20} className="text-primary" />
        },
        {
            label: "Luggage",
            value: `${vehicle.luggageCapacity} L`,
            icon: <IconBriefcase size={20} className="text-primary" />
        },
        {
            label: "Air Conditioning",
            value: vehicle.withAc ? "Available" : "Not Available",
            icon: <IconSnowflake size={20} className="text-primary" />
        }
    ];

    return (

        <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

                <h5 className="fw-bold mb-4">

                    Vehicle Information

                </h5>

                {/* Image */}

                <div
                    className="bg-light rounded-4 border d-flex flex-column justify-content-center align-items-center mb-4"
                    style={{
                        height: "250px"
                    }}
                >

                    {
                        vehicle.image ? (

                            <img
                                src={vehicle.image}
                                alt={vehicle.model}
                                className="img-fluid rounded-4 h-100 w-100"
                                style={{
                                    objectFit: "cover"
                                }}
                            />

                        ) : (

                            <>
                                <IconCar
                                    size={70}
                                    className="text-primary mb-3"
                                />

                                <h6 className="fw-semibold">

                                    No Vehicle Image

                                </h6>

                                <small className="text-muted">

                                    Image will be available soon

                                </small>

                            </>

                        )
                    }

                </div>

                {/* Basic Info */}

                <div className="mb-4">

                    <h4 className="fw-bold mb-1">

                        {vehicle.manufacturer} {vehicle.model}

                    </h4>

                    <p className="text-muted mb-0">

                        {vehicle.category.name}

                        {" • "}

                        {vehicle.manufacturingYear}

                    </p>

                </div>

                <hr />

                {/* Specifications */}

                <div className="row g-4">

                    {

                        specs.map((spec) => (

                            <div
                                className="col-md-6"
                                key={spec.label}
                            >

                                <div className="d-flex">

                                    <div className="me-3">

                                        {spec.icon}

                                    </div>

                                    <div>

                                        <small className="text-muted d-block">

                                            {spec.label}

                                        </small>

                                        <div className="fw-semibold">

                                            {spec.value}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}