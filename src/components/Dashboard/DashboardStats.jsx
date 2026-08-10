import {
    IconCalendar,
    IconCalendarEvent,
    IconCar,
    IconCircleCheck,
    IconArrowBackUp,
    IconCalendarX,
    IconCalendarOff,
} from "@tabler/icons-react";

const DashboardStats = ({ stats }) => {
    const customerStatItems = [
        {
            label: "Total Bookings",
            value: stats?.total ?? 0,
            icon: IconCalendar,
            colorClass: "primary",
        },
        {
            label: "Booked",
            value: stats?.booked ?? 0,
            icon: IconCalendarEvent,
            colorClass: "info",
        },
        {
            label: "Active",
            value: stats?.active ?? 0,
            icon: IconCar,
            colorClass: "primary",
        },
        {
            label: "Completed",
            value: stats?.completed ?? 0,
            icon: IconCircleCheck,
            colorClass: "success",
        },
        {
            label: "Returned",
            value: stats?.returned ?? 0,
            icon: IconArrowBackUp,
            colorClass: "secondary",
        },
        {
            label: "Cancelled",
            value: stats?.cancelled ?? 0,
            icon: IconCalendarX,
            colorClass: "danger",
        },
        {
            label: "No Show",
            value: stats?.missed ?? 0,
            icon: IconCalendarOff,
            colorClass: "warning",
        },
    ];

    return (
        <section className="mb-5">
            <div className="row g-3">
                {customerStatItems.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="col-12 col-sm-6 col-lg-3"
                        >
                            <div className="card h-100 border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-start justify-content-between gap-3">
                                        <div>
                                            <p className="text-secondary small fw-medium mb-2">
                                                {stat.label}
                                            </p>

                                            <div className="fs-2 fw-bold text-dark">
                                                {stat.value}
                                            </div>
                                        </div>

                                        <div className={`bg-${stat.colorClass}-subtle rounded-3 p-2 text-${stat.colorClass}`}>
                                            <Icon size={50} stroke={1.8} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default DashboardStats;
