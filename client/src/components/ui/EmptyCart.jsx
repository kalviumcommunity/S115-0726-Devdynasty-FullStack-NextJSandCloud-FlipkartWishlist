"use client";

import React from "react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="empty-cart-container">
      <div className="illustration-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="empty-cart-svg"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      </div>
      <h2 className="empty-cart-title">Your Bag is Empty!</h2>
      <p className="empty-cart-subtitle">
        Looks like you haven't added anything yet. Discover our latest products and find something you love.
      </p>
      <Link href="/" className="continue-btn">
        Start Shopping
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
