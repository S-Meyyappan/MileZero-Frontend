function VehiclePagination({
    currentPage,
    totalPages,
    onPageChange
}) {

    if (totalPages <= 1) {

        return null;

    }

    return (

        <nav className="mt-5">

            <ul className="pagination justify-content-center">

                {/* Previous */}
                <li className={`page-item ${ currentPage === 0 ? "disabled" : "" }`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                        Previous
                    </button>
                </li>

                {/* Pages */}
                {[...Array(totalPages)].map((_, index) => (
                    <li key={index} className={`page-item ${ currentPage === index ? "active" : "" }`}>
                        <button className="page-link" onClick={() => onPageChange(index)}>
                            {index + 1}
                        </button>
                    </li>
                ))}

                {/* Next */}
                <li className={`page-item ${ currentPage === totalPages - 1 ? "disabled": "" }`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)} >
                        Next
                    </button>
                </li>

            </ul>

        </nav>

    );

}

export default VehiclePagination;