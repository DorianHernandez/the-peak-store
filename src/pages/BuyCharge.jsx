import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import products from "../data/products";
import "../styles/buyCharge.css";

export default function StaticRedirectPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const navigate = useNavigate();
  const destinationUrl = `/buy/${product.id}`;
  const waitTime = 3000;

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate(destinationUrl);
    }, waitTime);
    return () => {
      clearTimeout(timerId);
    };
  }, [navigate, destinationUrl, waitTime]);

  return (
    <div className="buy_page__charge">
      <p>Por favor espera un momento, estamos procesando tu compra...</p>
      <p className="buy_page__product">{product.name}</p>
    </div>
  );
}
