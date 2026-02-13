
function Pagination ({currentPage, totalPages, pageLimit, onPageChange}){
    
    // generate row of pages
    function generatePages(currentPage, totalPages) {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
            }
            return pages;
        }

        // start
        if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) {
            pages.push(i);
            }

            if (totalPages > 5) {
            pages.push("...");
            pages.push(totalPages);
            }

            return pages;
        }

        // end
        if (currentPage > totalPages - 3) {
            pages.push(1);
            pages.push("...");

            for (let i = totalPages - 3; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        // middle
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);

        return pages;
        }



    return (
        <div>
            <label>
                Rows per page:
                <select
                    value={pageLimit}                     
                    onChange={(e) => {
                        onPageChange(Number(e.target.value), 1); 
                    }}
                >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                </select>
            </label>
            <div >
                {generatePages(currentPage, totalPages).map((page, index) => (
                  page === "..." ? (
                    <span key={`dots-${index}`}> ... </span>
                    ) : (
                    <button
                        key={`page-${page}`}
                        onClick={() => onPageChange(pageLimit, page)}
                        style={{
                        fontWeight: currentPage === page ? "bold" : "normal"
                        }}
                    >
                        {page}
                    </button>

                    )
                    ))}
            </div>
        </div>
    )
}

export default Pagination