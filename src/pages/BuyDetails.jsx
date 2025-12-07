import { useParams, } from "react-router-dom";
import products from "../data/products";
import "../styles/buyDetails.css";

export default function BuyDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const handleNavigation = () => {
    window.location.href = `/buy-charge/${product.id}`;
  }

  return (
    <div className="page_buy_details">
      <h2 className="buy_details__title">Introduzca la información del metodo de pago para realizar la compra de:</h2>
      <p className="buy_details__product">{product.name}</p>
      <br></br>
      <p className="buy_details__info">Número de tarjeta:</p>
      <input className="buy_details__input" type="text" placeholder="" />
      <p className="buy_details__info">Fecha de vencimiento:</p>
      <input className="buy_details__input" type="text" placeholder="" />
      <p className="buy_details__info">CVV:</p>
      <input className="buy_details__input" type="text" placeholder="" />
      <button className="buy_details__confirm" onClick={handleNavigation}>Confirmar compra</button>
    </div>
  );
}