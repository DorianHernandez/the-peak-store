import React from 'react';
import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import "../styles/productDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <section className="page_detail">
      <h2 className="detail__title">{product.name}</h2>
      <img className="detail__img" src={product.image} alt={product.name} width={400} />
      <p className="detail__price">${product.price}</p>
      <p className="detail__desc">{product.description}</p>

      <Link className="detail__buy" to={`/buy-details/${product.id}`}>Comprar</Link>
    </section>
  );
}
