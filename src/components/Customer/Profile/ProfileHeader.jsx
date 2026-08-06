import { IconArrowLeft, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export default function ProfileHeader() {

    const navigate = useNavigate();

    return (

        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">

                <button className="btn btn-outline-secondary me-3" onClick={() => navigate("/dashboard")} >
                    <IconArrowLeft size={18} />
                </button>

                <div>
                    <div className="d-flex align-items-center mb-1">
                        <IconUser className="text-primary me-2" size={28} />
                        <h2 className="fw-bold mb-0"> My Profile </h2>
                    </div>
                    <p className="text-muted mb-0"> Manage your personal information and driving licence details. </p>
                </div>

            </div>
        </div>

    );

}