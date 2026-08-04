import {
    IconCalendarEvent,
    IconMapPin,
    IconRoad,
    IconClock,
    IconCar
} from "@tabler/icons-react";
import VehicleCard from "../Vehicle/VehicleCard";

export default function TripSummary({ booking, vehicle }) {

    const formatTimestamp = (timestamp, type = 'short') => {
    if (!timestamp) return '';
    
    const options = type === 'text' 
        ? { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }
        : { dateStyle: 'short', timeStyle: 'short', hour12: true };

    return new Intl.DateTimeFormat('en-GB', options).format(new Date(timestamp));
};


    return (
        
        <div className="bg-white rounded-4 shadow-sm border p-4 mt-4">
            
            <h5 className="fw-bold mt-1">
                Trip Details
            </h5>

            {/* Pickup */}
            <div className="d-flex align-items-start gap-3 mb-4">

                <div className="text-primary">
                    <IconCalendarEvent size={22} stroke={1.8} />
                </div>

                <div>
                    <small className="text-muted d-block">
                        Pickup
                    </small>

                    <div className="fw-semibold">
                        {formatTimestamp(booking?.pickupDate, 'text')}
                    </div>
                </div>

            </div>

            {/* Return */}
            <div className="d-flex align-items-start gap-3 mb-4">

                <div className="text-primary">
                    <IconClock size={22} stroke={1.8} />
                </div>

                <div>
                    <small className="text-muted d-block">
                        Return
                    </small>

                    <div className="fw-semibold">
                        {formatTimestamp(booking?.returnDate, 'text')}
                    </div>
                </div>

            </div>

            {/* Pickup Branch */}
            <div className="d-flex align-items-start gap-3 mb-4">

                <div className="text-primary">
                    <IconMapPin size={22} stroke={1.8} />
                </div>

                <div>
                    <small className="text-muted d-block">
                        Pickup Branch
                    </small>

                    <div className="fw-semibold">
                        {booking?.pickupBranch?.name}
                    </div>
                    <small className="text-muted">{booking?.pickupBranch?.city}</small>
                </div>

            </div>

            {/* Return Branch */}
            <div className="d-flex align-items-start gap-3 mb-4">

                <div className="text-primary">
                    <IconMapPin size={22} stroke={1.8} />
                </div>

                <div>
                    <small className="text-muted d-block">
                        Return Branch
                    </small>

                    <div className="fw-semibold">
                        {booking?.dropBranch?.name}
                    </div>
                    <small className="text-muted">{booking?.dropBranch?.city}</small>
                </div>

            </div>

            {/* Included Distance */}
            {/* <div className="d-flex align-items-start gap-3">

                <div className="text-primary">
                    <IconRoad size={22} stroke={1.8} />
                </div>

                <div>
                    <small className="text-muted d-block">
                        Included Distance
                    </small>

                    <div className="fw-semibold">
                        {booking.includedKm} km
                    </div>
                </div>

            </div> */}

            <h5 className="fw-bold m-4">
                Selected Car
            </h5>

            <VehicleCard vehicle={vehicle} />
        
        </div>
    );
}