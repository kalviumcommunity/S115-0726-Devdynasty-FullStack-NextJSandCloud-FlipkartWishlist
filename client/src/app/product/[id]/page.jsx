"use client";

import React, { useEffect, useState, use } from "react";
import { get, post } from "../../../services/api";
import Navbar from "../../../components/layout/Navbar";
import StockBadge from "../../../components/ui/StockBadge";

export default function ProductDetails({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        setError(error.message || "Unable to fetch product details.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setActionLoading(true);
    try {
      await post("/api/cart", { productId: Number(id), quantity: 1 });
      alert("🛒 Product added to cart successfully!");
    } catch (err) {
      alert(err.message || "Failed to add product to cart. Please log in.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    setActionLoading(true);
    try {
      await post("/api/wishlist", { productId: Number(id) });
      alert("❤️ Product added to wishlist successfully!");
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      alert(err.message || "Failed to add product to wishlist. Please log in.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px' }}>
          <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
          <a href="/" style={{ marginTop: '20px', padding: '10px 20px', background: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>Back to Home</a>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <p>Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="product-details-container">
        <div className="product-details-card">
          <div className="product-img-section">
            <img src={product.image || product.imageUrl} alt={product.title} className="product-details-img" />
          </div>
          <div className="product-details-info">
            <div className="category-row">
              <span className="product-category-tag">{product.category || "General"}</span>
              <StockBadge stock={product.stock ?? 0} />
            </div>
            <h1 className="product-title">{product.title || product.name}</h1>
            <p className="product-desc">{product.description}</p>
            <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>
            
            <div className="product-actions">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={actionLoading || product.stock === 0}
                className="btn-add-to-cart"
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                type="button"
                onClick={handleAddToWishlist}
                disabled={actionLoading}
                className="btn-add-to-wishlist"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .product-details-container {
            max-width: 1000px;
            margin: 40px auto;
            padding: 0 24px;
          }
          .product-details-card {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 40px;
            background: white;
            border-radius: 12px;
            padding: 32px;
            border: 1px solid var(--border);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          }
          .product-img-section {
            background: #f8fafc;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--border);
            height: 350px;
          }
          .product-details-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
          .product-details-info {
            display: flex;
            flex-direction: column;
          }
          .category-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          .product-category-tag {
            font-size: 13px;
            background: #eff6ff;
            color: var(--primary);
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: 600;
            text-transform: uppercase;
          }
          .product-title {
            font-size: 28px;
            font-weight: 800;
            color: var(--foreground);
            margin: 0 0 12px 0;
            line-height: 1.3;
          }
          .product-desc {
            font-size: 15px;
            color: #475569;
            line-height: 1.6;
            margin: 0 0 24px 0;
          }
          .product-price {
            font-size: 32px;
            font-weight: 850;
            color: var(--primary);
            margin: 0 0 32px 0;
          }
          .product-actions {
            display: flex;
            gap: 16px;
            margin-top: auto;
          }
          .btn-add-to-cart {
            flex: 1;
            background: #fb641b;
            color: white;
            border: none;
            padding: 16px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            box-shadow: 0 4px 6px -1px rgba(251, 100, 27, 0.2);
            transition: all 0.2s;
          }
          .btn-add-to-cart:hover:not(:disabled) {
            background: #f3580b;
            box-shadow: 0 8px 12px -3px rgba(251, 100, 27, 0.3);
          }
          .btn-add-to-cart:disabled {
            background: #cbd5e1;
            color: #94a3b8;
            cursor: not-allowed;
            box-shadow: none;
          }
          .btn-add-to-wishlist {
            flex: 1;
            background: white;
            color: var(--foreground);
            border: 1px solid var(--border);
            padding: 16px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 750;
            cursor: pointer;
            text-transform: uppercase;
            transition: all 0.2s;
          }
          .btn-add-to-wishlist:hover:not(:disabled) {
            background: #f8fafc;
            border-color: #cbd5e1;
          }
          @media (max-width: 768px) {
            .product-details-card {
              grid-template-columns: 1fr;
              padding: 20px;
            }
            .product-img-section {
              height: 250px;
            }
          }
        `}</style>
      </main>
    </div>
  );
}
