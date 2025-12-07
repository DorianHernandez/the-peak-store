import { useParams, } from "react-router-dom";
import products from "../data/products";
import "../styles/returnDetail.css";

export default function ReturnDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
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