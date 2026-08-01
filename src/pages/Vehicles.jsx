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

    const [vehicles, setVehicles] = useState([])

    const [vehicleCategories, setVehicleCategories] = useState([])

    const [selectedCategory, setSelectedCategory] = useState("All Vehicles");

    const [filters, setFilters] = useState({

        brand: "",

        fuel: "",

        transmission: "",

        seats: "",

        sort: "recommended"

    });

    const filteredVehicles = useMemo(() => {

        let result = [...vehicles];

        if (selectedCategory !== "All Vehicles") {
            result = result.filter(
                vehicle => vehicle?.category.name === selectedCategory
            );
        }

        if (filters.brand !== "") {
            result = result.filter(
                vehicle => vehicle?.manufacturer === filters.brand
            );
        }

        if (filters.fuel !== "") {
            result = result.filter(
                vehicle => vehicle?.fuelType === filters.fuel
            );
        }

        if (filters.transmission !== "") {
            result = result.filter(
                vehicle => vehicle?.transmission === filters.transmission
            );
        }

        if (filters.seats !== "") {
            result = result.filter(
                vehicle => vehicle?.seatCount == filters.seats
            );
        }

        if (search.trim()) {
            result = result.filter(vehicle =>
                `${vehicle.manufacturer} ${vehicle.model}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        if(filters.sort === "priceLowToHigh"){
            result = result.sort((a,b) => a.category.basePricePerDay - b.category.basePricePerDay)
        }

        if(filters.sort === "priceHighToLow"){
            result = result.sort((a,b) => b.category.basePricePerDay - a.category.basePricePerDay)
        }

        if(filters.sort === "yearLowToHigh"){
            result = result.sort((a,b) => b.manufacturingYear - a.manufacturingYear)
        }

        return result;

    }, [search, selectedCategory, filters, vehicles]);

    useEffect(() => {
        const getAvailableVehicles = async () => {
            const body = {
                "chosenPickup": "2026-08-13T10:00:00",
                "chosenReturn": "2026-08-14T10:00:00",
                "branchId": 1
            }

            const response = await axios.post(`http://localhost:8080/api/availability/all-available-vehicles`,body)
            setVehicles(response.data)
        }

        const getAllCategories = async () => {

            const response = await axios.get(`http://localhost:8080/api/category/get-all`)
            setVehicleCategories(response.data)
        }

        getAvailableVehicles()
        getAllCategories()

        console.log(vehicles)
        console.log(vehicleCategories)
    }, [])

    return (

        <div className="container py-5">

            <VehicleSearch

                search={search}

                setSearch={setSearch}

                count={filteredVehicles.length}

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

                vehicles={filteredVehicles}

            />

            <VehiclePagination />

        </div>

    );

}

export default Vehicles;