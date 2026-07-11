"use client";

import React from "react";

export default function QuantitySelector({ quantity, stock, onChange, disabled }) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="quantity-selector">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || quantity <= 1}
        className="quantity-btn decrement-btn"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="quantity-value">{quantity}</span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || quantity >= stock}
        className="quantity-btn increment-btn"
        aria-label="Increase quantity"
      >
        +
      </button>

      <style jsx>{`
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2px;
          background: #f8fafc;
          width: fit-content;
        }
        .quantity-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: white;
          color: var(--foreground);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        .quantity-btn:hover:not(:disabled) {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }
        .quantity-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f1f5f9;
        }
        .quantity-value {
          font-size: 14px;
          font-weight: 600;
          min-width: 36px;
          text-align: center;
          color: var(--foreground);
        }
      `}</style>
    </div>
  );
}
