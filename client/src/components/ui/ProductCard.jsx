import Link from "next/link";
import StockBadge from "./StockBadge";
import { post } from "@/services/api";

function ProductCard({ product }) {
  const title = product.title || product.name || "Untitled product";
  const imageUrl = product.image || product.imageUrl || "https://via.placeholder.com/320x220?text=Flipkart";
  const price = typeof product.price === "number" ? product.price : Number(product.price || 0);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await post("/api/cart", { productId: product.id, quantity: 1 });
      alert("🛒 Product added to cart successfully!");
    } catch (err) {
      alert(err.message || "Failed to add product to cart. Please log in.");
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    try {
      await post("/api/wishlist", { productId: product.id });
      alert("❤️ Product added to wishlist successfully!");
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      alert(err.message || "Failed to add product to wishlist. Please log in.");
    }
  };

  return (
    <article className="product-card">
      <img
        src={imageUrl}
        alt={title}
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
            <button
              type="button"
              className="icon-button"
              aria-label="Save to wishlist"
              onClick={handleAddToWishlist}
            >
              ♡
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label="Add to cart"
              onClick={handleAddToCart}
            >
              🛒
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
