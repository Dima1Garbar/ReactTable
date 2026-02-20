import { useEffect, useState } from 'react';
import Pagination from './comps/Pagination';
import Filters from './comps/Filters';
import Table from './comps/Table';


function App() {

  const [selectedCheckBoxes, setSelectedCheckBoxes] = useState({})
  const [allColumns, setAllColumns] = useState([]);
  const [products, setProducts] = useState([]); 
  const [sort, setSort] = useState({
    column: "",
    order: "asc",
  });
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
  const [selectedColumns, setSelectedColumns]  = useState({
    "id": true,
    "car_make": true,
    "car_model": true,
    "car_year": true,
    "price": true,
  });


  // choose type of sort  ↑' or ' ↓'
  function handleSort(column) {
    setSort(prev => {
      if (prev.column === column) {
        return {
          ...prev,
          order: prev.order === "asc" ? "desc" : "asc",
        };
      }
      return {
        column,
        order: "asc",
      };
    });
  }



  // get data from REST API
  async function productsList(){
    const params = new URLSearchParams({
      _page: currentPage,
      _limit: limitValues,
    });
    //add additional parameters to url
    if (sort.column) {
        params.set('_sort', sort.column);
        params.set('_order', sort.order);
      }
    //add additional filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value){
        params.set(key, value);
      }
    });
    
    const response = await fetch(`http://localhost:3001/products?${params.toString()}`);
    const data = await response.json();
    const total = response.headers.get('X-Total-Count');
    setTotalPages(Math.ceil(Number(total)/limitValues));
    // add columns that are selected 
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

  // add or remove selected columns on table
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
  // add or remove selected checkboxes
  function onSelectedCheckBoxesChange(id){
    setSelectedCheckBoxes(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  useEffect(() => {
      productsList()
    }, [sort, limitValues, currentPage, filters, selectedColumns]);


  return (
    <main className='content'>
      <h1 className='content-head'>Car Products</h1>
      <Pagination 
        pageLimit={limitValues}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <Filters 
        filters={filters}
        onFilterChange={handleFilterChange}
        allColumns={allColumns}
        onSelectedColumnsChange={onSelectedColumnsChange}
        selectedColumns={selectedColumns}

 />      
      <Table
        products={products}
        selectedColumns={selectedColumns}
        sortColumn={sort.column}
        sortOrder={sort.order}
        onSort={handleSort}
        selectedCheckBoxes={selectedCheckBoxes}
        onSelectedCheckBoxesChange={onSelectedCheckBoxesChange}
      />

     <Pagination 
        pageLimit={limitValues}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </main>
  );
}

export default App;