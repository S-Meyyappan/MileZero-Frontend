import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconFilter, IconRefresh, IconSearch } from "@tabler/icons-react";

import BookingList from "../components/BookingPages/BookingList";
import Pagination from "../components/Navigate/Pagination";

import toast from "react-hot-toast";
import BookingFilters from "../components/BookingPages/BookingFilters";

export default function MyBookings() {

    const auth = useSelector((state) => state.auth.form);

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [pageData, setPageData] = useState(null);

    const [page, setPage] = useState(0);

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        sort: "",
        type: "",
        dateRange: []
    })

    const resetFilters = () => {
        setFilters({
            status: "",
            sort: "",
            type: "",
            search: "",
            dateRange: []
        })
    }

    const queryParams = {
        page,
        size: 4,
        filterSort: filters.sort,
        search: filters.search.trim() === "" ? undefined : filters.search.trim(),
        bookingStatus: filters.status === "" ? undefined : filters.status,
        bookingType: filters.type === "" ? undefined : filters.type,
        startDate: filters.dateRange?.[0]?.toISOString(),
        endDate: filters.dateRange?.[1]?.toISOString(),
    };



    const loadBookings = async () => {
        setLoading(true);
        try {
            let endpoint = "";
            switch (auth.role) {
                case "CUSTOMER":
                    endpoint = "http://localhost:8080/api/booking/get-by-customer/me";
                    break;
                case "EMPLOYEE":
                    endpoint = "http://localhost:8080/api/booking/get-by-branch/me";
                    break;
                case "MANAGER":
                    endpoint = "http://localhost:8080/api/booking/get-by-branch/me";
                    break;
                default:
                    return;
            }

            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
                params: queryParams,
            })

            setBookings(response.data.content);
            setPageData(response.data);
        }

        catch (err) { toast.error(err?.response?.data?.message || "Unable to fetch data") }
        finally { setLoading(false) }
    };

    useEffect(() => {

        loadBookings();
        console.log(filters)

    }, [page, filters]);

    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4">

                {/* Header */}

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">
                            {auth.role === "CUSTOMER" ? "My Bookings" : "Booking Management"}
                        </h2>
                        <p className="text-muted mb-0">
                            {auth.role === "CUSTOMER" ? "View and manage your reservations." : "Manage customer bookings."}
                        </p>

                    </div>

                    <div className="col-lg-2">
                        <button type="button" className="btn btn-outline-secondary" onClick={resetFilters}>
                            <IconRefresh size={18} /> Reset
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <BookingFilters
                    filters={filters}
                    onChange={setFilters}
                    onReset={resetFilters}
                />

                {/* Booking Cards */}
                <BookingList
                    bookings={bookings}
                    loading={loading}
                    refreshBookings={loadBookings}
                />

                {/* Pagination */}

                {pageData && pageData.totalPages > 1 && (

                    <Pagination
                        currentPage={page}
                        pageData={pageData}
                        onPageChange={setPage}
                    />

                )
                }

            </div>

        </div>

    );

}