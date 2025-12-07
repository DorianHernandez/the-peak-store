import { useEffect, useState } from "react";
import products from "../data/products";

export default function useProducts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData(products);
    }, 400);
  }, []);

  return data;
}