"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

import StockBadge from "./StockBadge";
import { post } from "@/services/api";
import { showToast, handleApiError } from "@/utils/toast";

function ProductCard({ product, priority = false }) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(Boolean(product?.isWishlisted));
  const [isHeartBouncing, setIsHeartBouncing] = useState(false);

  const title = product?.title || product?.name || "Untitled product";
  const imageUrl = product?.image || product?.imageUrl || "https://via.placeholder.com/320x220?text=Flipkart";
  const price = typeof product?.price === "number" ? product.price : Number(product?.price || 0);

  // Flipkart Price Bargain calculations
  const originalPrice = product?.originalPrice 
    ? Number(product.originalPrice) 
    : (price > 0 ? Math.round(price * 1.4) : 0);
  const discountPercent = product?.discount 
    ? Number(product.discount) 
    : (originalPrice > price && price > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  // Stock status
  const stockNum = typeof product?.stock === "number" ? product.stock : (product?.stock === "Out of stock" ? 0 : Number(product?.stock || 0));
  const isOutOfStock = stockNum === 0 || product?.stock === "Out of stock";

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      showToast.error("Unauthorized access. Please log in.");
      router.push("/login");
      return;
    }
    if (isOutOfStock) {
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

    // Trigger Heart-Beat burst & elastic bounce micro-animation
    setIsWishlisted(true);
    setIsHeartBouncing(true);
    setTimeout(() => setIsHeartBouncing(false), 600);

    try {
      await post("/api/wishlist", { productId: product.id });
      showToast.success("❤️ Product added to wishlist successfully!");
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      handleApiError(err, "Failed to add product to wishlist.");
    }
  };

  return (
    <article className="product-card transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl relative flex flex-col justify-between">
      <div className="product-card-image-wrapper overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={title}
          width={320}
          height={220}
          className={`product-card-image transition-all duration-300 ease-in-out hover:scale-105 ${
            isOutOfStock ? "grayscale opacity-75 filter blur-[0.4px]" : ""
          }`}
          priority={priority}
        />
        <div className="product-card-badge">{product?.category || "General"}</div>
        
        {/* Out-of-Stock Visual Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center z-10 p-2 pointer-events-none">
            <span className="bg-slate-900/90 text-red-400 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase py-1.5 px-4 rounded shadow-2xl border border-red-500/30 transform -rotate-12 backdrop-blur-md text-center">
              Temporarily Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="product-card-body flex-1 flex flex-col justify-between">
        <div>
          <h3>{title}</h3>
          <p className="product-card-description">
            {product?.description || "High-quality product ready to ship."}
          </p>
        </div>

        <div>
          {/* E-Commerce Price Bargain Styling */}
          <div className="product-card-meta flex flex-wrap items-center justify-between gap-2 my-3">
            <div className="price-bargain-container flex items-baseline gap-1.5 flex-wrap">
              <span className="price font-extrabold text-lg text-slate-900">
                ₹{price.toLocaleString("en-IN")}
              </span>
              {originalPrice > price && (
                <del className="text-xs text-slate-400 font-medium line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </del>
              )}
              {discountPercent > 0 && (
                <span className="discount-tag text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                  ({discountPercent}% OFF)
                </span>
              )}
            </div>
            <StockBadge stock={product?.stock ?? 0} />
          </div>

          <div className="product-card-actions">
            <Link
              href={`/product/${product.id}`}
              className="details-link transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-md"
            >
              View details
            </Link>
            <div className="icon-row">
              {/* Heart-Beat Wishlist Button */}
              <button
                type="button"
                className={`icon-button transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 hover:shadow-md ${
                  isWishlisted ? "text-rose-500 border-rose-200 bg-rose-50/50" : "hover:text-rose-500"
                }`}
                aria-label="Save to wishlist"
                onClick={handleAddToWishlist}
              >
                <Heart
                  size={20}
                  strokeWidth={1.75}
                  className={`transition-all duration-300 ${
                    isWishlisted ? "fill-rose-500 text-rose-500" : ""
                  } ${isHeartBouncing ? "animate-heart-bounce" : ""}`}
                />
              </button>
              <button
                type="button"
                className="icon-button transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 hover:text-primary hover:shadow-md"
                aria-label="Add to cart"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                <ShoppingCart size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
