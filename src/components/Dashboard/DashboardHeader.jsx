import {
    IconCar,
    IconCalendarEvent,
    IconUser,
    IconBuildingStore,
    IconClipboardList,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const DashboardHeader = ({ name }) => {
    const navigate = useNavigate();

    const form = useSelector((state) => state.auth.form)

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "Good morning";
        if (hour >= 12 && hour < 17) return "Good afternoon";
        return "Good evening";
    };

    console.log("dashboard header : ",form)
    const isEmployee = (form?.role === "EMPLOYEE" || form?.role === "MANAGER");

    return (
        <div className="mb-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                <div>
                    <h1 className="fw-bold mb-2">
                        {getGreeting()}, {name} <span>👋</span>
                    </h1>

                    <p className="text-secondary mb-0">
                        {isEmployee
                            ? "Here's what's happening with your branch today."
                            : "Here's what's happening with your rentals."}
                    </p>
                </div>

                <div className="d-flex flex-wrap gap-2">
                    {isEmployee ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-primary rounded-3 d-flex align-items-center gap-2"
                                onClick={() => navigate("my-bookings")}
                            >
                                <IconClipboardList size={18} />
                                Branch Bookings
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-primary rounded-3 d-flex align-items-center gap-2"
                                onClick={() => navigate("my-vehicles")}
                            >
                                <IconCar size={18} />
                                Vehicles
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="btn btn-warning rounded-3 d-flex align-items-center gap-2"
                                onClick={() => navigate("/vehicles")}
                            >
                                <IconCar size={18} />
                                Browse Vehicles
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-success rounded-3 d-flex align-items-center gap-2"
                                onClick={() => navigate("my-bookings")}
                            >
                                <IconCalendarEvent size={18} />
                                My Bookings
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-primary rounded-3 d-flex align-items-center gap-2"
                                onClick={() => navigate("customer-profile")}
                            >
                                <IconUser size={18} />
                                My Profile
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;