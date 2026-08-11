
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { toast } from "react-hot-toast"
import {
    IconArrowLeft,
    IconBuildingStore,
    IconMapPin,
    IconMap,
    IconPhone,
    IconPlus,
} from "@tabler/icons-react"

export default function BranchAdd() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        city: "",
        address: "",
        phone: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {

        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handlePhoneChange = (e) => {

        const value = e.target.value

        // Only digits
        if (!/^\d*$/.test(value)) {
            return
        }

        // Maximum 10 digits
        if (value.length > 10) {
            return
        }

        setForm((prev) => ({
            ...prev,
            phone: value,
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!form.name.trim()) {
            toast.error("Branch name cannot be empty")
            return
        }

        if (!form.city.trim()) {
            toast.error("City cannot be empty")
            return
        }

        if (!form.address.trim()) {
            toast.error("Address cannot be empty")
            return
        }

        if (form.phone.length !== 10) {
            toast.error(
                "Phone number must contain 10 digits"
            )
            return
        }

        const payload = {
            name: form.name.trim(),
            city: form.city.trim(),
            address: form.address.trim(),
            phone: form.phone,
        }

        try {

            setLoading(true)

            await axios.post("http://localhost:8080/api/branch/add",payload)

            toast.success("Branch added successfully")

            navigate(-1)

        } catch (error) {
            toast.error(error.response?.data?.message ||"Unable to add branch")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container py-4">

            {/* Header */}

            <div className="d-flex align-items-center gap-3 mb-4">

                <button
                    type="button"
                    className="btn btn-light border rounded-3"
                    onClick={() =>
                        navigate(-1)
                    }
                    title="Back to branches"
                >
                    <IconArrowLeft size={19} />
                </button>

                <div>

                    <div className="d-flex align-items-center gap-2">

                        <IconBuildingStore size={25} stroke={1.8}/>

                        <h2 className="fw-bold mb-0">
                            Add Branch
                        </h2>

                    </div>

                    <p className="text-muted mb-0 mt-1">
                        Create a new rental branch and location.
                    </p>

                </div>

            </div>


            {/* Form */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4 p-lg-5">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* Branch Name */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Branch Name
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconBuildingStore
                                            size={18}
                                        />
                                    </span>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control border-start-0"
                                        placeholder="e.g. Chennai Central Hub"
                                        required
                                    />

                                </div>

                            </div>


                            {/* City */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    City
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconMapPin
                                            size={18}
                                        />
                                    </span>

                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control border-start-0"
                                        placeholder="e.g. Chennai"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Phone */}

                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Phone
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0">
                                        <IconPhone
                                            size={18}
                                        />
                                    </span>

                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        name="phone"
                                        value={form.phone}
                                        onChange={
                                            handlePhoneChange
                                        }
                                        maxLength="10"
                                        className="form-control border-start-0"
                                        placeholder="9876543210"
                                        required
                                    />

                                </div>

                                <div className="form-text">
                                    Enter exactly 10 digits.
                                </div>

                            </div>


                            {/* Address */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Address
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light border-end-0 align-items-start pt-3">
                                        <IconMap size={18} />
                                    </span>

                                    <textarea
                                        name="address"
                                        value={
                                            form.address
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control border-start-0"
                                        rows="4"
                                        placeholder="Enter complete branch address"
                                        required
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Actions */}

                        <div className="border-top mt-5 pt-4 d-flex flex-column flex-sm-row justify-content-end gap-2">

                            <button
                                type="button"
                                className="btn btn-light border rounded-3 px-4"
                                onClick={() =>
                                    navigate(-1)
                                }
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary rounded-3 px-4 d-flex align-items-center justify-content-center"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            aria-hidden="true"
                                        />

                                        Adding...

                                    </>

                                ) : (

                                    <>
                                        <IconPlus
                                            size={18}
                                            className="me-2"
                                        />

                                        Add Branch

                                    </>

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}
