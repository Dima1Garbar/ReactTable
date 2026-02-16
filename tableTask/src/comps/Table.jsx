import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Table ({products, onSort, sortColumn, sortOrder, selectedColumns, allColumns, onSelectedColumnsChange}){ 

    const [isOpen, setIsOpen] = useState(false);
    
    const navigate = useNavigate();

    return (
        <div>
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th style={{ position: "relative" }}>
                            <button onClick={() => setIsOpen(prev => !prev)}>
                                Columns ⚙
                            </button>

                            {isOpen && (
                                <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    background: "white",
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    zIndex: 1000
                                }}
                                >
                                {allColumns.map((column) => (
                                    <label key={column} style={{ display: "block" }}>
                                    <input
                                        type="checkbox"
                                        checked={!!selectedColumns[column]}
                                        onChange={(e) =>
                                        onSelectedColumnsChange(column, e.target.checked)
                                        }
                                    />
                                    {column}
                                    </label>
                                ))}
                                </div>
                            )}
                        </th>

                        {Object.keys(selectedColumns).map((key) => (
                            <th key={key}>
                                <button onClick={() => onSort(key)}>
                                    {key === "id"
                                        ? "Number"
                                        : key.startsWith("car_")
                                        ? key.split("_")[1].charAt(0).toUpperCase() + key.split("_")[1].slice(1)
                                        : key.includes("_")
                                        ? key
                                            .split("_")
                                            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                                            .join(" ")
                                        : key.charAt(0).toUpperCase() + key.slice(1)}
                                    {sortColumn === key && (sortOrder === "asc" ? " ↑" : " ↓")}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr 
                            key={p.id} 
                            onClick={() => navigate(`/products/${p.id}`)} 
                            style={{ cursor: "pointer" }}
                        >
                            <td onClick={(e) => e.stopPropagation()}>
                                <input type="checkbox" />
                            </td>

                            {Object.entries(p).map(([key, value]) => (
                                <td key={key}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
