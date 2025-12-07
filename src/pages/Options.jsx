import React from 'react';
import { Link } from "react-router-dom";
import '../styles/options.css';

export default function Options() {
  return (
    <section className="page_options">
      <h2 className="options__title">Elige lo que deseas realizar hoy</h2>
      <ul>
        <li><Link className="options__link" to={`/products`}>Ver productos</Link></li>
        <li><Link className="options__link" to={`/productsDev`}>Iniciar una devolución</Link></li>
      </ul>
    </section>
  );
}