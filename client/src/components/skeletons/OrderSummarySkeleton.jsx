"use client";

import React from "react";

export default function OrderSummarySkeleton() {
  return (
    <div className="order-summary-skeleton">
      <div className="skeleton-line title-line"></div>
      <hr className="divider" />
      
      <div className="summary-row">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line tiny"></div>
      </div>

      <div className="summary-row">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line tiny"></div>
      </div>

      <div className="summary-row">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line tiny"></div>
      </div>

      <hr className="divider" />
      
      <div className="summary-row">
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line short"></div>
      </div>

      <style jsx>{`
        .order-summary-skeleton {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }
        .divider {
          border: 0;
          border-top: 1px solid var(--border);
          margin: 16px 0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .skeleton-line {
          height: 14px;
          background: linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 50%, #e2e8f0 100%);
          background-size: 200% 100%;
          animation: pulse-shimmer 1.5s infinite linear;
          border-radius: 4px;
        }
        
        .title-line {
          width: 50%;
          height: 20px;
          margin-bottom: 16px;
        }
        
        .short { width: 40%; }
        .medium { width: 50%; }
        .tiny { width: 25%; }
        
        @keyframes pulse-shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
