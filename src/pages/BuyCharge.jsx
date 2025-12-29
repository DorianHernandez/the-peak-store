import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import products from "../data/products";
import useProducts from "../hooks/useProducts";
import "../styles/buyCharge.css";

export default function StaticRedirectPage() {
  const { id } = useParams();
  const products = useProducts();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));
  const destinationUrl = product ? `/buy/${product.id}` : null;
  const waitTime = 3000;

  useEffect(() => {
    if (destinationUrl) {
      const timerId = setTimeout(() => {
        navigate(destinationUrl);
      }, waitTime);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [navigate, destinationUrl, waitTime]);

  if (products.length === 0) {
    return (
      <div className="buy_page__charge">
        <p>Por favor espera un momento, estamos procesando tu compra...</p>
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
    <div className="buy_page__charge">
      <p>Por favor espera un momento, estamos procesando tu compra...</p>
      <p className="buy_page__product">{product.name}</p>
    </div>
  );
}
