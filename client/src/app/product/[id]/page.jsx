"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";

import { ChevronRight, ArrowLeft, PackageSearch } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ProductDetails from "@/components/ui/ProductDetails";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import RelatedProducts from "@/components/ui/RelatedProducts";
import { get } from "@/services/api";

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
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
      const interval = setInterval(loadProduct, 30000);
      return () => clearInterval(interval);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="product-details-container">
          <div className="flex gap-2 mb-6">
            <div className="skeleton-line short" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl border border-slate-200">
            <div className="skeleton-image rounded-2xl h-[380px]" />
            <div className="flex flex-col gap-4">
              <div className="skeleton-line short" />
              <div className="skeleton-line medium" />
              <div className="skeleton-line" />
              <div className="skeleton-line small mt-auto" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="product-details-container">
          <div className="empty-state-card">
            <div className="empty-state-icon">
              <PackageSearch size={32} />
            </div>
            <h3>{error || "Product Not Found"}</h3>
            <p>The product you are looking for may have been removed or is temporarily unavailable.</p>
            <Link href="/" className="empty-state-action inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Catalog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Navbar />

      <main className="product-details-container">
        {/* Breadcrumb Navigation Bar */}
        <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
          <Link href="/" className="breadcrumb-link">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link href={`/?category=${encodeURIComponent(product.category || "")}`} className="breadcrumb-link">
            {product.category || "Catalog"}
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="breadcrumb-current truncate max-w-[200px] sm:max-w-[350px]">
            {product.title || product.name || "Product details"}
          </span>
        </nav>

        {/* Product Details Component */}
        <ProductDetails product={product} />

        {/* You May Also Like Recommendations */}
        <RelatedProducts currentProductId={id} category={product.category} />
      </main>

      <style jsx>{`
        .product-details-container {
          max-width: 1240px;
          margin: 24px auto 48px;
          padding: 0 20px;
        }

        .breadcrumbs-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          font-size: 13px;
          flex-wrap: wrap;
        }

        .breadcrumb-link {
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .breadcrumb-link:hover {
          color: #2563eb;
        }

        .breadcrumb-current {
          color: #0f172a;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

