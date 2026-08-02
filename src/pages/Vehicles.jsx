import { useEffect, useMemo, useState } from "react";

import VehicleSearch from "../components/Vehicle/VehicleSearch";
import VehicleCategories from "../components/Vehicle/VehicleCategories";
import VehicleToolbar from "../components/Vehicle/VehicleToolbar";
import VehicleGrid from "../components/Vehicle/VehicleGrid";
import VehiclePagination from "../components/Vehicle/VehiclePagination";
import vehicles from "../data/Vehicle";

import "../css/Vehicle.css"
import axios from "axios";

function Vehicles() {

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0)

    const [pageData, setPageData] = useState(null)

    const [vehicles, setVehicles] = useState([])

    const [vehicleCategories, setVehicleCategories] = useState([])

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
        const getAllCategories = async () => {

            const response = await axios.get(`http://localhost:8080/api/category/get-all`)
            setVehicleCategories(response.data)
        }

        getAllCategories()
    }, [])

    // Get Vehicles
    useEffect(() => {
        const getAvailableVehicles = async () => {
            const body = {
                "chosenPickup": "2026-08-13T10:00:00",
                "chosenReturn": "2026-08-14T10:00:00",
                "branchId": 1
            }

            try {
                const response = await axios.post(`http://localhost:8080/api/availability/fleet`, body, {params : queryParams})
                setPageData(response.data)
                setVehicles(response.data.content)
            }
            catch (err) {
                console.log(err)
            }
        }

        getAvailableVehicles()
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

                brands={[...new Set(vehicles?.map(v => v.manufacturer).sort())]}

                fuelTypes={[...new Set(vehicles?.map(v => v.fuelType).sort())]}

                transmission={[...new Set(vehicles?.map(v => v.transmission).sort())]}

                seatCount={[...new Set(vehicles?.map(v => v.seatCount).sort())]}

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

    );

}

export default Vehicles;