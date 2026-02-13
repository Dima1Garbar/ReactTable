import { useParams } from "react-router-dom";
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
    <div>
      {product && Object.entries(product).map(([key, value]) => (
            key === "id" ? null :
                <p key={key}>{value}</p>            
            ))}
    </div>
  );
}
