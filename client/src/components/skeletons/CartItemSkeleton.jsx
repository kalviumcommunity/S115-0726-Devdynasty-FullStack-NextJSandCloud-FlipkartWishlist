"use client";

import React from "react";

export default function CartItemSkeleton() {
  return (
    <div className="cart-item-skeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-details">
        <div className="skeleton-line medium title-line"></div>
        <div className="skeleton-line full desc-line"></div>
        <div className="skeleton-line full desc-line"></div>
        <div className="skeleton-pricing">
          <div className="skeleton-line short price-line"></div>
          <div className="skeleton-line tiny subtotal-line"></div>
        </div>
        <div className="skeleton-actions">
          <div className="skeleton-qty"></div>
          <div className="skeleton-remove"></div>
        </div>
      </div>

      <style jsx>{`
        .cart-item-skeleton {
          display: flex;
          gap: 20px;
          padding: 20px;
          border-radius: 12px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          width: 100%;
        }

        .skeleton-img {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .skeleton-details {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 8px;
        }

        .title-line { height: 20px; margin-bottom: 4px; }
        .desc-line { height: 14px; }
        .price-line { height: 24px; }
        .subtotal-line { height: 20px; border-radius: 4px; }
        
        .skeleton-pricing {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 8px;
          margin-bottom: 12px;
        }

        .skeleton-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .skeleton-qty {
          width: 100px;
          height: 36px;
          border-radius: 20px;
        }

        .skeleton-remove {
          width: 70px;
          height: 24px;
          border-radius: 4px;
        }

        .skeleton-img,
        .skeleton-qty,
        .skeleton-remove,
        .skeleton-line {
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
