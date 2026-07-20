"use client";

import React from "react";
import OrderSummarySkeleton from "./OrderSummarySkeleton";

export default function CheckoutSkeleton() {
  return (
    <div className="checkout-layout">
      <div className="checkout-main-content">
        <div className="skeleton-title-container">
          <div className="skeleton-title"></div>
        </div>
        
        <div className="checkout-form-skeleton">
          <div className="skeleton-line title-line"></div>
          
          <div className="form-grid">
            <div className="form-group full-width">
              <div className="skeleton-label"></div>
              <div className="skeleton-input"></div>
            </div>
            
            <div className="form-group">
              <div className="skeleton-label"></div>
              <div className="skeleton-input"></div>
            </div>
            
            <div className="form-group">
              <div className="skeleton-label"></div>
              <div className="skeleton-input"></div>
            </div>
            
            <div className="form-group full-width">
              <div className="skeleton-label"></div>
              <div className="skeleton-input"></div>
            </div>
            
            <div className="form-group">
              <div className="skeleton-label"></div>
              <div className="skeleton-input"></div>
            </div>
            
            <div className="form-group">
              <div className="skeleton-label"></div>
              <div className="skeleton-input"></div>
            </div>
            
            <div className="form-group">
              <div className="skeleton-label"></div>
              <div className="skeleton-input"></div>
            </div>
          </div>
          
          <div className="payment-method-section">
            <div className="skeleton-line title-line"></div>
            <div className="payment-options">
              <div className="skeleton-payment-option"></div>
              <div className="skeleton-payment-option"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-sidebar">
        <OrderSummarySkeleton />
        <div className="place-order-wrapper">
          <div className="skeleton-btn"></div>
        </div>
      </div>

      <style jsx>{`
        .checkout-layout {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
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

        .checkout-main-content {
          display: flex;
          flex-direction: column;
        }
        
        .checkout-form-skeleton {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group.full-width {
          grid-column: span 2;
        }
        
        .skeleton-label {
          height: 14px;
          width: 30%;
          border-radius: 4px;
        }
        
        .skeleton-input {
          height: 42px;
          border-radius: 8px;
          width: 100%;
        }

        .payment-method-section {
          margin-top: 24px;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skeleton-payment-option {
          height: 72px;
          border-radius: 8px;
          width: 100%;
        }

        .checkout-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .place-order-wrapper {
          margin-top: 12px;
        }

        .skeleton-btn {
          width: 100%;
          height: 56px;
          border-radius: 8px;
        }

        /* Shared Shimmer Animation Styles */
        .skeleton-title,
        .skeleton-label,
        .skeleton-input,
        .skeleton-payment-option,
        .skeleton-btn,
        .skeleton-line {
          background: linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 50%, #e2e8f0 100%);
          background-size: 200% 100%;
          animation: pulse-shimmer 1.5s infinite linear;
        }
        
        .skeleton-line { border-radius: 4px; }
        
        .title-line {
          width: 40%;
          height: 20px;
          margin-bottom: 20px;
        }

        @keyframes pulse-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 992px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-group.full-width {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}
