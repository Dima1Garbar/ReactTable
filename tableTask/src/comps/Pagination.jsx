function Pagination ({currentPage, totalPages, pageLimit, onPageChange}) {
    
    function generatePages(currentPage, totalPages) {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        // start
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages);
            return pages;
        }

        // end
        if (currentPage > totalPages - 3) {
            pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            return pages;
        }

        // middle
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        return pages;
    }

    return (
        <section  className="pagination">
            <label className="pagination-dropdown">
                Rows per page:
                <select
                    className="btn btn-primary dropdown-toggle"
                    value={pageLimit}                     
                    onChange={(e) => onPageChange(Number(e.target.value), 1)}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </label>

            <div className="pagination-pages">
                {generatePages(currentPage, totalPages).map((page, index) =>
                    page === "..." ? (
                        <span className="page-link" key={`dots-${index}`}> ... </span>
                    ) : (
                        <button className="page-link"
                            key={`page-${page}`}
                            onClick={() => onPageChange(pageLimit, page)}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>
        </section>
    )
}

export default Pagination