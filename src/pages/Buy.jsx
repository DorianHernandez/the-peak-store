import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import "../styles/buy.css";

export default function Buy() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  return (
    <section className="page_buy">
      <h2 className="buy__title">Compra realizada</h2>
      <img className="buy__img" src={product.image} alt={product.name} width={400} />
      <p className="buy__product">{product.name}</p>
    </section>
  );
}