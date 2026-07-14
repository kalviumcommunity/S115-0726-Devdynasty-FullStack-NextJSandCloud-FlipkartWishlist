"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import CartCard from "@/components/ui/CartCard";
import OrderSummary from "@/components/ui/OrderSummary";
import CheckoutButton from "@/components/cart/CheckoutButton";
import EmptyCart from "@/components/ui/EmptyCart";
import { get, del, patch } from "@/services/api";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await get("/api/cart");
      setItems(data);
    } catch (err) {
      console.error("Error loading cart:", err);
      // Custom friendly error if unauthorized
      if (err.message.includes("401") || err.message.toLowerCase().includes("unauthorized") || err.message.toLowerCase().includes("token")) {
        setError("Please login to access and manage your cart.");
      } else {
        setError("Unable to load cart. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, newQty) => {
    setUpdatingItemId(itemId);
    try {
      const updatedItem = await patch(`/api/cart/${itemId}`, { quantity: newQty });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: updatedItem.quantity } : item
        )
      );
    } catch (err) {
      alert(err.message || "Failed to update quantity. Please check product stock.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemove = async (itemId) => {
    if (!confirm("Are you sure you want to remove this item from your cart?")) {
      return;
    }
    try {
      await del(`/api/cart/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (err) {
      alert(err.message || "Failed to remove item.");
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setCheckoutLoading(true);
    try {
      // Deleting cart items sequentially to simulate a checkout order placement
      for (const item of items) {
        await del(`/api/cart/${item.id}`);
      }
      setItems([]);
      alert("🎉 Order placed successfully! Thank you for shopping with us.");
    } catch (err) {
      alert(err.message || "Failed to complete checkout.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="cart-page-container">
        {loading ? (
          <div className="cart-loading-state">
            <div className="shimmer-circle"></div>
            <div className="shimmer-line header-shimmer"></div>
            <div className="shimmer-line desc-shimmer"></div>
          </div>
        ) : error ? (
          <div className="cart-error-state">
            <p className="error-msg">{error}</p>
            {error.includes("Login") && (
              <a href="/login" className="login-redirect-btn">
                Log In
              </a>
            )}
          </div>
        ) : items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-grid">
            <div className="cart-items-section">
              <h1 className="cart-title">Shopping Cart ({items.length})</h1>
              <div className="cart-cards-list">
                {items.map((item) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                    updatingItemId={updatingItemId}
                  />
                ))}
              </div>
            </div>
            <div className="cart-summary-section">
              <OrderSummary items={items} />
              <CheckoutButton
                onClick={handleCheckout}
                loading={checkoutLoading}
                disabled={items.length === 0}
              />
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .cart-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        .cart-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .cart-title {
          font-size: 28px;
          font-weight: 800;
          margin: 0 0 24px 0;
          color: var(--foreground);
        }
        .cart-cards-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cart-loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
        }
        .shimmer-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #e2e8f0;
          animation: pulse 1.5s infinite ease-in-out;
          margin-bottom: 24px;
        }
        .shimmer-line {
          height: 16px;
          background: #e2e8f0;
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
          margin-bottom: 12px;
        }
        .header-shimmer {
          width: 200px;
          height: 24px;
        }
        .desc-shimmer {
          width: 320px;
        }
        .cart-error-state {
          text-align: center;
          padding: 60px 24px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          max-width: 480px;
          margin: 40px auto;
        }
        .error-msg {
          font-size: 16px;
          color: var(--accent);
          font-weight: 600;
          margin: 0 0 20px 0;
        }
        .login-redirect-btn {
          display: inline-block;
          background: var(--primary);
          color: white;
          padding: 10px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .login-redirect-btn:hover {
          background: var(--primary-hover);
        }
        @keyframes pulse {
          0%, 100% {
            background-color: #f1f5f9;
          }
          50% {
            background-color: #cbd5e1;
          }
        }
        @media (max-width: 960px) {
          .cart-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
}
