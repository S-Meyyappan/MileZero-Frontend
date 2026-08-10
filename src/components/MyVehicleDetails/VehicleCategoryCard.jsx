export default function VehicleCategoryCard({
    form,
    categories,
    onChange,
    disabled
}) {

    const selectedCategory = categories.find(category => String(category.id) === String(form.categoryId))

    return (

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Vehicle Category</h5>

                <select className="form-select" value={form.categoryId}
                    disabled={disabled}
                    onChange={(e) => {
                        onChange({
                            ...form,
                            categoryId: e.target.value
                        });
                    }}
                >

                    <option value="">Select category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}

                </select>

                {selectedCategory && (
                    <div className="mt-3 text-muted small">
                        Pricing is determined by the selected category.
                    </div>
                )}

            </div>

        </div>

    );
}