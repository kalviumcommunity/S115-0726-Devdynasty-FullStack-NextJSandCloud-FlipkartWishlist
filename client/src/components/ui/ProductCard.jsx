import Link from "next/link";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-card-body">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">₹{product.price.toFixed(2)}</p>
        <Link to={`/products/${product.id}`} className="details-link">
          View details
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
