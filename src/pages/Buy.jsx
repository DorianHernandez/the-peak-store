import React from "react";
import { useParams, Link } from "react-router-dom";
//import products from "../data/products";
import useProducts from "../hooks/useProducts";
import "../styles/buy.css";

export default function Buy() {
  const { id } = useParams();
  const products = useProducts();
  const product = products.find((p) => p.id === Number(id));

  if (products.length === 0) {
    return (
      <div className="buy_page__charge">
        <p>Por favor espera un momento, seguimos procesando su compra...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="buy_page__charge">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  return (
    <section className="page_buy">
      <h2 className="buy__title">Compra realizada</h2>
      <img className="buy__img" src={product.image} alt={product.name} width={400} />
      <p className="buy__product">{product.name}</p>
      
      <Link to="/products" className="buy__back-link">
        Seguir comprando
      </Link>
    </section>
  );
}
