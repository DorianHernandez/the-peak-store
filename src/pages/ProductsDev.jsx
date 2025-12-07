import React from "react";
import { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import SearchBar from "../components/SearchBar";
import ProductListDev from "../components/ProductListDev";
import "../styles/products.css";

export default function ProductsDev() {
    
  const allProducts = useProducts();     

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(allProducts);
    }, [allProducts]);

    const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = allProducts.filter((p) =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
    );

    setProducts(filtered);

  };

  return (
    <section className="page_products">
      <SearchBar onSearch={handleSearch} />
      <ProductListDev products={products} />
    </section>
  );
}