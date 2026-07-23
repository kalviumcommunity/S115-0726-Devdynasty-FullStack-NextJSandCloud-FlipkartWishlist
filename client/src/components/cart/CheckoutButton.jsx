"use client";

import React from "react";

export default function CheckoutButton({ onClick, disabled, loading }) {
  return (
    <div className="checkout-btn-container">
      <button
        type="button"
        className="checkout-btn"
        onClick={onClick}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-label="Proceed to checkout"
      >
        {loading ? (
          <span className="spinner" role="status" aria-label="Processing order">Processing...</span>
        ) : (
          <>
            <span>Place Order</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </>
        )}
      </button>

      <style jsx>{`
        .checkout-btn-container {
          margin-top: 20px;
        }
        .checkout-btn {
          width: 100%;
          background: #fb641b;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 6px -1px rgba(251, 100, 27, 0.2);
          text-transform: uppercase;
        }
        .checkout-btn:hover:not(:disabled) {
          background: #f3580b;
          box-shadow: 0 10px 15px -3px rgba(251, 100, 27, 0.3);
          transform: translateY(-1px);
        }
        .checkout-btn:active:not(:disabled) {
          transform: translateY(1px);
        }
        .checkout-btn:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }
        .btn-arrow {
          font-size: 18px;
          transition: transform 0.2s ease;
        }
        .checkout-btn:hover:not(:disabled) .btn-arrow {
          transform: translateX(4px);
        }
        .spinner {
          display: inline-block;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
