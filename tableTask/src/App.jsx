import { useEffect, useState } from 'react';
import Table from './comps/Table';
import Pagination from './comps/Pagination';
import Filters from './comps/Filters';
import 'antd/dist/reset.css';


function App() {
  const [selectedColumns, setSelectedColumns]  = useState({
    "id": true,
    "car_make": true,
    "car_year": true,
  });

  const [allColumns, setAllColumns] = useState([]);

  const [products, setProducts] = useState([]); 

  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [limitValues, setLimitValues] = useState(10);

  const [totalPages, setTotalPages] = useState(0); 
  
  const [filters, setFilters] = useState({
    car_model_like: "",
    transmission: "",
    fuel_type: "",
    price_gte: "",
    price_lte: "",
  });

// choose type of sort  ↑' or ' ↓'
  function handleSort (column){
      if (sortColumn === column){
          setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
      }
      else{
          setSortColumn(column);
          setSortOrder("asc");
      }
  }

  // get data from REST API
  async function productsList(){
    const params = new URLSearchParams({
      _page: currentPage,
      _limit: limitValues,
    });
    //add additional parameters to url
    if (sortColumn) {
        params.set('_sort', sortColumn);
        params.set('_order', sortOrder);
      }

    Object.entries(filters).forEach(([key, value]) => {
      if (value){
        params.set(key, value);
      }
    });
    
    const response = await fetch(`http://localhost:3001/products?${params.toString()}`);
    const data = await response.json();
    const total = response.headers.get('X-Total-Count');
    setTotalPages(Math.ceil(Number(total) / limitValues));
    const filteredData = [];
    for (let row of data){
      let rowData = {};
      for (let value of Object.keys(selectedColumns)){
        rowData[value] = row[value];
      }
      filteredData.push(rowData);
    }
    setAllColumns(Object.keys(data[0]));
    setProducts(filteredData);
  }

  //switch page 
  function onPageChange(limit, page){
    if (limit === limitValues){
      setCurrentPage(page)
    }
    else{
      setCurrentPage(1);
      setLimitValues(limit)
    }
  }

  // change rules of filters
  function handleFilterChange(field, value) {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  }

  function onSelectedColumnsChange(column, value){
    if (value){
      setSelectedColumns(prev => ({...prev, [column]: value}));
    }
    else{
      setSelectedColumns(prev => {
      const { [column]: removed, ...rest } = prev;
      return rest;
    });
    }
  }

  useEffect(() => {
      productsList()
    }, [sortColumn, sortOrder, limitValues, currentPage, filters, selectedColumns]);


  return (
    <div>
      <h1>Car Products</h1>
      <Pagination 
        pageLimit={limitValues}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <Filters filters={filters} onFilterChange={handleFilterChange} />      
      <Table 
        products={products} 
        onSort={handleSort} 
        sortColumn={sortColumn} 
        sortOrder={sortOrder} 
        selectedColumns={selectedColumns}
        allColumns={allColumns}
        onSelectedColumnsChange={onSelectedColumnsChange}
      />
     <Pagination 
        pageLimit={limitValues}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default App;
