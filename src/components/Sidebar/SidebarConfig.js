import {
    IconLayoutDashboard,
    IconUserCircle,
    IconHeart,
    IconCalendarEvent,
    IconLogout2,
    IconClipboardCheck,
    IconCar,
    IconBuilding,
    IconChartBar,
    IconSettings,
    IconUsers,
    IconUserStar,
    IconCategory,
    IconCurrencyRupee,
    IconHome
} from "@tabler/icons-react";

const sidebarConfig = {

    CUSTOMER: [

        {
            title: "Dashboard",
            icon: IconLayoutDashboard,
            path: "/dashboard"
        },

        {
            title: "Home",
            icon: IconHome,
            path: "/"
        },

        {
            title: "Profile",
            icon: IconUserCircle,
            path: "customer-profile"
        },

        {
            title: "Bookings",
            icon: IconCalendarEvent,
            path: "my-bookings"
        }

    ],

    EMPLOYEE: [

        {
            title: "Dashboard",
            icon: IconLayoutDashboard,
            path: "/dashboard"
        },

        {
            title: "Vehicle Inspection",
            icon: IconClipboardCheck,

            children: [

                {
                    title: "Verify Documents",
                    path: "/employee/documents"
                },

                {
                    title: "Vehicle Pickup",
                    path: "/employee/pickup"
                },

                {
                    title: "Vehicle Return",
                    path: "/employee/return"
                }

            ]

        },

        {
            title: "Vehicles",
            icon: IconCar,
            path: "my-vehicles"
        },

        {
            title: "Branch",
            icon: IconBuilding,
            path: "my-bookings"
        }

    ],

    MANAGER: [

        {
            title: "Dashboard",
            icon: IconLayoutDashboard,
            path: "/dashboard"
        },

        {
            title: "Vehicles",
            icon: IconCar,
            path: "my-vehicles"
        },

        {
            title: "Branch",
            icon: IconBuilding,
            path: "my-bookings"
        },

    ],

    ADMIN: [

        {
            title: "Fleet",
            icon: IconCar,
            path: "admin-vehicles"
        },

        {
            title: "Branches",
            icon: IconBuilding,
            path: "branches"
        },

        {
            title: "Employees",
            icon: IconUsers,
            path: "employees"
        },

        {
            title: "Customers",
            icon: IconUserStar,
            path: "customers"
        },

        {
            title: "Settings",
            icon: IconSettings,
            path: "categories"
        }

    ]

};

export default sidebarConfig;