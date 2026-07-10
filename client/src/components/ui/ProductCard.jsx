import Image from "next/image";
import Link from "next/link";
import StockBadge from "./StockBadge";

function ProductCard({ product }) {
  const title = product.title || product.name || "Untitled product";
  const imageUrl = product.image || product.imageUrl || "https://via.placeholder.com/320x220?text=Flipkart";
  const price = typeof product.price === "number" ? product.price : Number(product.price || 0);

  return (
    <article className="product-card">
      <Image
        src={imageUrl}
        alt={title}
        width={320}
        height={220}
        className="product-card-image"
      />
      <div className="product-card-body">
        <div className="product-card-header">
          <h3>{title}</h3>
          <span className="product-card-category">{product.category || "General"}</span>
        </div>

        <p className="product-card-description">
          {product.description || "High-quality product ready to ship."}
        </p>

        <div className="product-card-meta">
          <p className="price">₹{price.toFixed(2)}</p>
          <StockBadge stock={product.stock ?? 0} />
        </div>

        <div className="product-card-actions">
          <Link href={`/product/${product.id}`} className="details-link">
            View details
          </Link>
          <div className="icon-row">
            <button type="button" className="icon-button" aria-label="Save to wishlist">
              ♡
            </button>
            <button type="button" className="icon-button" aria-label="Add to cart">
              🛒
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
