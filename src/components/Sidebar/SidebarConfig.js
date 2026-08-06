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
            title: "Home",
            icon: IconHome,
            path: "/"
        },

        {
            title: "Dashboard",
            icon: IconLayoutDashboard,
            path: "home"
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
            path: "/employee"
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

            children: [

                {
                    title: "View Vehicles",
                    path: "/vehicles"
                },

                {
                    title: "Add Vehicle",
                    path: "/vehicles/new"
                },

                {
                    title: "Edit Vehicle",
                    path: "/vehicles/edit"
                }

            ]

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
            path: "/manager"
        },

        {
            title: "Branch",
            icon: IconBuilding,
            path: "/manager/branch"
        },

        {
            title: "Bookings",
            icon: IconCalendarEvent,
            path: "my-bookings"
        },

        {
            title: "Reports",
            icon: IconChartBar,
            path: "/manager/reports"
        },

        {
            title: "Branch Settings",
            icon: IconSettings,
            path: "/manager/settings"
        }

    ],

    ADMIN: [

        {
            title: "Dashboard",
            icon: IconLayoutDashboard,
            path: "/admin"
        },

        {
            title: "Fleet",
            icon: IconCar,

            children: [

                {
                    title: "Vehicles",
                    path: "/admin/vehicles"
                },

                {
                    title: "Categories",
                    icon: IconCategory,
                    path: "/admin/categories"
                },

                {
                    title: "Pricing",
                    icon: IconCurrencyRupee,
                    path: "/admin/pricing"
                }

            ]

        },

        {
            title: "Branches",
            icon: IconBuilding,
            path: "/admin/branches"
        },

        {
            title: "Employees",
            icon: IconUsers,
            path: "/admin/employees"
        },

        {
            title: "Customers",
            icon: IconUserStar,
            path: "/admin/customers"
        },

        {
            title: "Reports",
            icon: IconChartBar,
            path: "/admin/reports"
        },

        {
            title: "Settings",
            icon: IconSettings,
            path: "/admin/settings"
        }

    ]

};

export default sidebarConfig;