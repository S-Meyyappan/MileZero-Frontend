import { IconShieldCheck} from "@tabler/icons-react";

export default function InsuranceCard({
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
                    <IconShieldCheck className="text-primary" />
                    <h5 className="fw-bold mb-0"> Insurance Information  </h5>
                </div>

                <div>
                    <label className="form-label fw-semibold"> Insurance Policy Number </label>
                    <input type="text" className="form-control" name="insurancePolicyNo" placeholder="Enter insurance policy number"
                        value={form.insurancePolicyNo || ""}
                        onChange={handleChange}
                        disabled={!editing}
                    />

                    <small className="text-muted mt-2 d-block">
                        This field is optional. If you have a personal
                        insurance policy that applies to your rentals,
                        you can provide the policy number here.
                    </small>

                </div>

            </div>

        </div>

    );

}