import {
    IconShieldCheck,
    IconCpu,
    IconStar,
    IconCircleCheckFilled
} from "@tabler/icons-react";

function VehicleFeatures({ features }) {

    console.log(features)

    const groupedFeatures = features?.reduce((groups, feature) => {

        const group = feature.featureGroup;

        if (!groups[group]) {

            groups[group] = [];

        }

        groups[group].push(feature);

        return groups;

    }, {});

    const getIcon = (group) => {

        switch (group) {

            case "SAFETY":
                return IconShieldCheck;

            case "TECHNOLOGY":
                return IconCpu;

            default:
                return IconStar;

        }

    };

    return (

        <section className="container mb-5">

            <div className="section-title mb-4">
                Features
            </div>

            <div className="row g-4">
                { groupedFeatures &&
                    Object.entries(groupedFeatures).map(([group, items]) => {
                        const Icon = getIcon(group);
                        return (

                            <div className="col-lg-6" key={group}>

                                <div className="card border-0 shadow-sm rounded-4 h-100">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center gap-2 mb-4">
                                            <Icon size={24} className="text-primary"/>
                                            <h5 className="mb-0 fw-bold">{group}</h5>
                                        </div>

                                        {

                                            items.map(feature => (

                                                <div key={feature.id} className="d-flex gap-3 mb-4">    
                                                    <IconCircleCheckFilled size={20} className="text-success mt-1 flex-shrink-0"/>
                                                    <div>
                                                        <div className="fw-semibold">{feature.name}</div>
                                                        <div className="text-secondary small">{feature.description}</div>
                                                    </div>
                                                </div>

                                            ))

                                        }

                                    </div>
                                </div>
                            </div>

                        );

                    })

                }

            </div>

        </section>

    );

}

export default VehicleFeatures;