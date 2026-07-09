import { useEffect, useMemo, useState } from "react";
import { get } from "../../services/api";
import SearchBar from "../../components/ui/SearchBar";
import ProductCard from "../../components/ui/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await get("/api/products");
        setProducts(data);
      } catch (error) {
        setError(error.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) {
      return products;
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalized)
    );
  }, [products, searchTerm]);

  return (
    <main className="home-page">
      <section className="hero">
        <h1>Welcome to Flipkart Wishlist</h1>
        <p>Browse products, create an account, and explore details.</p>
      </section>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section className="product-grid">
          {filteredProducts.length === 0 ? (
            <p>No products match your search.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </section>
      )}
    </main>
  );
}

export default Home;
