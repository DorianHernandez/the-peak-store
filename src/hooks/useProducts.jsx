import { useEffect, useState } from "react";
//import products from "../data/products";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Llamando al backend...");

    fetch(`${process.env.REACT_APP_BACKEND_URL}/operador/productos`)
      .then((response) => {
        console.log("Status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos del backend:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error en fetch:", error);
      });
  }, []);

  return products;
}
