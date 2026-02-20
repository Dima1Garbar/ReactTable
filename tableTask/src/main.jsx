import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import './styles/index.css'
import "./styles/app.css"
import App from './App.jsx'
import ProductDetails from "./pages/ProductDetails.jsx"
import NotFound from './pages/NotFound.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>  
  </StrictMode>
)
