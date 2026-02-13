function Filters({ filters, onFilterChange }) {

  return (
    <div >
      <input
        type="text"
        placeholder="Search title..."
        value={filters.car_model_like}
        onChange={(e) => onFilterChange("car_model_like", e.target.value)}
      />
      <select
        value={filters.transmission}
        onChange={(e) => onFilterChange("transmission", e.target.value)}
      >
        <option value="">All categories</option>
        <option value="Automatic">Automatic</option>
        <option value="Manual">Manual</option>
      </select>
       <select
        value={filters.fuel_type}
        onChange={(e) => onFilterChange("fuel_type", e.target.value)}
      >
        <option value="">All categories</option>
        <option value="Diesel">Diesel</option>
        <option value="Gasoline">Gasoline</option>
      </select>
      <input
        type="number"
        placeholder="Min price"
        value={filters.price_gte}
        onChange={(e) => onFilterChange("price_gte", e.target.value)}
      />
      <input
        type="number"
        placeholder="Max price"
        value={filters.price_lte}
        onChange={(e) => onFilterChange("price_lte", e.target.value)}
      />
    </div>
  );
}

export default Filters;
