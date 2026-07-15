"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductDetails from "@/components/ui/ProductDetails";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import { get } from "@/services/api";

export default function ProductDetailsPage({ params }) {
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        if (err.message?.includes("401") || err.message?.toLowerCase().includes("unauthorized")) {
          setError("Please log in to view this product.");
        } else {
          setError(err.message || "Unable to fetch product details.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="product-details-loading">
          <div className="loading-header">
            <div className="loading-line short" />
            <div className="loading-line medium" />
          </div>
          <div className="loading-grid">
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="product-details-error">
          <p>{error}</p>
          <Link href="/" className="return-home">
            Back to Home
          </Link>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="product-details-error">
          <p>Product not found.</p>
          <Link href="/" className="return-home">
            Back to Home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Navbar />

      <main className="product-details-container">
        <div className="top-row">
          <Link href="/" className="back-link">
            ← Back to home
          </Link>
          <span className="product-sku">Product ID: {product.id}</span>
        </div>

        <ProductDetails product={product} />
      </main>

      <style jsx>{`
        .product-details-container {
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 24px 40px;
        }

        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .back-link {
          color: var(--foreground);
          text-decoration: none;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: white;
          transition: background-color 0.2s ease;
        }

        .back-link:hover {
          background: #f8fafc;
        }

        .product-sku {
          color: #64748b;
          font-size: 0.95rem;
        }

        .product-details-loading,
        .product-details-error {
          max-width: 960px;
          margin: 0 auto;
          padding: 80px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          text-align: center;
        }

        .loading-header {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .loading-line {
          height: 18px;
          background: #e2e8f0;
          border-radius: 999px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .loading-line.short {
          width: 180px;
        }

        .loading-line.medium {
          width: 260px;
        }

        .loading-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          width: 100%;
        }

        .return-home {
          color: white;
          background: var(--primary);
          padding: 12px 24px;
          border-radius: 12px;
          text-decoration: none;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.85;
          }
          50% {
            opacity: 0.45;
          }
        }

        @media (max-width: 768px) {
          .loading-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
