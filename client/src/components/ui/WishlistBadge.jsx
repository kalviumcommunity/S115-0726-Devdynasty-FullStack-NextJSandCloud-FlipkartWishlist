"use client";

import { useEffect, useState } from "react";
import { get } from "../../services/api";

function WishlistBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchWishlist() {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("token");
      if (!token) {
        setCount(0);
        return;
      }

      try {
        const data = await get("/api/wishlist");
        setCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        if (error.message?.includes("Authorization") || error.message?.includes("Unauthorized")) {
          setCount(0);
          return;
        }

        console.error("Failed to load wishlist count", error);
      }
    }

    const handleUpdate = () => fetchWishlist();
    window.addEventListener("wishlist_updated", handleUpdate);

    fetchWishlist();

    return () => {
      window.removeEventListener("wishlist_updated", handleUpdate);
    };
  }, []);

  if (count === 0) return null;

  return (
    <span className="badge-wrapper">
      ❤️ <span className="badge">{count}</span>
      <style jsx>{`
        .badge-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-left: 4px;
        }
        .badge {
          background-color: #ff3f6c;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 12px;
        }
      `}</style>
    </span>
  );
}

export default WishlistBadge;
