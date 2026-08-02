function VehiclePagination({
    currentPage,
    pageData,
    onPageChange
}) {

    return (

        <nav className="mt-5">

            <ul className="pagination justify-content-center">

                {/* First */}
                <li className={`page-item ${ pageData?.first ? "disabled" : "" }`}>
                    <button className="page-link" onClick={() => onPageChange(0)}>
                        &laquo;
                    </button>
                </li>

                {/* Previous */}
                <li className={`page-item ${ pageData?.first ? "disabled" : "" }`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                        &lsaquo;
                    </button>
                </li>

                {/* Pages */}
                {[...Array(pageData?.totalPages)].map((_, index) => (
                    <li key={index} className={`page-item ${ currentPage === index ? "active" : "" }`}>
                        <button className="page-link" onClick={() => onPageChange(index)}>
                            {index + 1}
                        </button>
                    </li>
                ))}

                {/* Next */}
                <li className={`page-item ${ pageData?.last ? "disabled": "" }`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)} >
                        &rsaquo;
                    </button>
                </li>

                {/* Last Page */}
                <li className={`page-item ${ pageData?.last ? "disabled": "" }`}>
                    <button className="page-link" onClick={() => onPageChange(totalPages-1)} >
                        &raquo;
                    </button>
                </li>

            </ul>

        </nav>

    );

}

export default VehiclePagination;