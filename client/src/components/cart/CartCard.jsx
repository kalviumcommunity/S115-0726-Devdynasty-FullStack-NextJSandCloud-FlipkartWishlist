"use client";

import React from "react";
import QuantitySelector from "./QuantitySelector";

export default function CartCard({ item, onQuantityChange, onRemove, updatingItemId }) {
  const { id, quantity, product } = item;
  const isUpdating = updatingItemId === id;

  const handleQtyChange = (newQty) => {
    onQuantityChange(id, newQty);
  };

  return (
    <div className={`cart-card ${isUpdating ? "updating" : ""}`}>
      <div className="cart-card-img-container">
        <img src={product.image} alt={product.title} className="cart-card-img" />
      </div>
      <div className="cart-card-details">
        <h3 className="cart-card-title">{product.title}</h3>
        <p className="cart-card-desc">{product.description}</p>
        <div className="cart-card-pricing">
          <span className="cart-card-price">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="cart-card-total-item-price">
            Subtotal: ₹{(product.price * quantity).toLocaleString("en-IN")}
          </span>
        </div>
        <div className="cart-card-actions">
          <QuantitySelector
            quantity={quantity}
            stock={product.stock}
            onChange={handleQtyChange}
            disabled={isUpdating}
          />
          <button
            type="button"
            className="cart-card-remove-btn"
            onClick={() => onRemove(id)}
            disabled={isUpdating}
          >
            Remove
          </button>
        </div>
      </div>

      <style jsx>{`
        .cart-card {
          display: flex;
          gap: 20px;
          padding: 20px;
          border-radius: 12px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .cart-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          border-color: #cbd5e1;
        }
        .cart-card.updating {
          opacity: 0.7;
          pointer-events: none;
        }
        .cart-card-img-container {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .cart-card:hover .cart-card-img {
          transform: scale(1.05);
        }
        .cart-card-details {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .cart-card-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 6px 0;
          color: var(--foreground);
        }
        .cart-card-desc {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 12px 0;
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
          margin-bottom: 16px;
        }
        .cart-card-price {
          font-size: 20px;
          font-weight: 800;
          color: var(--primary);
        }
        .cart-card-total-item-price {
          font-size: 13px;
          color: #64748b;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .cart-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cart-card-remove-btn {
          background: transparent;
          border: none;
          color: var(--accent);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 8px 12px;
          border-radius: 6px;
        }
        .cart-card-remove-btn:hover {
          color: #be123c;
          background: #ffe4e6;
        }
        @media (max-width: 480px) {
          .cart-card {
            flex-direction: column;
            align-items: center;
          }
          .cart-card-img-container {
            width: 100%;
            height: 180px;
          }
          .cart-card-actions {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
