import { useEffect, useMemo, useState } from "react";

import VehicleSearch from "../components/Vehicle/VehicleSearch";
import VehicleCategories from "../components/Vehicle/VehicleCategories";
import VehicleToolbar from "../components/Vehicle/VehicleToolbar";
import VehicleGrid from "../components/Vehicle/VehicleGrid";
import VehiclePagination from "../components/Vehicle/VehiclePagination";

import "../css/Vehicle.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../store/actions/CategoryActions";
import { getAllBrands } from "../store/actions/BrandActions";
import { getAllFuelTypes } from "../store/actions/FueltypeActions";
import { getAllTransmissions } from "../store/actions/TransmissionActions";
import { getAllSeats } from "../store/actions/SeatActions";

function Vehicles(){

    const dispatch = useDispatch()

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0)

    const [pageData, setPageData] = useState(null)

    const [vehicles, setVehicles] = useState([])

    const form = useSelector((state) => state.search.form)

    const vehicleCategories = useSelector((state) => state.category.list)

    const brands = useSelector((state) => state.brand.list)

    const seats = useSelector((state) => state.seat.list)

    const fuelTypes = useSelector((state) => state.fueltype.list)

    const transmissions = useSelector((state) => state.transmission.list)

    const [selectedCategory, setSelectedCategory] = useState("All Vehicles");

    const [filters, setFilters] = useState({
        brand: "",
        fuel: "",
        transmission: "",
        seats: "",
        sort: "DEFAULT"
    });

    const queryParams = {
        page: page,
        size: 6,
        filterSort: filters.sort,
        // If search is empty, pass undefined so Axios skips it
        search: search === "" ? undefined : search,
        brand: filters.brand === "" ? undefined : filters.brand,
        fuelType: filters.fuel === "" ? undefined : filters.fuel,
        transmission: filters.transmission === "" ? undefined : filters.transmission,
        seats: filters.seats === "" ? undefined : filters.seats,
        category: selectedCategory === "All Vehicles" || selectedCategory === "" ? undefined : selectedCategory

    }

    // Get Categories
    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllBrands())
        dispatch(getAllFuelTypes())
        dispatch(getAllTransmissions())
        dispatch(getAllSeats())
    }, [dispatch])

    // Get Vehicles
    useEffect(() => {
        const getAllVehicles = async () => {

            try {
                const response = await axios.get(`http://localhost:8080/api/vehicle/get-all`, { params : queryParams })
                setPageData(response.data)
                setVehicles(response.data.content)
            }
            catch (err) {
                console.log(err)
            }
        }

        getAllVehicles()
    }, [page, search, selectedCategory, filters])

    return (
        <div className="container py-5">

            <VehicleSearch

                search={search}

                setSearch={setSearch}

                count={pageData?.totalElements}

            />

            <VehicleCategories

                categories={vehicleCategories}

                selectedCategory={selectedCategory}

                setSelectedCategory={setSelectedCategory}

            />

            <VehicleToolbar

                filters={filters}

                setFilters={setFilters}

                brands={brands}

                fuelTypes={fuelTypes}

                transmissions={transmissions}

                seatCount={seats}

            />

            <VehicleGrid

                vehicles={vehicles}

            />

            <VehiclePagination
                currentPage={page}
                pageData={pageData}
                onPageChange={setPage}
            />

        </div>
    )
}

export default Vehicles