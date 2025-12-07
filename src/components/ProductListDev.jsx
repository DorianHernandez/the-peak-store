import ProductCardDev from "./ProductCardDev";


export default function ProductListDev({ products }) {
  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCardDev key={p.id} product={p} />
      ))}
    </div>
  );
}