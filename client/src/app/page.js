"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/ui/ProductCard";
import { get } from "@/services/api";

const fallbackProducts = [
  {
    id: 1,
    title: "Galaxy Smart Phone",
    description: "Flagship device with vibrant display and powerful camera system.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    price: 79999,
    stock: 15,
  },
  {
    id: 2,
    title: "Wireless Headphones",
    description: "Immersive audio with noise cancellation for work and travel.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "Audio",
    price: 4999,
    stock: 8,
  },
  {
    id: 3,
    title: "Ergo Office Chair",
    description: "Comfort-focused ergonomic chair designed for long working hours.",
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80",
    category: "Furniture",
    price: 12999,
    stock: 4,
  },
];

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await get("/api/products");
        const normalizedProducts = Array.isArray(data) ? data : [];
        setProducts(normalizedProducts.length > 0 ? normalizedProducts : fallbackProducts);
      } catch (err) {
        setError(err.message || "Unable to load products.");
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category).filter(Boolean))).slice(0, 6);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) {
      return products;
    }

    return products.filter((product) => {
      const title = (product.title || product.name || "").toLowerCase();
      const category = (product.category || "").toLowerCase();
      return title.includes(normalized) || category.includes(normalized);
    });
  }, [products, searchTerm]);

  const featuredProducts = filteredProducts.slice(0, 3);

  return (
    <div className="page-shell">
      <Navbar searchValue={searchTerm} onSearchChange={setSearchTerm} />

      <main className="home-page">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-eyebrow">Fresh picks for every shopper</p>
            <h1>Discover products that fit your style.</h1>
            <p>
              Browse featured deals, search by title or category, and open any item to see details.
            </p>
            <div className="hero-actions">
              <Link href="#products" className="primary-btn">
                Shop now
              </Link>
              <Link href="/wishlist" className="secondary-btn">
                View wishlist
              </Link>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <h2>Categories</h2>
            <p>Explore products by department.</p>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <button key={category} type="button" className="category-chip" onClick={() => setSearchTerm(category)}>
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <h2>Featured Products</h2>
            <p>Trending picks from our catalog.</p>
          </div>
          <div className="product-grid featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="products" className="section-block">
          <div className="section-heading">
            <h2>Product Grid</h2>
            <p>Showing {filteredProducts.length} result(s).</p>
          </div>

          {loading ? (
            <p className="empty-state">Loading products...</p>
          ) : error ? (
            <p className="empty-state">{error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className="empty-state">No products match your search right now.</p>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
