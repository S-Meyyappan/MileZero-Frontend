import {
    IconMapPin,
    IconCalendarEvent,
    IconPhone,
    IconBuildingStore
} from "@tabler/icons-react";

export default function BookingBranchCard({
    title,
    branch,
    date,
    color = "primary"
}) {

    const formatDate = (value) =>
        new Date(value).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

    return (

        <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

                <div className="d-flex align-items-center gap-2 mb-4">

                    <div
                        className={`bg-${color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center`}
                        style={{
                            width: 48,
                            height: 48
                        }}
                    >

                        <IconMapPin
                            className={`text-${color}`}
                            size={24}
                        />

                    </div>

                    <div>

                        <h5 className="fw-bold mb-0">

                            {title}

                        </h5>

                        <small className="text-muted">

                            Branch Information

                        </small>

                    </div>

                </div>

                <div className="mb-4">

                    <small className="text-muted d-block">

                        Branch

                    </small>

                    <div className="fw-semibold fs-5">

                        {branch.name}

                    </div>

                </div>

                <div className="d-flex mb-3">

                    <IconBuildingStore
                        size={20}
                        className={`text-${color} me-3 mt-1`}
                    />

                    <div>

                        <div className="fw-semibold">

                            City

                        </div>

                        <small className="text-muted">

                            {branch.city}

                        </small>

                    </div>

                </div>

                <div className="d-flex mb-3">

                    <IconMapPin
                        size={20}
                        className={`text-${color} me-3 mt-1`}
                    />

                    <div>

                        <div className="fw-semibold">

                            Address

                        </div>

                        <small className="text-muted">

                            {branch.address}

                        </small>

                    </div>

                </div>

                <div className="d-flex mb-3">

                    <IconPhone
                        size={20}
                        className={`text-${color} me-3 mt-1`}
                    />

                    <div>

                        <div className="fw-semibold">

                            Contact

                        </div>

                        <small className="text-muted">

                            {branch.phone}

                        </small>

                    </div>

                </div>

                <hr />

                <div className="d-flex">

                    <IconCalendarEvent
                        size={22}
                        className={`text-${color} me-3 mt-1`}
                    />

                    <div>

                        <div className="fw-semibold">

                            Scheduled Time

                        </div>

                        <div>

                            {formatDate(date)}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}