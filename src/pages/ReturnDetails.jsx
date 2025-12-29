import React from "react";
import { useParams, } from "react-router-dom";
//import products from "../data/products";
import useProducts from "../hooks/useProducts";
import "../styles/returnDetail.css";

export default function ReturnDetails() {
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

  const handleNavigation = () => {
    window.location.href = `/return/${product.id}`;
  }

  return (
    <div className="page_return_details">
      <h2 className="return_details__title">Indique el motivo por el cual desea devolver el siguiente producto:</h2>
      <img className="return_details__img" src={product.image} alt={product.name} width={400} />
      <p className="return_details__product">{product.name}</p>
      <input className="return_details__input" type="text" placeholder="(Opcional)" />
      <button className="return_details__confirm" onClick={handleNavigation}>Confirmar devolución</button>
    </div>
  );
}
