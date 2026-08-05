"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { ArrowUpDown, X, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/ui/SearchBar";
import CategoryFilter from "@/components/ui/CategoryFilter";
import ProductGrid from "@/components/ui/ProductGrid";
import ProductCard from "@/components/ui/ProductCard";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
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
    rating: 4.8,
    reviews: 142,
  },
  {
    id: 2,
    title: "Wireless Headphones",
    description: "Immersive audio with noise cancellation for work and travel.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "Audio",
    price: 4999,
    stock: 8,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    title: "Ergo Office Chair",
    description: "Comfort-focused ergonomic chair designed for long working hours.",
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80",
    category: "Furniture",
    price: 12999,
    stock: 4,
    rating: 4.5,
    reviews: 64,
  },
];

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState(fallbackProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get("q") || "");
    setCategory(params.get("category") || "");
    if (params.get("sort")) setSortBy(params.get("sort"));
    if (params.get("test") === "true") {
      window.alert = () => {};
    }
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("product-search");
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

    // Initialize WebSocket connection for real-time storefront updates
    const socket = io();

    socket.on("stock-updated", (updatedProduct) => {
      setProducts((prevProducts) => {
        const exists = prevProducts.some(p => p.id === updatedProduct.id);
        if (exists) {
          return prevProducts.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p);
        }
        return prevProducts;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category).filter(Boolean)));
  }, [products]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const updateFilters = (nextSearchTerm, nextCategory, nextSortBy) => {
    const query = {};
    if (nextSearchTerm?.trim()) query.q = nextSearchTerm.trim();
    if (nextCategory) query.category = nextCategory;
    if (nextSortBy && nextSortBy !== "featured") query.sort = nextSortBy;

    const search = new URLSearchParams(query).toString();
    router.replace(`/?${search}`, { scroll: false });
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    updateFilters(value, category, sortBy);
  };

  const handleCategorySelect = (value) => {
    setCategory(value);
    updateFilters(searchTerm, value, sortBy);
  };

  const handleClearCategory = () => {
    setCategory("");
    updateFilters(searchTerm, "", sortBy);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    updateFilters(searchTerm, category, value);
  };

  const handleResetAllFilters = () => {
    setSearchTerm("");
    setCategory("");
    setSortBy("featured");
    updateFilters("", "", "featured");
  };

  const filteredAndSortedProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const title = (product.title || product.name || "").toLowerCase();
      const categoryValue = (product.category || "").toLowerCase();
      const description = (product.description || "").toLowerCase();
      const matchesSearch =
        !normalized ||
        title.includes(normalized) ||
        categoryValue.includes(normalized) ||
        description.includes(normalized);
      const matchesCategory = !category || product.category === category;
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      const priceA = typeof a.price === "number" ? a.price : Number(a.price || 0);
      const priceB = typeof b.price === "number" ? b.price : Number(b.price || 0);
      const ratingA = a.rating ? Number(a.rating) : 4.0;
      const ratingB = b.rating ? Number(b.rating) : 4.0;
      const titleA = (a.title || a.name || "").toLowerCase();
      const titleB = (b.title || b.name || "").toLowerCase();

      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "rating-desc":
          return ratingB - ratingA;
        case "name-asc":
          return titleA.localeCompare(titleB);
        default:
          return 0;
      }
    });
  }, [products, searchTerm, category, sortBy]);

  const featuredProducts = filteredAndSortedProducts.slice(0, 3);
  const hasActiveFilters = Boolean(searchTerm.trim() || category || sortBy !== "featured");

  return (
    <div className="page-shell">
      <Navbar searchValue={searchTerm} onSearchChange={handleSearchChange} />

      <main className="home-page">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-eyebrow flex items-center justify-center gap-1.5">
              <Sparkles size={14} className="text-yellow-300" /> Fresh picks for every shopper
            </p>
            <h1>Discover products that fit your style.</h1>
            <p>
              Explore top deals, search catalog items, filter by categories, and experience live real-time stock updates.
            </p>
            <div className="hero-actions">
              <Link href="#products" className="primary-btn transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-md">
                Shop collection
              </Link>
              <Link href="/wishlist" className="secondary-btn transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-md">
                View wishlist
              </Link>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="filter-panel">
            <div className="filter-bar-top">
              <SearchBar value={searchTerm} onChange={handleSearchChange} />
              
              <div className="sort-select-wrapper">
                <ArrowUpDown size={14} className="text-slate-400" />
                <label htmlFor="sort-by-select">Sort by:</label>
                <select
                  id="sort-by-select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top Rated</option>
                  <option value="name-asc">Name (A - Z)</option>
                </select>
              </div>
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={category}
              onCategorySelect={handleCategorySelect}
              onClear={handleClearCategory}
              categoryCounts={categoryCounts}
              totalProductsCount={products.length}
            />

            {/* Active Filters Strip */}
            {hasActiveFilters && (
              <div className="active-filters-strip">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Filters:</span>
                {searchTerm.trim() && (
                  <span className="active-filter-badge">
                    Search: "{searchTerm}"
                    <button type="button" onClick={() => handleSearchChange("")} aria-label="Clear search filter">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {category && (
                  <span className="active-filter-badge">
                    Category: {category}
                    <button type="button" onClick={handleClearCategory} aria-label="Clear category filter">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {sortBy !== "featured" && (
                  <span className="active-filter-badge">
                    Sorted by: {sortBy}
                    <button type="button" onClick={() => handleSortChange("featured")} aria-label="Reset sort">
                      <X size={14} />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetAllFilters}
                  className="text-xs font-bold text-red-600 hover:text-red-700 underline underline-offset-2 ml-auto cursor-pointer"
                >
                  Reset all
                </button>
              </div>
            )}
          </div>
        </section>

        {featuredProducts.length > 0 && !category && !searchTerm && (
          <section className="section-block">
            <div className="section-heading">
              <div>
                <h2>Featured Deals</h2>
                <p>Top trending picks from our catalog.</p>
              </div>
            </div>
            <div className="product-grid featured-grid">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index === 0} />
              ))}
            </div>
          </section>
        )}

        <section id="products" className="section-block">
          <div className="section-heading">
            <div>
              <h2>Curated Collection</h2>
              <p>Showing {filteredAndSortedProducts.length} of {products.length} item(s).</p>
            </div>
          </div>

          {loading ? (
            <ProductGrid products={filteredAndSortedProducts} loading={loading} error={error} onResetFilters={handleResetAllFilters}>
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </ProductGrid>
          ) : (
            <ProductGrid products={filteredAndSortedProducts} loading={loading} error={error} onResetFilters={handleResetAllFilters}>
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          )}
        </section>
      </main>
    </div>
  );
}

