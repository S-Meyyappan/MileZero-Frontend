import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import axios from "axios"
import toast from "react-hot-toast"

import VehicleFilters from "../../components/MyVehicles/VehiclesFilters"
import VehicleCard from "../../components/Vehicle/VehicleCard"
import Pagination from "../../components/Navigate/Pagination"

import { getAllCategories } from "../../store/actions/CategoryActions"
import { getAllBrands } from "../../store/actions/BrandActions"
import { getAllFuelTypes } from "../../store/actions/FueltypeActions"
import { getAllTransmissions } from "../../store/actions/TransmissionActions"
import { getAllSeats } from "../../store/actions/SeatActions"
import { IconPlus } from "@tabler/icons-react"

function MyVehicles() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const auth = useSelector((state) => state.auth.form)

    const vehicleCategories = useSelector((state) => state.category.list)

    const brands = useSelector((state) => state.brand.list)

    const seats = useSelector((state) => state.seat.list)

    const fuelTypes = useSelector((state) => state.fueltype.list)

    const transmissions = useSelector((state) => state.transmission.list)

    const [page, setPage] = useState(0)

    const [pageData, setPageData] = useState(null)

    const [vehicles, setVehicles] = useState([])

    const [loading, setLoading] = useState(false)


    const [filters, setFilters] = useState({
        search: "",
        category: "",
        brand: "",
        fuelType: "",
        transmission: "",
        seats: "",
        sort: "",
        currentStatus: ""
    })

    const queryParams = {
        page: page,
        size: 4,
        filterSort: filters.sort === "" ? undefined : filters.sort,
        search: filters.search === "" ? undefined : filters.search,
        brand: filters.brand === "" ? undefined : filters.brand,
        fuelType: filters.fuelType === "" ? undefined : filters.fuelType,
        transmission: filters.transmission === "" ? undefined : filters.transmission,
        seats: filters.seats === "" ? undefined : filters.seats,
        category: filters.category === "" ? undefined : filters.category,
        currentStatus: filters.currentStatus === "" ? undefined : filters.currentStatus
    }

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllBrands())
        dispatch(getAllFuelTypes())
        dispatch(getAllTransmissions())
        dispatch(getAllSeats())
    }, [dispatch])


    useEffect(() => {

        const getMyVehicles = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:8080/api/vehicle/get-by-branch/me",
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        },
                        params: queryParams
                    }
                )
                setPageData(response.data)
                setVehicles(response.data.content)
            }

            catch (err) { toast.error(err?.response?.data?.message || "Unable to load vehicles") }
            finally { setLoading(false) }
        }

        getMyVehicles()

    }, [page, filters])


    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
        setPage(0)
    }


    const handleReset = () => {
        setFilters({
            search: "",
            category: "",
            brand: "",
            fuelType: "",
            transmission: "",
            seats: "",
            sort: "",
            currentStatus: ""
        })
        setPage(0)
    }


    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4">

                {/* Header */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <h2 className="fw-bold mb-1">My Vehicles</h2>
                        <p className="text-muted mb-0">
                            Vehicles assigned to your branch
                        </p>
                    </div>

                    <button
                        className="btn btn-outline-primary d-flex align-items-center"
                        onClick={() => navigate("add")}
                    >
                        <IconPlus size={18} className="me-2" />
                        Add Vehicle
                    </button>

                </div>


                {/* Filters */}

                <VehicleFilters
                    filters={filters}
                    onChange={handleFilterChange}
                    onReset={handleReset}
                    vehicleCategories={vehicleCategories}
                    brands={brands}
                    seats={seats}
                    fuelTypes={fuelTypes}
                    transmissions={transmissions}
                />


                {/* Vehicles */}

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" />
                    </div>

                ) : vehicles.length === 0 ? (
                    <div className="text-center py-5">
                        <h5 className="fw-bold"> No vehicles found</h5>
                        <p className="text-muted">No vehicles match your current filters. </p>
                    </div>

                ) : (

                    <div className="row g-4">

                        {vehicles.map((vehicle) => (

                            <div className="col-xl-3 col-lg-4 col-md-6" key={vehicle.id}>
                                <VehicleCard
                                    vehicle={vehicle}
                                    showWishlist={false}
                                    showViewDetails={true}
                                    showRegistrationNo={true}
                                    onClick={() => navigate(`/dashboard/my-vehicles/${vehicle.id}`)}
                                />
                            </div>

                        ))}

                    </div>

                )}


                {/* Pagination */}

                {!loading && pageData && pageData.totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        pageData={pageData}
                        onPageChange={setPage}
                    />
                )}

            </div>

        </div>

    )

}

export default MyVehicles