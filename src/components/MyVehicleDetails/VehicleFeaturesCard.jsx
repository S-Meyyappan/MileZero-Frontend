export default function VehicleFeaturesCard({
    features,
    selectedFeatureIds,
    onChange,
    disabled
}) {

    const toggleFeature = (featureId) => {
        if (selectedFeatureIds.includes(featureId)) {
            onChange(selectedFeatureIds.filter(id => id !== featureId))
        } else {
            onChange([
                ...selectedFeatureIds,
                featureId
            ])
        }
    }

    const groups = [ "SAFETY", "COMFORT","TECHNOLOGY" ]

    return (

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">
                <h5 className="fw-bold mb-4"> Features</h5>
                {groups.map(group => {

                    const groupFeatures = features.filter( feature => feature.featureGroup === group &&  feature.isActive)

                    if (groupFeatures.length === 0) {
                        return null
                    }

                    return (

                        <div key={group} className="mb-4">
                            <div className="text-muted small fw-semibold mb-2">{group}</div>

                            <div className="row g-2">

                                {groupFeatures.map(feature => (
                                    <div className="col-md-6"key={feature.id}>
                                        <div className="form-check">
                                            <input className="form-check-input"
                                                type="checkbox"
                                                id={`feature-${feature.id}`}
                                                checked={selectedFeatureIds.includes(feature.id)}
                                                onChange={() => toggleFeature(feature.id)}
                                                disabled={disabled}
                                            />
                                            <label className="form-check-label">{feature.name}</label>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            
                        </div>

                    );

                })}

            </div>

        </div>

    );
}