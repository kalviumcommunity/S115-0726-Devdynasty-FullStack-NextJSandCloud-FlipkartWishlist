"use client";

import React from "react";
import OrderSummarySkeleton from "./OrderSummarySkeleton";
import CartItemSkeleton from "./CartItemSkeleton";

export default function CartSkeleton() {
  return (
    <div className="cart-grid">
      <div className="cart-items-section">
        <div className="skeleton-title-container">
          <div className="skeleton-title"></div>
        </div>
        <div className="cart-cards-list">
          {/* Render 3 dummy items */}
          {[1, 2, 3].map((key) => (
            <CartItemSkeleton key={key} />
          ))}
        </div>
      </div>
      <div className="cart-summary-section">
        <OrderSummarySkeleton />
        <div className="skeleton-btn"></div>
      </div>

      <style jsx>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: start;
          width: 100%;
        }
        
        .skeleton-title-container {
          margin-bottom: 24px;
        }
        
        .skeleton-title {
          height: 32px;
          width: 250px;
          border-radius: 6px;
        }

        .cart-cards-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .cart-summary-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .skeleton-btn {
          width: 100%;
          height: 52px;
          border-radius: 8px;
        }

        /* Shared Shimmer Animation Styles */
        .skeleton-title,
        .skeleton-btn {
          background: linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 50%, #e2e8f0 100%);
          background-size: 200% 100%;
          animation: pulse-shimmer 1.5s infinite linear;
        }
        
        .skeleton-line { border-radius: 4px; }
        
        .full { width: 100%; }
        .medium { width: 60%; }
        .short { width: 30%; }
        .tiny { width: 20%; }

        @keyframes pulse-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 960px) {
          .cart-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 480px) {
          .cart-item-skeleton {
            flex-direction: column;
            align-items: center;
          }
          .skeleton-img {
            width: 100%;
            height: 180px;
          }
          .skeleton-actions {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
