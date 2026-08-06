"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, BadgePercent, Check } from "lucide-react";
import StockBadge from "./StockBadge";
import ProductGallery from "./ProductGallery";
import { post } from "@/services/api";
import { showToast, handleApiError } from "@/utils/toast";

const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";

function ProductDetails({ product }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(Boolean(product?.isWishlisted));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, []);

  const title = product?.title || product?.name || "Untitled Product";
  const imageUrl = product?.image || product?.imageUrl || DEFAULT_FALLBACK_IMAGE;
  const price = typeof product?.price === "number" ? product.price : Number(product?.price || 0);

  // Price bargain math
  const originalPrice = product?.originalPrice
    ? Number(product.originalPrice)
    : (price > 0 ? Math.round(price * 1.35) : 0);
  const discountPercent = product?.discount
    ? Number(product.discount)
    : (originalPrice > price && price > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);
  const totalSaved = originalPrice > price ? originalPrice - price : 0;

  // Rating fallback mock (4.2 - 4.9) based on product id
  const rating = product?.rating ? Number(product.rating) : Number((4.0 + ((product?.id || 1) % 10) * 0.1).toFixed(1));
  const reviewCount = product?.reviews ? product.reviews : (((product?.id || 1) * 37) + 12);

  const stockNum = typeof product?.stock === "number" ? product.stock : (product?.stock === "Out of stock" ? 0 : Number(product?.stock || 0));
  const isOutOfStock = stockNum === 0 || product?.stock === "Out of stock";

  const imageGallery = useMemo(() => {
    if (Array.isArray(product?.images) && product.images.length > 0) {
      return product.images;
    }
    if (product?.image) {
      return [product.image, imageUrl];
    }
    if (product?.imageUrl) {
      return [product.imageUrl];
    }
    return [imageUrl];
  }, [product, imageUrl]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showToast.error("Unauthorized access. Please log in.");
      router.push("/login");
      return;
    }
    if (isOutOfStock) {
      showToast.error("This product is currently out of stock.");
      return;
    }
    setActionLoading(true);
    try {
      await post("/api/cart", { productId: product.id, quantity: 1 });
      setCartSuccess(true);
      showToast.success("🛒 Product added to cart successfully!");
      window.dispatchEvent(new Event("cart_updated"));
      setTimeout(() => setCartSuccess(false), 2000);
    } catch (err) {
      handleApiError(err, "Failed to add product to cart.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      showToast.error("Unauthorized access. Please log in.");
      router.push("/login");
      return;
    }
    setActionLoading(true);
    try {
      await post("/api/wishlist", { productId: product.id });
      setIsWishlisted(true);
      showToast.success("❤️ Product added to wishlist successfully!");
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      handleApiError(err, "Failed to add product to wishlist.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <article className="product-details-card">
      <div className="product-details-gallery">
        <ProductGallery
          images={imageGallery}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />
      </div>

      <div className="product-details-copy">
        <div className="product-details-header">
          <div className="product-category-stock">
            <div className="flex items-center gap-2">
              <span className="product-category-tag">{product.category || "General"}</span>
              <div className="rating-pill flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {rating} <span className="text-slate-500 font-normal">({reviewCount} reviews)</span>
              </div>
            </div>
            <StockBadge stock={product.stock ?? 0} />
          </div>

          <h1 className="product-title">{title}</h1>
          
          <p className="product-description">
            {product.description || "High-performance authentic item with manufacturer guarantee and express shipping availability."}
          </p>
        </div>

        {/* E-Commerce Price Bargain Highlight */}
        <div className="price-bargain-box">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="main-price text-3xl font-extrabold text-slate-900">
              ₹{price.toLocaleString("en-IN")}
            </span>
            {originalPrice > price && (
              <del className="text-sm font-semibold text-slate-400 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </del>
            )}
            {discountPercent > 0 && (
              <span className="discount-pill text-xs font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          {totalSaved > 0 && (
            <p className="text-xs font-bold text-emerald-600 mt-1.5 flex items-center gap-1">
              <BadgePercent size={14} /> You save ₹{totalSaved.toLocaleString("en-IN")} on this item!
            </p>
          )}
        </div>

        {/* Service Guarantee Highlights */}
        <div className="services-grid">
          <div className="service-item">
            <Truck size={18} className="text-blue-600" />
            <div>
              <p className="service-title">Express Delivery</p>
              <p className="service-sub">Dispatched in 24 hours</p>
            </div>
          </div>
          <div className="service-item">
            <RotateCcw size={18} className="text-emerald-600" />
            <div>
              <p className="service-title">7-Day Returns</p>
              <p className="service-sub">Hassle-free replacement</p>
            </div>
          </div>
          <div className="service-item">
            <ShieldCheck size={18} className="text-indigo-600" />
            <div>
              <p className="service-title">1-Year Warranty</p>
              <p className="service-sub">100% genuine guarantee</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            type="button"
            className={`btn-primary flex items-center justify-center gap-2 ${
              cartSuccess ? "bg-emerald-600 hover:bg-emerald-700" : ""
            }`}
            onClick={handleAddToCart}
            disabled={actionLoading || isOutOfStock}
          >
            {cartSuccess ? (
              <>
                <Check size={18} /> Added to Cart!
              </>
            ) : isOutOfStock ? (
              "Temporarily Unavailable"
            ) : (
              <>
                <ShoppingCart size={18} /> {isAuthenticated ? "Add to Cart" : "Login to Buy"}
              </>
            )}
          </button>

          <button
            type="button"
            className={`btn-secondary flex items-center justify-center gap-2 ${
              isWishlisted ? "text-rose-600 border-rose-200 bg-rose-50" : ""
            }`}
            onClick={handleAddToWishlist}
            disabled={actionLoading}
          >
            <Heart size={18} className={isWishlisted ? "fill-rose-500 text-rose-500" : ""} />
            {isWishlisted ? "Wishlisted" : (isAuthenticated ? "Add to Wishlist" : "Login for Wishlist")}
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-details-card {
          display: grid;
          gap: 36px;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          background: #ffffff;
          border-radius: 24px;
          padding: 32px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.06);
        }

        .product-details-copy {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .product-details-header {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .product-category-stock {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .product-category-tag {
          background: #eff6ff;
          color: #2563eb;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .product-title {
          margin: 0;
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.2;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .product-description {
          margin: 0;
          color: #475569;
          line-height: 1.65;
          font-size: 0.95rem;
        }

        .price-bargain-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px 20px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 14px;
        }

        .service-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .service-title {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .service-sub {
          font-size: 10px;
          color: #64748b;
          margin: 0;
        }

        .product-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: auto;
        }

        .btn-primary,
        .btn-secondary {
          border: none;
          border-radius: 999px;
          padding: 14px 24px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary {
          background: #fb641b;
          color: #ffffff;
          flex: 1 1 200px;
          box-shadow: 0 4px 14px rgba(251, 100, 27, 0.25);
        }

        .btn-secondary {
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #e2e8f0;
          flex: 1 1 200px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          background: #e65100;
          box-shadow: 0 8px 20px rgba(251, 100, 27, 0.35);
        }

        .btn-secondary:hover:not(:disabled) {
          transform: translateY(-2px);
          border-color: #cbd5e1;
          background: #f8fafc;
        }

        .btn-primary:disabled,
        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }

        @media (max-width: 900px) {
          .product-details-card {
            grid-template-columns: 1fr;
            padding: 20px;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </article>
  );
}

export default ProductDetails;

