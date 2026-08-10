import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import toast from "react-hot-toast";

import VehicleDetailsHeader from "../../components/MyVehicleDetails/VehiclesDetailsHeader";
import VehicleBasicInfoCard from "../../components/MyVehicleDetails/VehicleBasicInfoCard";
import VehicleSpecificationsCard from "../../components/MyVehicleDetails/VehicleSpecificationsCard";
import VehicleCategoryCard from "../../components/MyVehicleDetails/VehicleCategoryCard";
import VehiclePricingCard from "../../components/MyVehicleDetails/VehiclePricingCard";
import VehicleFeaturesCard from "../../components/MyVehicleDetails/VehicleFeaturesCard";
import VehicleImageCard from "../../components/MyVehicleDetails/VehicleImageCard";

import { getAllCategories } from "../../store/actions/CategoryActions";
import { getAllFeatures } from "../../store/actions/VehicleFeaturesActions";
import { getAllFuelTypes } from "../../store/actions/FueltypeActions";
import { getAllTransmissions } from "../../store/actions/TransmissionActions";

export default function AddVehicle() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth.form);

    const categories = useSelector(state => state.category.list)

    const features = useSelector(state => state.feature.list)

    const fuelTypes = useSelector((state) => state.fueltype.list)

    const transmissions = useSelector((state) => state.transmission.list)

    const [image, setImage] = useState(null)

    const [saving, setSaving] = useState(false)

    const [form, setForm] = useState({
        registrationNo: "",
        chassisNo: "",
        manufacturer: "",
        model: "",
        manufacturingYear: "",
        purchaseDate: "",
        fuelType: "",
        transmission: "",
        driveType: "",
        currentOdometer: "",
        seatCount: "",
        luggageCapacity: "",
        withAc: false,
        categoryId: "",
        featureIds: []
    });

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllFeatures());
        dispatch(getAllFuelTypes())
        dispatch(getAllTransmissions())
    }, [dispatch]);

    const headerConfig = {
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    };

    const handleCancel = () => {
        navigate("/dashboard/my-vehicles");
    };

    const handleSave = async () => {

        try {

            setSaving(true);

            const vehicleData = {
                registrationNo: form.registrationNo,
                chassisNo: form.chassisNo,
                manufacturer: form.manufacturer,
                model: form.model,
                manufacturingYear: Number(form.manufacturingYear),

                fuelType: form.fuelType,
                transmission: form.transmission,
                driveType: form.driveType,

                currentOdometer: Number(form.currentOdometer),

                purchaseDate: form.purchaseDate,

                seatCount: Number(form.seatCount),
                luggageCapacity: Number(form.luggageCapacity),

                withAc: form.withAc,

                categoryId: Number(form.categoryId),

                featureIds: form.featureIds
            };

            const fd = new FormData();

            if (image) {
                fd.append("image", image);
            }

            const vehicleBlob = new Blob(
                [JSON.stringify(vehicleData)],
                { type: "application/json" }
            );

            fd.append("vehicle", vehicleBlob);

            await axios.post(
                "http://localhost:8080/api/vehicle/add-new",
                fd,
                headerConfig
            );

            toast.success("Vehicle added successfully");

            navigate("/dashboard/my-vehicles");

        } catch (err) {

            toast.error(
                err?.response?.data?.message ||
                "Unable to add vehicle"
            );

        } finally {
            setSaving(false);
        }
    };

    const selectedCategory =
        categories.find(
            category =>
                String(category.id) === String(form.categoryId)
        );

    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4">

                <VehicleDetailsHeader
                    vehicle={null}
                    isEditing={true}
                    isCreate={true}
                    onEdit={() => { }}
                    onCancel={handleCancel}
                    onSave={handleSave}
                    saving={saving}
                />

                <div className="row g-4">

                    {/* Basic Information */}

                    <div className="col-lg-7">

                        <VehicleBasicInfoCard
                            form={form}
                            onChange={setForm}
                            disabled={false}
                        />

                    </div>


                    {/* Image */}

                    <div className="col-lg-5">

                        <VehicleImageCard
                            imageUrl={null}
                            image={image}
                            onImageChange={setImage}
                            disabled={false}
                        />

                    </div>


                    {/* Specifications */}

                    <div className="col-12">

                        <VehicleSpecificationsCard
                            form={form}
                            onChange={setForm}
                            disabled={false}
                            fuelTypes={fuelTypes}
                            transmissions={transmissions}
                        />

                    </div>


                    {/* Category */}

                    <div className="col-12">

                        <VehicleCategoryCard
                            form={form}
                            categories={categories}
                            onChange={setForm}
                            disabled={false}
                        />

                    </div>


                    {/* Pricing */}

                    <div className="col-12">

                        <VehiclePricingCard
                            category={selectedCategory}
                        />

                    </div>


                    {/* Features */}

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
                            disabled={false}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}