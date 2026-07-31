import {
    IconCash,
    IconShieldCheck,
    IconMapPin,
    IconHeadset,
} from "@tabler/icons-react";

const features = [
    {
        icon: IconCash,
        title: "Transparent Pricing",
        description:
            "No hidden charges. What you see is exactly what you pay.",
    },
    {
        icon: IconShieldCheck,
        title: "Verified Vehicles",
        description:
            "Every vehicle is inspected and maintained for a safe journey.",
    },
    {
        icon: IconMapPin,
        title: "Flexible Pickup",
        description:
            "Choose convenient pickup and drop locations across the city.",
    },
    {
        icon: IconHeadset,
        title: "24/7 Support",
        description:
            "Our team is available anytime to help you during your trip.",
    },
];

function WhyChoose() {
    return (
        <section className="py-5">

            <div className="container">

                <div className="text-center mb-5">

                    <div className="section-title mb-2">
                        Why Choose MileZero?
                    </div>

                    <p className="body text-secondary mb-0">
                        Everything you need for a smooth and reliable rental
                        experience.
                    </p>

                </div>

                <div className="row g-4">

                    {features.map((feature, index) => {

                        const Icon = feature.icon;

                        return (

                            <div
                                className="col-md-6 col-lg-3"
                                key={index}
                            >

                                <div className="card why-card h-100 border-0 shadow-sm text-center">

                                    <div className="card-body p-4">

                                        <div className="why-icon rounded-circle d-inline-flex justify-content-center align-items-center mb-4">

                                            <Icon size={30} />

                                        </div>

                                        <div className="card-title mb-2">

                                            {feature.title}

                                        </div>

                                        <p className="text-secondary mb-0">

                                            {feature.description}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default WhyChoose;