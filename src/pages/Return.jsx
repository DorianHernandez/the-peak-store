import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import "../styles/return.css";

export default function Return() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  return (
    <section className="page__return">
      <h2 className="return__title">Solicitud de devolución iniciada</h2>
      <img className="return__img" src={product.image} alt={product.name} width={400} />
      <p className="return__product">{product.name}</p>
    </section>
  );
}