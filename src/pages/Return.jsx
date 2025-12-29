import React from "react";
import { useParams } from "react-router-dom";
//import products from "../data/products";
import useProducts from "../hooks/useProducts";
import "../styles/return.css";

export default function Return() {
  const { id } = useParams();
  const products = useProducts();
  const product = products.find((p) => p.id === Number(id));

  if (products.length === 0) {
    return (
      <div className="buy_page__charge">
        <p>Por favor espera un momento, estamos procesando su solicitud...</p>
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
    <section className="page__return">
      <h2 className="return__title">Solicitud de devolución iniciada</h2>
      <img className="return__img" src={product.image} alt={product.name} width={400} />
      <p className="return__product">{product.name}</p>
    </section>
  );
}
