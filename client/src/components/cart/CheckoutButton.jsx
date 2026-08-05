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
          margin-top: 24px;
        }
        .checkout-btn {
          width: 100%;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          border: none;
          padding: 18px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 8px 20px -6px rgba(234, 88, 12, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }
        .checkout-btn::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
        }
        .checkout-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #fb923c 0%, #ea580c 100%);
          box-shadow: 0 12px 25px -8px rgba(234, 88, 12, 0.5);
          transform: translateY(-2px) scale(1.01);
        }
        .checkout-btn:active:not(:disabled) {
          transform: translateY(1px) scale(0.98);
          box-shadow: 0 4px 10px -4px rgba(234, 88, 12, 0.4);
        }
        .checkout-btn:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
        .checkout-btn:disabled::after {
          display: none;
        }
        .btn-arrow {
          font-size: 20px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .checkout-btn:hover:not(:disabled) .btn-arrow {
          transform: translateX(6px);
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
