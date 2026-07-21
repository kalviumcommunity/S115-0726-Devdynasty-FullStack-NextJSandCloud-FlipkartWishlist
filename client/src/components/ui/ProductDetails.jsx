"use client";

import { useMemo, useState, useEffect } from "react";
import StockBadge from "./StockBadge";
import ProductGallery from "./ProductGallery";
import { post } from "@/services/api";
import { showToast } from "@/utils/toast";

function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, []);

  const title = product.title || product.name || "Untitled product";
  const imageUrl = product.image || product.imageUrl || "https://via.placeholder.com/800x600?text=Flipkart";
  const price = typeof product.price === "number" ? product.price : Number(product.price || 0);

  const imageGallery = useMemo(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    if (product.image) {
      return [product.image, imageUrl];
    }
    if (product.imageUrl) {
      return [product.imageUrl];
    }
    return [imageUrl];
  }, [product, imageUrl]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    setActionLoading(true);
    try {
      await post("/api/cart", { productId: product.id, quantity: 1 });
      showToast.success("🛒 Product added to cart successfully!");
    } catch (err) {
      if (err.message?.includes("401") || err.message?.toLowerCase().includes("unauthorized")) {
        window.location.href = "/login";
      } else {
        showToast.error(err.message || "Failed to add product to cart. Please log in.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    setActionLoading(true);
    try {
      await post("/api/wishlist", { productId: product.id });
      showToast.success("❤️ Product added to wishlist successfully!");
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      if (err.message?.includes("401") || err.message?.toLowerCase().includes("unauthorized")) {
        window.location.href = "/login";
      } else {
        showToast.error(err.message || "Failed to add product to wishlist. Please log in.");
      }
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
            <span className="product-category-tag">{product.category || "General"}</span>
            <StockBadge stock={product.stock ?? 0} />
          </div>
          <h1>{title}</h1>
          <p className="product-description">{product.description || "No description available."}</p>
        </div>

        <div className="product-details-meta">
          <div>
            <p className="label">Price</p>
            <p className="price">₹{price.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="label">Category</p>
            <p className="meta-value">{product.category || "General"}</p>
          </div>
        </div>

        <div className="product-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handleAddToCart}
            disabled={actionLoading || product.stock === 0}
          >
            {product.stock === 0 ? "Out of stock" : (isAuthenticated ? "Add to Cart" : "Login to Add to Cart")}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleAddToWishlist}
            disabled={actionLoading}
          >
            {isAuthenticated ? "Add to Wishlist" : "Login to Wishlist"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-details-card {
          display: grid;
          gap: 32px;
          grid-template-columns: minmax(0, 2.1fr) minmax(0, 1.3fr);
          background: white;
          border-radius: 24px;
          padding: 32px;
          border: 1px solid var(--border);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        .product-details-copy {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-details-header {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .product-category-stock {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .product-category-tag {
          background: #eff6ff;
          color: var(--primary);
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }

        h1 {
          margin: 0;
          font-size: 2.4rem;
          line-height: 1.05;
          color: var(--foreground);
        }

        .product-description {
          margin: 0;
          color: #475569;
          line-height: 1.8;
          font-size: 1rem;
          max-width: 660px;
        }

        .product-details-meta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-top: 28px;
        }

        .label {
          margin: 0 0 6px 0;
          color: #64748b;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .price,
        .meta-value {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--foreground);
        }

        .product-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 36px;
        }

        .btn-primary,
        .btn-secondary {
          border: none;
          border-radius: 14px;
          padding: 16px 22px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }

        .btn-primary {
          background: #fb641b;
          color: white;
          flex: 1 1 220px;
        }

        .btn-secondary {
          background: #f8fafc;
          color: var(--foreground);
          border: 1px solid var(--border);
          flex: 1 1 220px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(251, 100, 27, 0.18);
        }

        .btn-secondary:hover:not(:disabled) {
          transform: translateY(-1px);
          background: #eef2ff;
        }

        .btn-primary:disabled,
        .btn-secondary:disabled {
          background: #e2e8f0;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        @media (max-width: 920px) {
          .product-details-card {
            grid-template-columns: 1fr;
            padding: 24px;
          }
        }
      `}</style>
    </article>
  );
}

export default ProductDetails;
