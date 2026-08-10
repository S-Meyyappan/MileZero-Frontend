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

function VehicleList() {

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

    const [branches, setBranches] = useState([])

    const [loading, setLoading] = useState(false)


    const [filters, setFilters] = useState({
        search: "",
        category: "",
        brand: "",
        fuelType: "",
        transmission: "",
        seats: "",
        sort: "",
        currentStatus: "",
        branchId: ""
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
        currentStatus: filters.currentStatus === "" ? undefined : filters.currentStatus,
        branchId: filters.branchId === "" ? undefined : filters.branchId
    }

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllBrands())
        dispatch(getAllFuelTypes())
        dispatch(getAllTransmissions())
        dispatch(getAllSeats())
    }, [dispatch])

    useEffect(() => {

        const getBranches = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8080/api/branch/get-all"
                )

                setBranches(response.data)

            } catch (err) {

                toast.error(
                    err?.response?.data?.message ||
                    "Unable to load branches"
                )
            }
        }

        getBranches()

    }, [])


    useEffect(() => {

        const getMyVehicles = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:8080/api/vehicle/get-all", {
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
            currentStatus: "",
            branchId : ""
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

                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-body p-3">

                        <div className="row align-items-center">

                            <div className="col-md-4">

                                <label className="form-label fw-semibold mb-2">
                                    Filter by Branch
                                </label>

                                <select
                                    className="form-select rounded-3"
                                    value={filters.branchId}
                                    onChange={(e) => {
                                        setFilters((prev) => ({
                                            ...prev,
                                            branchId: e.target.value
                                        }))
                                        setPage(0)
                                    }}
                                >
                                    <option value="">
                                        All Branches
                                    </option>

                                    {branches.map((branch) => (
                                        <option
                                            key={branch.id}
                                            value={branch.id}
                                        >
                                            {branch.name} — {branch.city}
                                        </option>
                                    ))}

                                </select>

                            </div>

                        </div>

                    </div>
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

export default VehicleList