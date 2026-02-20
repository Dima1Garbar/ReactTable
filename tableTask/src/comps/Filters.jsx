import { useState } from "react";

function Filters({ filters, onFilterChange, allColumns, onSelectedColumnsChange,  selectedColumns}) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="filters">
      <div className="filers__dropdownbox">
        <button className="btn btn-primary dropdown-toggle" onClick={() => setIsOpen(prev => !prev)}>
          Columns ⚙
        </button>

        {isOpen && (
          <div className="dropdown-menu show">
            {allColumns.map(column => (
              column !== "id" && column !== "car_model" && column !== "price" && (
                <label className="dropdown-item" key={column}>
                  <input
                    className="table-dropdown-menu__checkbox"
                    type="checkbox"
                    checked={!!selectedColumns[column]}
                    onChange={(e) => onSelectedColumnsChange(column, e.target.checked)}
                  />
                  {column.startsWith("car_")
                    ? column.split("_")[1].charAt(0).toUpperCase() + column.split("_")[1].slice(1)
                    : column.includes("_")
                    ? column
                        .split("_")
                        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                        .join(" ")
                    : column.charAt(0).toUpperCase() + column.slice(1)
                  }
                </label>
              )
            ))}
          </div>
        )}
      </div>
     

      {/* Search */}
      <input
        className="filter-input"
        type="text"
        placeholder="Search model..."
        value={filters.car_model_like}
        onChange={(e) => onFilterChange("car_model_like", e.target.value)}
      />

      {/* Transmission */}
      <select
        className="btn btn-primary dropdown-toggle"
        value={filters.transmission}
        onChange={(e) => onFilterChange("transmission", e.target.value)}
      >
        <option value="">All Transmissions</option>
        <option value="Automatic">Automatic</option>
        <option value="Manual">Manual</option>
      </select>

      {/* Fuel */}
      <select
        className="btn btn-primary dropdown-toggle"
        value={filters.fuel_type}
        onChange={(e) => onFilterChange("fuel_type", e.target.value)}
      >
        <option value="">All Fuel Types</option>
        <option value="Diesel">Diesel</option>
        <option value="Gasoline">Gasoline</option>
      </select>

      {/* Min price */}
      <input
        className="filter-input"
        type="number"
        placeholder="Min price"
        value={filters.price_gte || ""}
        onChange={(e) => onFilterChange("price_gte", e.target.value)}
      />

      {/* Max price */}
      <input
        className="filter-input"
        type="number"
        placeholder="Max price"
        value={filters.price_lte || ""}
        onChange={(e) => onFilterChange("price_lte", e.target.value)}
      />

    </section>
  );
}

export default Filters;
