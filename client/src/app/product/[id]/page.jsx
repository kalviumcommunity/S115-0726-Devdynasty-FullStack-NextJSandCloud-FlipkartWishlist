"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import StockBadge from "@/components/ui/StockBadge";
import { get } from "@/services/api";

export default function ProductDetails({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Unable to fetch product details.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const imageUrl = product?.image || product?.imageUrl || "https://via.placeholder.com/600x420?text=Flipkart";
  const price = typeof product?.price === "number" ? product.price : Number(product?.price || 0);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="product-details-page">
        <Link href="/" className="back-link">
          ← Back to home
        </Link>

        {loading ? (
          <p className="empty-state">Loading product...</p>
        ) : error ? (
          <p className="empty-state">{error}</p>
        ) : !product ? (
          <p className="empty-state">Product not found.</p>
        ) : (
          <div className="product-details-card">
            <img src={imageUrl} alt={product.title || product.name} className="product-details-image" />
            <div className="product-details-info">
              <p className="hero-eyebrow">{product.category || "Featured product"}</p>
              <h1>{product.title || product.name}</h1>
              <p className="product-card-description">{product.description}</p>
              <div className="product-card-meta">
                <p className="price">₹{price.toFixed(2)}</p>
                <StockBadge stock={product.stock ?? 0} />
              </div>
              <div className="detail-actions">
                <button type="button" className="primary-btn">
                  Add to cart
                </button>
                <button type="button" className="secondary-btn">
                  Save to wishlist
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
