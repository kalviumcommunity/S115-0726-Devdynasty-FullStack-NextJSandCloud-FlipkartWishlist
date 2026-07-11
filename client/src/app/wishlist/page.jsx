"use client";

import { useEffect, useState } from "react";
import { get, del } from "../../services/api";
import WishlistCard from "../../components/ui/WishlistCard";
import Navbar from "../../components/layout/Navbar";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial wishlist
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const data = await get("/api/wishlist");
        setWishlist(data);
      } catch (err) {
        setError(err.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    }
    
    fetchWishlist();
  }, []);

  // Polling logic for stock updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      if (wishlist.length === 0) return;

      try {
        const stockData = await get("/api/wishlist/check-stock");
        
        // Update wishlist items with new stock values
        setWishlist(prevWishlist => 
          prevWishlist.map(item => {
            const newStock = stockData[item.productId];
            if (newStock !== undefined && item.product.stock !== newStock) {
              return {
                ...item,
                product: {
                  ...item.product,
                  stock: newStock
                }
              };
            }
            return item;
          })
        );
      } catch (err) {
        console.error("Failed to check stock updates", err);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [wishlist.length]);

  const handleRemove = async (id) => {
    try {
      await del(`/api/wishlist/${id}`);
      setWishlist(prev => prev.filter(item => item.id !== id));
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      alert("Failed to remove item: " + err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="wishlist-container">
        <h1>My Wishlist</h1>
        
        {loading ? (
          <p>Loading your wishlist...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : wishlist.length === 0 ? (
          <div className="empty-state">
            <p>Your wishlist is empty.</p>
            <a href="/" className="btn-primary">Browse Products</a>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(item => (
              <WishlistCard 
                key={item.id} 
                item={item} 
                onRemove={handleRemove} 
              />
            ))}
          </div>
        )}
      </main>

      <style jsx>{`
        .wishlist-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 32px 16px;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 24px;
          color: #333;
        }
        .error {
          color: red;
        }
        .empty-state {
          text-align: center;
          padding: 64px 0;
          background: #f9f9f9;
          border-radius: 8px;
        }
        .empty-state p {
          margin-bottom: 16px;
          color: #666;
        }
        .btn-primary {
          display: inline-block;
          background-color: #2874f0;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
        }
        .btn-primary:hover {
          background-color: #1e5bb8;
        }
      `}</style>
    </div>
  );
}
