import { useEffect, useMemo, useState } from "react";

import VehicleSearch from "../components/Vehicle/VehicleSearch";
import VehicleCategories from "../components/Vehicle/VehicleCategories";
import VehicleToolbar from "../components/Vehicle/VehicleToolbar";
import VehicleGrid from "../components/Vehicle/VehicleGrid";
import VehiclePagination from "../components/Vehicle/VehiclePagination";

import "../css/Vehicle.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function Vehicles() {

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0)

    const [pageData, setPageData] = useState(null)

    const [vehicles, setVehicles] = useState([])

    const [vehicleCategories, setVehicleCategories] = useState([])

    const [brands, setBrands] = useState([])

    const [seats, setSeats] = useState([])

    const [fuelTypes, setFuelTypes] = useState([])

    const [transmissions, setTransmissions] = useState([])

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

        const getAllBrands = async () => {

            const response = await axios.get(`http://localhost:8080/api/vehicle/get-all-brands`)
            setBrands(response.data)
        }

        const getAllSeats = async () => {

            const response = await axios.get(`http://localhost:8080/api/vehicle/get-all-seats`)
            setSeats(response.data)
        }

        const getAllFuelTypes = async () => {

            const response = await axios.get(`http://localhost:8080/api/vehicle/get-all-fuel-types`)
            setFuelTypes(response.data)
        }

        const getAllTransmissions = async () => {

            const response = await axios.get(`http://localhost:8080/api/vehicle/get-all-transmissions`)
            setTransmissions(response.data)
        }

        getAllCategories()
        getAllBrands()
        getAllFuelTypes()
        getAllTransmissions()
        getAllSeats()
    }, [])

    const dispatch = useDispatch()

    const form = useSelector((state) => state.search.form)

    // Get Vehicles
    useEffect(() => {
        const getAvailableVehicles = async () => {
            const body = {
                "chosenPickup": new Date(form.pickupDate).toISOString(),
                "chosenReturn": new Date(form.returnDate).toISOString(),
                "branchId": form.pickupBranch
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
    }, [page, search, selectedCategory, filters, form])

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

    );

}

export default Vehicles;