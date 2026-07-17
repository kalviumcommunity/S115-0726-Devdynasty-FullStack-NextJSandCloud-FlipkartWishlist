"use client";

import { useEffect, useRef, useState } from "react";
import { get, del, post } from "@/services/api";
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
  const [pendingMoves, setPendingMoves] = useState({});
  const pendingMovesRef = useRef({});

  const restoreWishlistItem = (restoredItem, index) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === restoredItem.id)) {
        return prev;
      }

      const insertionIndex = index >= 0 && index <= prev.length ? index : prev.length;
      const nextWishlist = [...prev];
      nextWishlist.splice(insertionIndex, 0, restoredItem);
      return nextWishlist;
    });
  };

  const handleMoveToCart = async (item) => {
    const itemId = item.id;

    if (pendingMovesRef.current[itemId]) {
      return;
    }

    // Step 1: Mark as moving to show loading state on the button
    pendingMovesRef.current[itemId] = true;
    setPendingMoves({ ...pendingMovesRef.current });

    let cartAdded = false;
    let removedIndex = -1;

    try {
      // Step 2: Validate stock and add to cart first
      await post("/api/cart", { productId: item.product.id });
      cartAdded = true;

      // Step 3: Optimistic UI - Remove from wishlist immediately after cart success
      removedIndex = wishlist.findIndex((wishItem) => wishItem.id === itemId);
      setWishlist((prev) => prev.filter((wishItem) => wishItem.id !== itemId));

      // Step 4: Remove from backend wishlist
      await del(`/api/wishlist/${itemId}`);
      toast.success("Item moved successfully");
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      if (!cartAdded) {
        // Failed at cart stage (e.g. out of stock). Item was never removed, so no restore needed.
        toast.error("Failed to move to cart: " + err.message);
      } else {
        // Failed at wishlist delete stage. Item was optimistically removed, so restore it.
        restoreWishlistItem(item, removedIndex);
        toast.warn("Item was added to cart, but wishlist update failed. Refresh to sync.");
      }
    } finally {
      delete pendingMovesRef.current[itemId];
      setPendingMoves({ ...pendingMovesRef.current });
    }
  };

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
            {wishlist.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onMoveToCart={() => handleMoveToCart(item)}
                isMoving={Boolean(pendingMoves[item.id])}
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
