const CategoryPricing = ({ category }) => {

    if (!category) return null;

    const pricingItems = (category) => [
        {
            label: "Base Price / Day",
            value: `₹${category.basePricePerDay.toFixed(2)}`
        },
        {
            label: "Base Price / Hour",
            value: `₹${category.basePricePerHour.toFixed(2)}`
        },
        {
            label: "Base Price / KM",
            value: `₹${category.basePricePerKm.toFixed(2)}`
        },
        {
            label: "Included KM / Day",
            value: `${category.includedKmPerDay} km`
        }
    ];

    return (
        <section className="container my-3">
            <h3 className="fw-bold mb-4">Category Pricing</h3>

            <div className="row g-3">
                {pricingItems(category).map((item) => (
                    <div
                        key={item.label}
                        className="col-12 col-sm-6 col-lg-3"
                    >
                        <div className="card h-100 border-0 shadow-sm rounded-4 pricing-card py-3">
                            <div className="card-body text-center py-4">
                                <p className="text-secondary mb-2 small">
                                    {item.label}
                                </p>

                                <h3 className="fw-bold mb-0">
                                    {item.value}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


export default CategoryPricing;