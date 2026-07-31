import { useMemo, useState } from "react";

import VehicleSearch from "../components/Vehicle/VehicleSearch";
import VehicleCategories from "../components/Vehicle/VehicleCategories";
import VehicleToolbar from "../components/Vehicle/VehicleToolbar";
import VehicleGrid from "../components/Vehicle/VehicleGrid";
import VehiclePagination from "../components/Vehicle/VehiclePagination";

import vehicles from "../data/Vehicle";
import vehicleCategories from "../data/vehicleCategories";

import "../css/Vehicle.css"

function Vehicles() {

    const [search, setSearch] = useState("");

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
                vehicle => vehicle.category === selectedCategory
            );

        }

        if (search.trim()) {

            result = result.filter(vehicle =>
                `${vehicle.manufacturer} ${vehicle.model}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        }

        return result;

    }, [search, selectedCategory]);

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

            />

            <VehicleGrid

                vehicles={filteredVehicles}

            />

            <VehiclePagination />

        </div>

    );

}

export default Vehicles;