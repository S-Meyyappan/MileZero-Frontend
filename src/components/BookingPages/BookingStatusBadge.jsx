import {
    IconCalendarCheck,
    IconCar,
    IconRotate,
    IconCircleCheck,
    IconCircleX,
    IconAlertTriangle
} from "@tabler/icons-react";

export default function BookingStatusBadge({ status }) {

    const config = {

        BOOKED: {
            label: "Booked",
            className: "bg-primary-subtle text-primary border border-primary-subtle",
            icon: IconCalendarCheck
        },

        ACTIVE: {
            label: "Active",
            className: "bg-success-subtle text-success border border-success-subtle",
            icon: IconCar
        },

        RETURNED: {
            label: "Returned",
            className: "bg-warning-subtle text-warning-emphasis border border-warning-subtle",
            icon: IconRotate
        },

        COMPLETED: {
            label: "Completed",
            className: "bg-dark-subtle text-dark border"
,
            icon: IconCircleCheck
        },

        CANCELLED: {
            label: "Cancelled",
            className: "bg-danger-subtle text-danger border border-danger-subtle",
            icon: IconCircleX
        },

        NO_SHOW: {
            label: "No Show",
            className: "bg-secondary-subtle text-secondary border border-secondary-subtle",
            icon: IconAlertTriangle
        }

    };

    const current = config[status] ?? config.BOOKED;

    const Icon = current.icon;

    return (

        <span
            className={`badge rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 ${current.className}`}
        >

            <Icon size={16} />

            {current.label}

        </span>

    );

}