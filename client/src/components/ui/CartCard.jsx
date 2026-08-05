"use client";

import React from "react";
import CartItemSkeleton from "@/components/skeletons/CartItemSkeleton";

export default function CartCard({ item, onQuantityChange, onRemove, updatingItemId }) {
  const { id, quantity, product } = item;
  const isUpdating = updatingItemId === id;

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      onQuantityChange(id, quantity + 1);
    }
  };

  if (isUpdating) {
    return <CartItemSkeleton />;
  }

  return (
    <div className={`cart-card ${isUpdating ? "updating" : ""} ${quantity > product.stock ? "error" : ""}`}>
      <div className="cart-card-img-container">
        <img src={product.image} alt={product.title} className="cart-card-img" />
      </div>
      <div className="cart-card-details">
        <h3 className="cart-card-title">{product.title}</h3>
        <p className="cart-card-desc">{product.description}</p>
        <div className="cart-card-pricing">
          <span className="cart-card-price">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="cart-card-total-item-price">
            Subtotal: <strong>₹{(product.price * quantity).toLocaleString("en-IN")}</strong>
          </span>
        </div>
        
        {quantity > product.stock && (
          <div className="stock-error-msg">
            <span className="error-icon">⚠️</span> Quantity exceeds available stock ({product.stock} available)
          </div>
        )}

        <div className="cart-card-actions">
          <div className="quantity-selector">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={isUpdating || quantity <= 1}
              className="quantity-btn decrement-btn"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={isUpdating || quantity >= product.stock}
              className="quantity-btn increment-btn"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          <button
            type="button"
            className="cart-card-remove-btn"
            onClick={() => onRemove(id)}
            disabled={isUpdating}
          >
            <span className="remove-icon">×</span> Remove
          </button>
        </div>
      </div>

      <style jsx>{`
        .cart-card {
          display: flex;
          gap: 24px;
          padding: 24px;
          border-radius: 16px;
          background: var(--card-bg);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 20px -10px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }
        .cart-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-color: #cbd5e1;
        }
        .cart-card.error {
          border-color: #fca5a5;
          background: #fff5f5;
        }
        .stock-error-msg {
          font-size: 13px;
          color: #b91c1c;
          background: #fee2e2;
          padding: 8px 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
          border: 1px solid #fecaca;
        }
        .cart-card.updating {
          opacity: 0.6;
          pointer-events: none;
          filter: grayscale(0.2);
        }
        .cart-card-img-container {
          width: 140px;
          height: 140px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cart-card:hover .cart-card-img {
          transform: scale(1.08) rotate(1deg);
        }
        .cart-card-details {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .cart-card-title {
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 8px 0;
          color: var(--foreground);
          letter-spacing: -0.5px;
        }
        .cart-card-desc {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 16px 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cart-card-pricing {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 20px;
        }
        .cart-card-price {
          font-size: 24px;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -0.5px;
        }
        .cart-card-total-item-price {
          font-size: 14px;
          color: #475569;
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .cart-card-total-item-price strong {
          color: #0f172a;
          font-weight: 700;
        }
        .cart-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          flex-wrap: wrap;
          gap: 16px;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          padding: 4px;
          background: #ffffff;
          width: fit-content;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }
        .quantity-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--foreground);
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .quantity-btn:hover:not(:disabled) {
          background: #f1f5f9;
          color: var(--primary);
          transform: scale(1.1);
        }
        .quantity-btn:active:not(:disabled) {
          transform: scale(0.95);
        }
        .quantity-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .quantity-value {
          font-size: 15px;
          font-weight: 700;
          min-width: 40px;
          text-align: center;
          color: var(--foreground);
        }
        .cart-card-remove-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 8px 16px;
          border-radius: 999px;
        }
        .remove-icon {
          font-size: 18px;
          line-height: 1;
          margin-bottom: 2px;
        }
        .cart-card-remove-btn:hover {
          color: #e11d48;
          background: #ffe4e6;
        }
        .cart-card-remove-btn:active {
          transform: scale(0.96);
        }
        @media (max-width: 480px) {
          .cart-card {
            flex-direction: column;
            align-items: center;
            padding: 20px;
          }
          .cart-card-img-container {
            width: 100%;
            height: 220px;
          }
          .cart-card-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
