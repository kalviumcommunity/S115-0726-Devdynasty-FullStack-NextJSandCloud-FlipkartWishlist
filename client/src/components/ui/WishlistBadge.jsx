"use client";

import { useEffect, useState } from "react";
import { get } from "../../services/api";

function WishlistBadge() {
  const [count, setCount] = useState(0);

  // We should ideally use a context for this to update automatically when items are added,
  // but for simplicity, we'll fetch it once on mount and optionally poll or listen to events.
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const data = await get("/api/wishlist");
        setCount(data.length);
      } catch (error) {
        console.error("Failed to load wishlist count", error);
      }
    }

    // A simple custom event to trigger badge update from other components
    const handleUpdate = () => fetchWishlist();
    window.addEventListener("wishlist_updated", handleUpdate);

    fetchWishlist();

    return () => {
      window.removeEventListener("wishlist_updated", handleUpdate);
    };
  }, []);

  if (count === 0) return null;

  return (
    <span className="badge">
      {count}
      <style jsx>{`
        .badge {
          background-color: #ff3f6c;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 12px;
          margin-left: 4px;
        }
      `}</style>
    </span>
  );
}

export default WishlistBadge;
