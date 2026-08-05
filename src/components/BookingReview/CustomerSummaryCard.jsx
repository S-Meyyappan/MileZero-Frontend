import { useEffect, useState } from "react";
import axios from "axios";
import {
    IconUser,
    IconPhone,
    IconIdBadge2,
    IconCalendar,
    IconShieldCheck
} from "@tabler/icons-react";

export default function CustomerSummaryCard({ token }) {

    const [customer, setCustomer] = useState(null);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadCustomer = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8080/api/customer/get/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setCustomer(response.data);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }

        };

        loadCustomer();

    }, [token]);

    if (loading) {

        return (

            <div className="text-center py-4">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

            </div>

        );

    }

    if (!customer) {

        return (

            <div className="alert alert-danger mb-0">

                Unable to load customer information.

            </div>

        );

    }

    return (

        <>

            <div className="text-center mb-4">

                <div
                    className="rounded-circle bg-primary bg-opacity-10 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                        width: 70,
                        height: 70
                    }}
                >

                    <IconUser
                        size={34}
                        className="text-primary"
                    />

                </div>

                <h5 className="fw-bold mt-3 mb-1">

                    {customer.name}

                </h5>

                <span className="badge bg-success">

                    Verified Customer

                </span>

            </div>

            <hr />

            <div className="d-flex mb-3">

                <IconPhone
                    className="text-primary me-3"
                />

                <div>

                    <small className="text-muted d-block">

                        Phone

                    </small>

                    <div className="fw-semibold">

                        {customer.phone}

                    </div>

                </div>

            </div>

            <div className="d-flex mb-3">

                <IconIdBadge2
                    className="text-primary me-3"
                />

                <div>

                    <small className="text-muted d-block">

                        Driving Licence

                    </small>

                    <div className="fw-semibold">

                        {customer.licenseNo}

                    </div>

                </div>

            </div>

            <div className="d-flex mb-3">

                <IconCalendar
                    className="text-primary me-3"
                />

                <div>

                    <small className="text-muted d-block">

                        Licence Expiry

                    </small>

                    <div className="fw-semibold">

                        {customer.licenseExpiryDate}

                    </div>

                </div>

            </div>

            <div className="d-flex">

                <IconShieldCheck
                    className="text-primary me-3"
                />

                <div>

                    <small className="text-muted d-block">

                        Insurance Policy

                    </small>

                    <div className="fw-semibold">

                        {customer.insurancePolicyNo}

                    </div>

                </div>

            </div>

        </>

    );

}