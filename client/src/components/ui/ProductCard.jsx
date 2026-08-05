"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import StockBadge from "./StockBadge";
import { post } from "@/services/api";
import { showToast, handleApiError } from "@/utils/toast";

const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";

function ProductCard({ product, priority = false }) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(Boolean(product?.isWishlisted));
  const [isHeartBouncing, setIsHeartBouncing] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);
  const [imgSrc, setImgSrc] = useState(product?.image || product?.imageUrl || DEFAULT_FALLBACK_IMAGE);

  const title = product?.title || product?.name || "Untitled Product";
  const price = typeof product?.price === "number" ? product.price : Number(product?.price || 0);

  // Flipkart Price Bargain calculations
  const originalPrice = product?.originalPrice
    ? Number(product.originalPrice)
    : (price > 0 ? Math.round(price * 1.35) : 0);
  const discountPercent = product?.discount
    ? Number(product.discount)
    : (originalPrice > price && price > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  // Stock status
  const stockNum = typeof product?.stock === "number" ? product.stock : (product?.stock === "Out of stock" ? 0 : Number(product?.stock || 0));
  const isOutOfStock = stockNum === 0 || product?.stock === "Out of stock";

  // Rating fallback mock (4.2 - 4.9) based on product id
  const rating = product?.rating ? Number(product.rating) : Number((4.0 + (product?.id % 10) * 0.1).toFixed(1));
  const reviewCount = product?.reviews ? product.reviews : ((product?.id || 1) * 37 + 12);

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
      setIsAddingToCart(true);
      await post("/api/cart", { productId: product.id, quantity: 1 });
      setAddedToCartSuccess(true);
      showToast.success("🛒 Product added to cart successfully!");
      window.dispatchEvent(new Event("cart_updated"));
      setTimeout(() => setAddedToCartSuccess(false), 1500);
    } catch (err) {
      handleApiError(err, "Failed to add product to cart.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      showToast.error("Unauthorized access. Please log in.");
      router.push("/login");
      return;
    }

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
    <article className="product-card group">
      <div className="product-card-image-wrapper">
        <Image
          src={imgSrc}
          alt={title}
          width={320}
          height={220}
          onError={() => setImgSrc(DEFAULT_FALLBACK_IMAGE)}
          className={`product-card-image ${isOutOfStock ? "grayscale opacity-75 filter blur-[0.4px]" : ""}`}
          priority={priority}
        />
        <div className="product-card-shine" />
        <div className="product-card-badge">{product?.category || "General"}</div>

        {/* Rating Star Badge */}
        <div className="rating-badge" title={`${rating} stars out of 5 (${reviewCount} ratings)`}>
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {rating} <span>({reviewCount})</span>
        </div>

        {/* Out-of-Stock Visual Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] flex items-center justify-center z-10 p-2 pointer-events-none">
            <span className="bg-slate-900/90 text-red-400 font-extrabold text-xs tracking-wider uppercase py-1.5 px-4 rounded-md shadow-2xl border border-red-500/30 transform -rotate-6 backdrop-blur-md text-center">
              Temporarily Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="product-card-body">
        <div>
          <h3 className="product-card-title" title={title}>
            {title}
          </h3>
          <p className="product-card-description">
            {product?.description || "High-quality product ready for express delivery."}
          </p>
        </div>

        <div>
          <div className="product-card-meta">
            <div className="price-bargain-container">
              <span className="price">₹{price.toLocaleString("en-IN")}</span>
              {originalPrice > price && (
                <del className="text-xs text-slate-400 font-medium line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </del>
              )}
              {discountPercent > 0 && (
                <span className="discount-tag">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
            <StockBadge stock={product?.stock ?? 0} />
          </div>

          <div className="product-card-actions">
            <Link
              href={`/product/${product.id}`}
              className="details-link"
            >
              View details
            </Link>

            <div className="icon-row">
              {/* Wishlist Button */}
              <button
                type="button"
                className={`icon-button ${
                  isWishlisted ? "text-rose-500 border-rose-200 bg-rose-50/60" : "hover:text-rose-500 hover:bg-rose-50/30"
                }`}
                aria-label="Save to wishlist"
                onClick={handleAddToWishlist}
              >
                <Heart
                  size={19}
                  strokeWidth={1.8}
                  className={`transition-all duration-300 ${
                    isWishlisted ? "fill-rose-500 text-rose-500" : ""
                  } ${isHeartBouncing ? "animate-heart-bounce" : ""}`}
                />
              </button>

              {/* Add To Cart Button */}
              <button
                type="button"
                className={`icon-button ${
                  addedToCartSuccess ? "cart-button-success" : "hover:text-blue-600 hover:bg-blue-50/30"
                }`}
                aria-label="Add to cart"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
              >
                {addedToCartSuccess ? (
                  <Check size={19} className="text-emerald-600 stroke-[2.5]" />
                ) : (
                  <ShoppingCart size={19} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

