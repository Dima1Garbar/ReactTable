import { useNavigate } from "react-router-dom";

function Table ({products, onSort, sortColumn, sortOrder, tableList}){ 
   
    const navigate = useNavigate();

    return (
        <div>
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        {Object.entries(tableList).map(([key, label]) => (
                            <th key={key}>
                                <button onClick={() => onSort(key)}>
                                {label}
                                {sortColumn === key && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                                </button>
                            </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id} onClick={() => navigate(`/products/${p.id}`)} style={{ cursor: "pointer" }}>
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

export default Table