import {
    IconCalendar,
    IconDashboard,
    IconShieldCheck,
    IconSnowflake
} from "@tabler/icons-react";

function VehicleCondition({ vehicle }) {

    return (

        <section className="container mb-5">

            <div className="section-title mb-4">
                Vehicle Condition
            </div>

            <div className="row g-4">

                {/* Year */}
                <div className="col-lg-3 col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body">
                            <IconCalendar size={28}className="text-primary mb-3"/>
                            <div className="small text-secondary">Manufacturing Year</div>
                            <div className="fw-semibold mt-1">{vehicle?.manufacturingYear}</div>
                        </div>
                    </div>
                </div>


                {/* Odometer */}
                <div className="col-lg-3 col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body">
                            <IconDashboard size={28}className="text-primary mb-3"/>
                            <div className="small text-secondary">Current Odometer</div>
                            <div className="fw-semibold mt-1">{vehicle?.currentOdometer} km</div>
                        </div>
                    </div>
                </div>


                {/* AC */}
                <div className="col-lg-3 col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body">
                            <IconSnowflake size={28} className="text-primary mb-3"/>
                            <div className="small text-secondary">Air Conditioning</div>
                            <div className="fw-semibold mt-1">{vehicle?.withAc ? "Available" : "Not Available"}</div>
                        </div>
                    </div>
                </div>


                {/* Maintenance */}
                <div className="col-lg-3 col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body">
                            <IconShieldCheck size={28} className="text-success mb-3" />
                            <div className="small text-secondary"> Status</div>
                            <div className="fw-semibold mt-1">Regularly Maintained</div>
                        </div>
                    </div>
                </div>

            </div>

        </section>

    );

}

export default VehicleCondition;