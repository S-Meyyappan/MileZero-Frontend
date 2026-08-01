import { Outlet } from "react-router"
import Navbar from "../components/Navigate/Navbar"
import Footer from "../components/Navigate/Footer"
import BookingSearchBar from "../components/BookingSearchBar"

function MainLayout() {
    return (
        <>
            <Navbar />
            <BookingSearchBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout