import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
        const res = await fetch(`http://localhost:3001/products/${id}`);
        const data = await res.json();
        setProduct(data);
    }

  useEffect(() => {   
    fetchProduct();
  }, [id]);

  return (
    <section className="details">
      <h1 className="details-title">Product Details</h1>
     {product && Object.keys(product).map((key) => (
      key === "id" ? null : (
      <p className="details__row"
        key={key}>
        {key.startsWith("car_")
            ? key.split("_")[1].charAt(0).toUpperCase() + key.split("_")[1].slice(1) + ": " + product[key]
            : key.includes("_")
            ? key
                .split("_")
                .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                .join(" ")
                + ": " + product[key]
            : key.charAt(0).toUpperCase() + key.slice(1) + ": " + product[key]}
      </p>
      )))}

      <Link
        className="btn btn-primary details__row" 
        to='/'>Go back</Link>
    </section>
  );
}