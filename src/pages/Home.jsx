import React from 'react';
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <section className="page_home">
      <h2 className="home__title">Bienvenido a The Peak Store</h2>
      <p className="home__text">Tu tienda online de productos de deportes premium.</p>
      <Link className="home_init" to={`/options`}>Empieza tu historia dando click</Link>
    </section>
  );
}