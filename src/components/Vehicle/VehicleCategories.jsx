function VehicleCategories({
    categories,
    selectedCategory,
    setSelectedCategory
}) {

    return (

        <section className="mb-4">

            <div className="d-flex gap-2 overflow-auto pb-2 category-scroll">

                {categories.map((category) => {

                    const Icon = category.icon;

                    const active =
                        selectedCategory === category.name;

                    return (

                        <button
                            key={category.id}
                            type="button"
                            className={`btn rounded-pill d-flex align-items-center gap-2 px-4 py-2 category-btn ${
                                active
                                    ? "btn-primary"
                                    : "btn-light"
                            }`}
                            onClick={() =>
                                setSelectedCategory(category.name)
                            }
                        >

                            <Icon size={18} />

                            {category.name}

                        </button>

                    );

                })}

            </div>

        </section>

    );

}

export default VehicleCategories;