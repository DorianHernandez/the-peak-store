import { Link } from "react-router-dom";
import "../styles/productCard.css";

export default function ProductCardDev({ product }) {
  return (
    <div className="product_card">
      <br />
      <img className="product-card__img" src={product.image} alt={product.name} width={200} />
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">${product.price}</p>

      <Link to={`/return-details/${product.id}`} className="product-card__link">
        Deseo devolver este producto
      </Link>
      <br />
    </div>
  );
}