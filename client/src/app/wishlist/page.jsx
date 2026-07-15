"use client";

import { useEffect, useState } from "react";
import { get, del } from "@/services/api";
import WishlistCard from "@/components/ui/WishlistCard";
import WishlistSkeleton from "@/components/ui/WishlistSkeleton";
import Navbar from "@/components/layout/Navbar";
import EmptyWishlist from "@/components/ui/EmptyWishlist";
import { toast } from "react-toastify";
import { useWishlistPolling } from "@/hooks/useWishlistPolling";

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
        if (err.message?.includes("Unauthorized") || err.message?.includes("Authorization")) {
          setError("Please login to view your wishlist.");
        } else {
          setError(err.message || "Failed to load wishlist");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  // Polling logic for stock updates every 30 seconds
  useWishlistPolling(wishlist, setWishlist);

  const handleOptimisticRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRestore = (restoredItem) => {
    setWishlist((prev) => [...prev, restoredItem]);
  };

  const handleRemove = async (id) => {
    try {
      await del(`/api/wishlist/${id}`);
      setWishlist(prev => prev.filter(item => item.id !== id));
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      toast.error("Failed to remove item: " + err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="wishlist-container">
        <h1>My Wishlist</h1>

        {loading ? (
          <div className="wishlist-grid">
            <WishlistSkeleton />
            <WishlistSkeleton />
            <WishlistSkeleton />
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(item => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onOptimisticRemove={handleOptimisticRemove}
                onRestore={handleRestore}
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
        .wishlist-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
