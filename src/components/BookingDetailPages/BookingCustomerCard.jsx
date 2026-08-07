import {
    IconUser,
    IconPhone,
    IconCreditCard,
    IconCalendarEvent,
    IconShieldCheck
} from "@tabler/icons-react";

export default function BookingCustomerCard({ customer }) {

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    const fields = [
        {
            label: "Phone Number",
            value: customer?.phone,
            icon: <IconPhone size={20} className="text-primary" />
        },
        {
            label: "Driving Licence",
            value: customer?.licenseNo,
            icon: <IconCreditCard size={20} className="text-primary" />
        },
        {
            label: "Licence Expiry",
            value: formatDate(customer?.licenseExpiryDate),
            icon: <IconCalendarEvent size={20} className="text-primary" />
        },
        {
            label: "Insurance Policy",
            value: customer?.insurancePolicyNo,
            icon: <IconShieldCheck size={20} className="text-primary" />
        }
    ];

    return (

        <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4">

                <div className="d-flex align-items-center gap-3 mb-4">

                    <div
                        className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                            width: 60,
                            height: 60
                        }}
                    >
                        <IconUser
                            className="text-primary"
                            size={30}
                        />
                    </div>

                    <div>

                        <h5 className="fw-bold mb-1">

                            Customer Information

                        </h5>

                        <div className="fs-5 fw-semibold">

                            {customer?.name}

                        </div>

                    </div>

                </div>

                <div className="row g-4">

                    {

                        fields.map((field) => (

                            <div
                                className="col-md-6"
                                key={field.label}
                            >

                                <div className="border rounded-4 p-3 h-100">

                                    <div className="d-flex align-items-start">

                                        <div className="me-3">

                                            {field.icon}

                                        </div>

                                        <div>

                                            <small className="text-muted d-block">

                                                {field.label}

                                            </small>

                                            {

                                                field.value ? (

                                                    <div className="fw-semibold">

                                                        {field.value}

                                                    </div>

                                                ) : (

                                                    <span className="badge bg-secondary">

                                                        Not Available

                                                    </span>

                                                )

                                            }

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}