import {IconUser,IconPhone} from "@tabler/icons-react";

export default function PersonalInformationCard({
    form,
    setForm,
    editing
}) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))

    }

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4">

                <div className="d-flex align-items-center gap-2 mb-4">
                    <IconUser className="text-primary" />
                    <h5 className="fw-bold mb-0"> Personal Information </h5>
                </div>

                <div className="row g-4">
                    <div className="col-md-6">

                        <label className="form-label fw-semibold"> Full Name </label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><IconUser size={18} /></span>

                            <input type="text" className="form-control" name="name" placeholder="Enter your full name"
                                value={form.name}
                                onChange={handleChange}
                                disabled={!editing}   
                            />
                        </div>

                    </div>

                    <div className="col-md-6">

                        <label className="form-label fw-semibold"> Phone Number </label>
                        <div className="input-group">
                            <span className="input-group-text bg-white"> <IconPhone size={18} /> </span>

                            <input type="tel" className="form-control" name="phone" value={form.phone} placeholder="Enter your phone number"
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}