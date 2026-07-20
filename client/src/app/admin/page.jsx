"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AdminProductTable from "@/components/admin/AdminProductTable";
import AdminLoadingState from "@/components/admin/AdminLoadingState";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminErrorState from "@/components/admin/AdminErrorState";
import { get } from "@/services/api";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const data = await get("/api/products");
        const normalizedProducts = Array.isArray(data) ? data : [];
        setProducts(normalizedProducts);
      } catch (err) {
        setError(err.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const stockCounts = useMemo(() => {
    const inStock = products.filter((product) => Number(product.stock) > 3).length;
    const lowStock = products.filter(
      (product) => Number(product.stock) > 0 && Number(product.stock) <= 3,
    ).length;
    const outOfStock = products.filter((product) => Number(product.stock) === 0).length;
    return { inStock, lowStock, outOfStock };
  }, [products]);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="admin-page">
        <section className="page-header">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1>Live product inventory</h1>
            <p className="description">
              Connect to the product catalog and review stock levels in real time.
            </p>
          </div>
          <div className="summary-grid">
            <div className="summary-card">
              <p className="summary-label">Total products</p>
              <p className="summary-value">{products.length}</p>
            </div>
            <div className="summary-card">
              <p className="summary-label">In stock</p>
              <p className="summary-value">{stockCounts.inStock}</p>
            </div>
            <div className="summary-card">
              <p className="summary-label">Low stock</p>
              <p className="summary-value">{stockCounts.lowStock}</p>
            </div>
            <div className="summary-card">
              <p className="summary-label">Out of stock</p>
              <p className="summary-value">{stockCounts.outOfStock}</p>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <h2>Products</h2>
              <p>Data is loaded from the database via the product API.</p>
            </div>
          </div>

          {loading ? (
            <AdminLoadingState />
          ) : error ? (
            <AdminErrorState message={error} />
          ) : products.length === 0 ? (
            <AdminEmptyState />
          ) : (
            <AdminProductTable products={products} />
          )}
        </section>
      </main>

      <style jsx>{`
        .admin-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 20px 48px;
        }

        .page-header {
          display: grid;
          gap: 28px;
          margin-bottom: 28px;
        }

        .eyebrow {
          margin: 0 0 12px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #475569;
        }

        .admin-page h1 {
          margin: 0;
          font-size: 38px;
          color: var(--foreground);
          line-height: 1.05;
        }

        .description {
          margin: 16px 0 0;
          max-width: 680px;
          color: #64748b;
          font-size: 16px;
          line-height: 1.8;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .summary-card {
          padding: 22px;
          border-radius: 22px;
          background: white;
          border: 1px solid var(--border);
          box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
        }

        .summary-label {
          margin: 0 0 8px;
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .summary-value {
          margin: 0;
          font-size: 32px;
          font-weight: 800;
          color: var(--foreground);
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 18px;
        }

        .section-heading h2 {
          margin: 0;
          font-size: 22px;
        }

        @media (max-width: 960px) {
          .summary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .admin-page {
            padding: 20px 16px 32px;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
