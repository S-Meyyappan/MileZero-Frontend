import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import axios from "axios"
import toast from "react-hot-toast"

import VehicleDetailsHeader from "../../components/MyVehicleDetails/VehiclesDetailsHeader"
import VehicleBasicInfoCard from "../../components/MyVehicleDetails/VehicleBasicInfoCard"
import VehicleSpecificationsCard from "../../components/MyVehicleDetails/VehicleSpecificationsCard"
import VehicleCategoryCard from "../../components/MyVehicleDetails/VehicleCategoryCard"
import VehiclePricingCard from "../../components/MyVehicleDetails/VehiclePricingCard"
import VehicleFeaturesCard from "../../components/MyVehicleDetails/VehicleFeaturesCard"
import VehicleImageCard from "../../components/MyVehicleDetails/VehicleImageCard"

import { getAllCategories } from "../../store/actions/CategoryActions"
import { getAllFeatures } from "../../store/actions/VehicleFeaturesActions"
import { IconChecklist } from "@tabler/icons-react"

export default function MyVehicleDetails() {

    const { vehicleId } = useParams()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth.form)

    const categories = useSelector(state => state.category.list)

    const features = useSelector(state => state.feature.list)

    const fuelTypes = useSelector((state) => state.fueltype.list)

    const transmissions = useSelector((state) => state.transmission.list)

    const [image, setImage] = useState(null)

    const [loading, setLoading] = useState(true)

    const [saving, setSaving] = useState(false)

    const [isEditing, setIsEditing] = useState(false)

    const canEdit = auth?.role === "MANAGER" || auth?.role === "ADMIN"

    const [vehicle, setVehicle] = useState(null)

    const [form, setForm] = useState({
        registrationNo: "",
        chassisNo: "",
        manufacturer: "",
        model: "",
        manufacturingYear: "",
        purchaseDate: "",
        currentStatus: "",
        fuelType: "",
        transmission: "",
        driveType: "",
        currentOdometer: "",
        seatCount: "",
        luggageCapacity: "",
        withAc: false,
        categoryId: "",
        featureIds: []
    })

    const buildForm = (data) => ({
        registrationNo: data.registrationNo || "",
        chassisNo: data.chassisNo || "",
        manufacturer: data.manufacturer || "",
        model: data.model || "",
        manufacturingYear: data.manufacturingYear || "",
        purchaseDate: data.purchaseDate || "",
        currentStatus: data.currentStatus || "",
        fuelType: data.fuelType || "",
        transmission: data.transmission || "",
        driveType: data.driveType || "",
        currentOdometer: data.currentOdometer || "",
        seatCount: data.seatCount || "",
        luggageCapacity: data.luggageCapacity || "",
        withAc: data.withAc || false,
        categoryId: data.category?.id || "",
        featureIds: data.features?.map(feature => feature.id) || []
    })

    const handleFormChange = () => {
        setForm()
    }

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllFeatures())
    }, [dispatch])

    const headerConfig = {
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    }

    const loadVehicle = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8080/api/vehicle/get/${vehicleId}`, headerConfig)
            setVehicle(response.data)
            setForm(buildForm(response.data))
        }
        catch (err) { toast.error(err?.response?.data?.message || "Unable to load vehicle") }
        finally { setLoading(false) }
    }

    useEffect(() => {
        if (auth?.token) { loadVehicle() }
    }, [auth?.token])


    const handleCancel = () => {
        setForm(buildForm(vehicle))
        setImage(null)
        setIsEditing(false)
    }


    const handleSave = async () => {
        try {

            setSaving(true)

            // Constructing the obj to send
            const vehicleData = {
                registrationNo: form.registrationNo,
                chassisNo: form.chassisNo,
                manufacturer: form.manufacturer,
                model: form.model,
                manufacturingYear: Number(form.manufacturingYear),
                purchaseDate: form.purchaseDate,
                currentStatus: form.currentStatus,
                fuelType: form.fuelType,
                transmission: form.transmission,
                driveType: form.driveType,
                currentOdometer: Number(form.currentOdometer),
                seatCount: Number(form.seatCount),
                luggageCapacity: Number(form.luggageCapacity),
                withAc: form.withAc,
                categoryId: Number(form.categoryId),
                featureIds: form.featureIds
            }


            const fd = new FormData()
            if (image) {
                fd.append("image", image)
            }

            const vehicleBlob = new Blob(
                [JSON.stringify(vehicleData)],
                { type: "application/json" }
            )

            fd.append("vehicle", vehicleBlob);


            await axios.put(`http://localhost:8080/api/vehicle/update/${vehicleId}`, fd, headerConfig)

            toast.success("Vehicle updated successfully")

            loadVehicle()

            setImage(null)

            setIsEditing(false)

        }
        catch (err) { toast.error(err?.response?.data?.message || "Unable to update vehicle") }
        finally { setSaving(false) }
    }


    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" />
            </div>
        )
    }


    if (!vehicle) {
        return (
            <>
                <div className="container py-5">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body text-center p-5">
                            <IconChecklist size={60} className="text-secondary mb-3" />
                            <h3 className="fw-bold"> Vehicle Not Found</h3>
                            <p className="text-muted">
                                The requested vehicle
                                could not be found.
                            </p>
                            <button className="btn btn-primary" onClick={() => navigate(-1)}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }



    const selectedCategory = categories.find(category => String(category.id) === String(form.categoryId)) || vehicle.category


    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4">

                <VehicleDetailsHeader
                    vehicle={vehicle}
                    isEditing={isEditing}
                    canEdit={canEdit}
                    onEdit={() => setIsEditing(true)}
                    onCancel={handleCancel}
                    onSave={handleSave}
                    saving={saving}
                />


                <div className="row g-4">

                    {/* Left */}

                    <div className="col-lg-7">
                        <VehicleBasicInfoCard
                            form={form}
                            onChange={setForm}
                            disabled={!isEditing}
                        />
                    </div>


                    {/* Right */}

                    <div className="col-lg-5">
                        <VehicleImageCard
                            imageUrl={`/vehicle/${vehicle.image}`}
                            image={image}
                            onImageChange={setImage}
                            disabled={!isEditing}
                        />
                    </div>


                    <div className="col-12">
                        <VehicleSpecificationsCard
                            form={form}
                            onChange={setForm}
                            disabled={!isEditing}
                            fuelTypes={fuelTypes}
                            transmissions={transmissions}
                        />
                    </div>


                    <div className="col-12">
                        <VehicleCategoryCard
                            form={form}
                            categories={categories}
                            onChange={setForm}
                            disabled={!isEditing}
                        />
                    </div>


                    <div className="col-12">
                        <VehiclePricingCard
                            category={selectedCategory}
                        />
                    </div>


                    <div className="col-12">
                        <VehicleFeaturesCard
                            features={features}
                            selectedFeatureIds={form.featureIds}
                            onChange={(featureIds) =>
                                setForm({
                                    ...form,
                                    featureIds
                                })
                            }
                            disabled={!isEditing}

                        />

                    </div>

                </div>

            </div>

        </div>

    )

} 