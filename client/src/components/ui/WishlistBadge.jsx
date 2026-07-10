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
        if (error.message?.includes("Authorization")) {
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
