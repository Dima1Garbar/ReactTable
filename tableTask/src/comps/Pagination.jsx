import { Pagination as AntPagination, Select } from "antd";

function Pagination({ currentPage, totalPages, pageLimit, onPageChange }) {

  const totalItems = totalPages; 

  return (
    <div className="pagination-box">
      
      <div>
        Rows per page:
        <Select
          value={pageLimit}
          onChange={(value) => onPageChange(value, 1)}
          options={[
            { value: 10, label: "10" },
            { value: 20, label: "20" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
        />
      </div>

      {/* Pagination */}
      <AntPagination
        current={currentPage}
        total={totalItems}
        pageSize={pageLimit}
        onChange={(page, pageSize) => {
          onPageChange(pageSize, page);
        }}
        showSizeChanger={false} 
      />
    </div>
  );
}

export default Pagination;
