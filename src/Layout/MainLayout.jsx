import { Outlet, useNavigate } from "react-router"
import Navbar from "../components/Navigate/Navbar"
import Footer from "../components/Navigate/Footer"
import BookingSearchBar from "../components/BookingSearchBar"
import Vehicle from "../pages/VehicleDetails"

function MainLayout() {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate("/available-vehicle");
    };

    return (
        <>
            <Navbar />
            <BookingSearchBar onSearch={handleSearch} />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout