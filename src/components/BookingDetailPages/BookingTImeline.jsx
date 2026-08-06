import {
    IconCircleCheckFilled,
    IconCircle,
    IconX,
    IconAlertTriangle
} from "@tabler/icons-react";

export default function BookingTimeline({ status }) {

    const steps = [
        "BOOKED",
        "PICKUP",
        "ACTIVE",
        "RETURNED",
        "COMPLETED"
    ];

    const labels = {
        BOOKED: "Booked",
        PICKUP: "Pickup",
        ACTIVE: "Active",
        RETURNED: "Returned",
        COMPLETED: "Completed"
    };

    const currentStep = (() => {

        switch (status) {

            case "BOOKED":
                return 0;

            case "ACTIVE":
                return 2;

            case "RETURNED":
                return 3;

            case "COMPLETED":
                return 4;

            default:
                return -1;

        }

    })();

    if (status === "CANCELLED") {

        return (

            <div className="card border-0 shadow-sm rounded-4 mb-4">

                <div className="card-body p-4">

                    <h5 className="fw-bold mb-4">

                        Booking Timeline

                    </h5>

                    <div className="alert alert-danger mb-0 d-flex align-items-center">

                        <IconX
                            className="me-2"
                            size={22}
                        />

                        This booking has been cancelled.

                    </div>

                </div>

            </div>

        );

    }

    if (status === "NO_SHOW") {

        return (

            <div className="card border-0 shadow-sm rounded-4 mb-4">

                <div className="card-body p-4">

                    <h5 className="fw-bold mb-4">

                        Booking Timeline

                    </h5>

                    <div className="alert alert-warning mb-0 d-flex align-items-center">

                        <IconAlertTriangle
                            className="me-2"
                            size={22}
                        />

                        Customer did not arrive for pickup.

                    </div>

                </div>

            </div>

        );

    }

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4">

                <h5 className="fw-bold mb-4">

                    Booking Timeline

                </h5>

                <div className="d-flex align-items-start justify-content-between">

                    {

                        steps.map((step, index) => {

                            const completed =
                                index <= currentStep;

                            return (

                                <div
                                    key={step}
                                    className="flex-fill text-center position-relative"
                                >

                                    {

                                        index !==
                                        steps.length - 1 && (

                                            <div
                                                className={`position-absolute top-0 start-50 translate-middle-y ${completed
                                                        ? "bg-success"
                                                        : "bg-light border"
                                                    }`}
                                                style={{
                                                    height: "4px",
                                                    width: "100%",
                                                    marginLeft: "30px",
                                                    marginTop: "18px",
                                                    zIndex: 0
                                                }}
                                            />

                                        )

                                    }

                                    <div
                                        className="position-relative"
                                        style={{
                                            zIndex: 1
                                        }}
                                    >

                                        {

                                            completed ? (

                                                <IconCircleCheckFilled
                                                    size={34}
                                                    className="text-success bg-white rounded-circle"
                                                />

                                            ) : (

                                                <IconCircle
                                                    size={34}
                                                    className="text-secondary bg-white rounded-circle"
                                                />

                                            )

                                        }

                                    </div>

                                    <div className="mt-2 fw-semibold">

                                        {

                                            labels[
                                            step
                                            ]

                                        }

                                    </div>

                                </div>

                            );

                        })

                    }

                </div>

            </div>

        </div>

    );

}