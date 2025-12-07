import { Link } from "react-router-dom";
import "../styles/productCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product_card">
      <br />
      <img className="product-card__img" src={product.image} alt={product.name} width={200} />
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">${product.price}</p>

      <Link to={`/product-detail/${product.id}`} className="product-card__link">
        Ver detalles
      </Link>
      <br />
      <br />
    </div>
  );
}
