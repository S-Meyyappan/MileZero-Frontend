import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardUpcoming from "../../components/dashboard/DashboardUpcoming";
import DashboardRecent from "../../components/dashboard/DashboardRecent";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CustomerDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = useSelector((state) => state.auth.form);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8080/api/customer/get-dashboard/me",
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    }
                )
                setDashboard(response.data);
                setError(null)
            } 
            catch (err) { 
                setError(err)
                toast.error( err?.response?.data?.message || "Unable to load Dashboard")
            }
            finally { setLoading(false)}
        };

        fetchDashboard()
    }, []);

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
                <div className="alert alert-danger rounded-4" role="alert">
                    Unable to load your dashboard. Please try again.
                </div>
            </div>
        );
    }

    if (!dashboard) {
        return null;
    }

    const {
        customer,
        bookingStats,
        upcomingBooking = [],
        recentBookings = [],
    } = dashboard;

    return (
        <main className="bg-light min-vh-100">
            <div className="container py-4 py-lg-5">

                <DashboardHeader
                    name={customer?.name || "there"}
                />

                <DashboardUpcoming
                    bookings={upcomingBooking}
                />

                <DashboardStats
                    stats={bookingStats}
                />

                <DashboardRecent
                    bookings={recentBookings}
                />

            </div>
        </main>
    );
};

export default CustomerDashboard;