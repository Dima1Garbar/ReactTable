import { Button, Table as AntTable, Checkbox, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

function Table({ products, selectedColumns, allColumns, onSelectedColumnsChange, onSort, sortColumn, sortOrder }) {
  const navigate = useNavigate();

  const columns = useMemo(() => {
    return [
    {
      title: (
        <Dropdown
          trigger={['click']}
          dropdownRender={() => (
            <div style={{ padding: 10, background: "white" }}>
              {allColumns.map(column => (
                <label key={column} style={{ display: "block" }}>
                  <Checkbox
                    checked={!!selectedColumns[column]}
                    onChange={(e) => onSelectedColumnsChange(column, e.target.checked)}
                  >
                    {column}
                  </Checkbox>
                </label>
              ))}
            </div>
          )}
        >
          <Button>Columns ⚙</Button>
        </Dropdown>
      ),
      key: "checkbox",
      render: () => <Checkbox />,
      width: 50,
      fixed: "left",
    },
    ...Object.keys(selectedColumns).map((key) => ({
      title: key === "id"
        ? "Number"
        : key.startsWith("car_")
          ? key.split("_")[1].charAt(0).toUpperCase() + key.split("_")[1].slice(1)
          : key.includes("_")
            ? key.split("_").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
            : key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key,
      sorter: true,
      sortOrder: sortColumn === key ? (sortOrder === "asc" ? "ascend" : "descend") : null,
      onCell: (record) => ({
        onClick: () => navigate(`/products/${record.id}`),
        style: { cursor: "pointer" },
      }),
    }))
  ];
  }, [selectedColumns, sortColumn, sortOrder]) 

  return (
    <AntTable
      columns={columns}
      dataSource={products}
      rowKey="id"
      pagination={false}
      scroll={{ x: "max-content" }}
      onChange={(pagination, filters, sorter) => {
        if (sorter.field) {
            onSort(sorter.field);
        }
      }}
    />
  );
}

export default Table;
