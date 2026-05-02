import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await getProducts();
    setProducts(data);
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} ({p.stock} in stock)
          </li>
        ))}
      </ul>
    </div>
  );
}
