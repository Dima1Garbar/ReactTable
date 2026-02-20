import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState, useEffect } from "react";

function Table({ products, onSort, sortColumn, sortOrder, selectedColumns, selectedCheckBoxes, onSelectedCheckBoxesChange }) {
  const navigate = useNavigate();
  const rowRefs = useRef([]);
  const [rowHeight, setRowHeight] = useState(0);

  // check height of row after render
  useEffect(() => {
    if (rowRefs.current[0]) {
      setRowHeight(rowRefs.current[0].offsetHeight);
    }
  }, [products]);

  // sort selected checkboxes
  const sortedSelectedIds = useMemo(() => {
    return Object.keys(selectedCheckBoxes)
      .map(id => Number(id))
      .sort((a, b) => a - b);
  }, [selectedCheckBoxes]);

  return (
    <section className="table">
      <table className="table-box">
        <thead className="table-head">
          <tr>
            <th className="table-emptycolumn" />
              {Object.keys(selectedColumns).map((key) => (
                <th className="table-column" key={key}>
                  <button className="btn btn-primary table-column__button" onClick={() => onSort(key)}>
                    {key === "id"
                      ? "Number"
                      : key.startsWith("car_")
                        ? key.split("_")[1].charAt(0).toUpperCase() + key.split("_")[1].slice(1)
                        : key.includes("_")
                          ? key.split("_").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
                          : key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortColumn === key && (sortOrder === "asc" ? " ↑" : " ↓")}
                  </button>
                </th>
            ))}
          </tr>
        </thead>

        <tbody className="table-body">
          {products.map((p, i) => {
            const isSticky = !!selectedCheckBoxes[p.id];
            const index = sortedSelectedIds.indexOf(p.id);

            return (
              <tr
                key={p.id}
                ref={(el) => (rowRefs.current[i] = el)}
                className="table-body__row"
                onClick={() => navigate(`/products/${p.id}`)}
              >
                <td
                  className={`table-body__components ${isSticky ? "table-checkbox__sticky" : ""}`}
                  style={isSticky ? { top: index * rowHeight } : {}}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectedCheckBoxesChange(p.id);
                  }}
                >
                  <input type="checkbox" checked={isSticky} readOnly />
                </td>

                {Object.entries(p).map(([key, value]) => (
                  <td
                    key={key}
                    className={`table-body__components ${isSticky ? "table-checkbox__sticky" : ""}`}
                    style={isSticky ? { top: index * rowHeight } : {}}

                  >
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
