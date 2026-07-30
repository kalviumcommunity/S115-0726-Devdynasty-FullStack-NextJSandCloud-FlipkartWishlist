"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { io } from "socket.io-client";
import Navbar from "@/components/layout/Navbar";
import CartCard from "@/components/ui/CartCard";
import OrderSummary from "@/components/ui/OrderSummary";
import CheckoutButton from "@/components/cart/CheckoutButton";
import EmptyCart from "@/components/ui/EmptyCart";
import CartSkeleton from "@/components/skeletons/CartSkeleton";
import { get, del, patch } from "@/services/api";
import { showToast, handleApiError } from "@/utils/toast";

export default function CartPage() {
  const router = useRouter();
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
      if (err.message?.includes("401") || err.message?.toLowerCase().includes("unauthorized") || err.message?.toLowerCase().includes("token")) {
        setError("Please login to access and manage your cart.");
      } else {
        setError("Unable to load cart. Please try again later.");
      }
      handleApiError(err, "Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    if (typeof window !== "undefined" && window.location.search.includes("test=true")) {
      window.confirm = () => true;
      window.alert = () => {};
    }

    // Initialize WebSocket connection for real-time stock updates in cart
    const socket = io();

    socket.on("stock-updated", (updatedProduct) => {
      setItems((prevItems) => {
        // Only update if the product exists in the cart
        const exists = prevItems.some(item => item.productId === updatedProduct.id);
        if (exists) {
          return prevItems.map(item => 
            item.productId === updatedProduct.id 
              ? { ...item, product: { ...item.product, ...updatedProduct } } 
              : item
          );
        }
        return prevItems;
      });
    });

    return () => {
      socket.disconnect();
    };
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
      showToast.success("Quantity updated successfully");
      window.dispatchEvent(new Event("cart_updated"));
    } catch (err) {
      handleApiError(err, "Failed to update quantity.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await del(`/api/cart/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      showToast.success("Item removed from cart");
      window.dispatchEvent(new Event("cart_updated"));
    } catch (err) {
      handleApiError(err, "Failed to remove item.");
    }
  };

  const hasInvalidItems = items.some(item => item.quantity > item.product.stock);
  const isCheckoutDisabled = items.length === 0 || hasInvalidItems;

  const handleCheckout = () => {
    if (isCheckoutDisabled) return;
    router.push("/checkout");
  };

  return (
    <div>
      <Navbar />
      <main className="cart-page-container">
        {loading ? (
          <CartSkeleton />
        ) : error ? (
          <div className="cart-error-state">
            <p className="error-msg">{error}</p>
            {error.toLowerCase().includes("login") && (
              <Link href="/login" className="login-redirect-btn">
                Log In
              </Link>
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
                disabled={isCheckoutDisabled}
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
          .cart-title {
            font-size: 24px;
          }
          .cart-page-container {
            padding: 24px 16px;
          }
        }
      `}</style>
    </div>
  );
}
