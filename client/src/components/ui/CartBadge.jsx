"use client";

import { useEffect, useState } from "react";
import { get } from "../../services/api";

function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("token");
      if (!token) {
        setCount(0);
        return;
      }

      try {
        const data = await get("/api/cart");
        // Sum all quantities, or just count unique items. Let's count total items in cart.
        const totalItems = Array.isArray(data) ? data.reduce((acc, item) => acc + item.quantity, 0) : 0;
        setCount(totalItems);
      } catch (error) {
        if (error.message?.includes("Authorization") || error.message?.includes("Unauthorized") || error.message?.includes("401")) {
          setCount(0);
          return;
        }
        console.error("Failed to load cart count", error.message);
      }
    }

    const handleUpdate = () => fetchCart();
    window.addEventListener("cart_updated", handleUpdate);

    fetchCart();

    return () => {
      window.removeEventListener("cart_updated", handleUpdate);
    };
  }, []);

  if (count === 0) return null;

  return (
    <span className="badge-wrapper">
      🛒 <span className="badge">{count}</span>
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

export default CartBadge;
