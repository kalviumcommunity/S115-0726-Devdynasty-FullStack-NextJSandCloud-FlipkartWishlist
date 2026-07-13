"use client";

import React from "react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="empty-cart-container">
      <div className="illustration-wrapper">
        {/* Shopping bag / cart vector SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="empty-cart-svg"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>
      <h2 className="empty-cart-title">Your Cart is Empty!</h2>
      <p className="empty-cart-subtitle">
        Add items to it now to build a smart e-commerce experience.
      </p>
      <Link href="/" className="continue-btn">
        Continue Shopping
      </Link>

      <style jsx>{`
        .empty-cart-container {
          text-align: center;
          padding: 60px 24px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          max-width: 500px;
          margin: 40px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .illustration-wrapper {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: var(--primary);
        }
        .empty-cart-svg {
          width: 64px;
          height: 64px;
        }
        .empty-cart-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 8px 0;
        }
        .empty-cart-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0 0 28px 0;
          max-width: 320px;
          line-height: 1.5;
        }
        .continue-btn {
          display: inline-block;
          background-color: var(--primary);
          color: white;
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }
        .continue-btn:hover {
          background-color: var(--primary-hover);
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
          transform: translateY(-1px);
        }
        .continue-btn:active {
          transform: translateY(1px);
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
