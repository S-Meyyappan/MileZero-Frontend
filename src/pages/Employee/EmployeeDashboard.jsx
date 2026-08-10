import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import EmployeeBookingList from "../../components/Dashboard/EmployeeBookingList";

const EmployeeDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = useSelector((state) => state.auth.form);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    "http://localhost:8080/api/employee/get-dashboard/me",
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }
                );

                setDashboard(response.data);
                setError(null);
            } catch (err) {
                setError(err);

                toast.error(
                    err?.response?.data?.message ||
                        "Unable to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token) {
            fetchDashboard();
        }
    }, [auth?.token]);

    if (loading) {
        return (
            <div className="container py-5">
                <div className="d-flex justify-content-center py-5">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div
                    className="alert alert-danger rounded-4"
                    role="alert"
                >
                    Unable to load your dashboard. Please try again.
                </div>
            </div>
        );
    }

    if (!dashboard) {
        return null;
    }

    const {
        employee,
        bookingStats,
        upcomingPickups = [],
        upcomingReturns = [],
    } = dashboard;

    return (
        <main className="bg-light min-vh-100">
            <div className="container py-4 py-lg-5">

                <DashboardHeader
                    name={employee?.name || "thre"}
                    branchName={employee?.branchName}
                />

                <DashboardStats
                    stats={bookingStats}
                />

                <EmployeeBookingList
                    bookings={upcomingPickups}
                    type="pickup"
                    title="Upcoming Pickups"
                    subtitle="Customers arriving at your branch"
                />

                <EmployeeBookingList
                    bookings={upcomingReturns}
                    type="return"
                    title="Upcoming Returns"
                    subtitle="Vehicles expected back at your branch"
                />

            </div>
        </main>
    );
};

export default EmployeeDashboard;