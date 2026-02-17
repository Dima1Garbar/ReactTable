import { Input, Select, InputNumber, Space } from "antd";

function Filters({ filters, onFilterChange }) {

  return (
    <Space className="filters">

      {/* Search */}
      <Input
        placeholder="Search title..."
        value={filters.car_model_like}
        onChange={(e) =>
          onFilterChange("car_model_like", e.target.value)
        }
      />

      {/* Transmission */}
      <Select
        value={filters.transmission || undefined}
        placeholder="Transmission"
        onChange={(value) =>
          onFilterChange("transmission", value)
        }
        options={[
          { value: "Automatic", label: "Automatic" },
          { value: "Manual", label: "Manual" },
        ]}
      />

      {/* Fuel */}
      <Select
        value={filters.fuel_type || undefined}
        placeholder="Fuel type"
        onChange={(value) =>
          onFilterChange("fuel_type", value)
        }
        options={[
          { value: "Diesel", label: "Diesel" },
          { value: "Gasoline", label: "Gasoline" },
        ]}
      />

      {/* Min price */}
      <InputNumber
        placeholder="Min price"
        value={filters.price_gte || null}
        onChange={(value) =>
          onFilterChange("price_gte", value)
        }
      />

      {/* Max price */}
      <InputNumber
        placeholder="Max price"
        value={filters.price_lte || null}
        onChange={(value) =>
          onFilterChange("price_lte", value)
        }
      />

    </Space>
  );
}

export default Filters;
