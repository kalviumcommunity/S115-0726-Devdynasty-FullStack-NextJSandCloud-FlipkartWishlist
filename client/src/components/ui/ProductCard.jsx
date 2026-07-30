import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StockBadge from "./StockBadge";
import { post } from "@/services/api";
import { showToast, handleApiError } from "@/utils/toast";

function ProductCard({ product, priority = false }) {
  const router = useRouter();
  const title = product.title || product.name || "Untitled product";
  const imageUrl = product.image || product.imageUrl || "https://via.placeholder.com/320x220?text=Flipkart";
  const price = typeof product.price === "number" ? product.price : Number(product.price || 0);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      showToast.error("Unauthorized access. Please log in.");
      router.push("/login");
      return;
    }
    if (product.stock === 0 || product.stock === "Out of stock") {
      showToast.error("This product is currently out of stock.");
      return;
    }
    try {
      await post("/api/cart", { productId: product.id, quantity: 1 });
      showToast.success("🛒 Product added to cart successfully!");
      window.dispatchEvent(new Event("cart_updated"));
    } catch (err) {
      handleApiError(err, "Failed to add product to cart.");
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      showToast.error("Unauthorized access. Please log in.");
      router.push("/login");
      return;
    }
    try {
      await post("/api/wishlist", { productId: product.id });
      showToast.success("❤️ Product added to wishlist successfully!");
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      handleApiError(err, "Failed to add product to wishlist.");
    }
  };

  return (
    <article className="product-card transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl">
      <div className="product-card-image-wrapper overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={320}
          height={220}
          className="product-card-image transition-transform duration-300 ease-in-out hover:scale-105"
          priority={priority}
        />
        <div className="product-card-badge">{product.category || "General"}</div>
      </div>
      <div className="product-card-body">
        <h3>{title}</h3>

        <p className="product-card-description">
          {product.description || "High-quality product ready to ship."}
        </p>

        <div className="product-card-meta">
          <p className="price">₹{price.toFixed(2)}</p>
          <StockBadge stock={product.stock ?? 0} />
        </div>

        <div className="product-card-actions">
          <Link href={`/product/${product.id}`} className="details-link transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-md">
            View details
          </Link>
          <div className="icon-row">
            <button
              type="button"
              className="icon-button transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 hover:text-primary hover:shadow-md"
              aria-label="Save to wishlist"
              onClick={handleAddToWishlist}
            >
              ♡
            </button>
            <button
              type="button"
              className="icon-button transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 hover:text-primary hover:shadow-md"
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
