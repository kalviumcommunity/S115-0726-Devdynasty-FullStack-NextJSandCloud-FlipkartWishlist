"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function OrderSuccessPage() {
  const [orderInfo, setOrderInfo] = useState({
    orderId: "",
    deliveryDate: "",
    total: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOrder = sessionStorage.getItem("lastOrder");
      if (storedOrder) {
        try {
          setOrderInfo(JSON.parse(storedOrder));
        } catch (e) {
          console.error("Failed to parse stored order:", e);
        }
      } else {
        // Fallback for direct page visits / testing
        const fallbackId = `OD${Date.now()}`;
        const fallbackDate = new Date();
        fallbackDate.setDate(fallbackDate.getDate() + 4);
        const formattedFallbackDate = fallbackDate.toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setOrderInfo({
          orderId: fallbackId,
          deliveryDate: formattedFallbackDate,
          total: 0,
        });
      }
    }
  }, []);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="success-container">
        <div className="success-card">
          <div className="success-badge">
            <span className="success-checkmark">✅</span>
          </div>
          <h1 className="success-title">Order Placed Successfully</h1>
          <p className="success-subtitle">
            Thank you for shopping with us! Your order has been placed and is being processed.
          </p>

          <hr className="divider" />

          <div className="order-details-grid">
            <div className="detail-row">
              <span className="detail-label">Order ID</span>
              <span className="detail-value order-id">{orderInfo.orderId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Estimated Delivery</span>
              <span className="detail-value">{orderInfo.deliveryDate}</span>
            </div>
            {orderInfo.total > 0 && (
              <div className="detail-row">
                <span className="detail-label">Amount Paid</span>
                <span className="detail-value price">₹{orderInfo.total.toLocaleString("en-IN")}</span>
              </div>
            )}
          </div>

          <hr className="divider" />

          <div className="success-actions">
            <a href="/" className="continue-btn">
              Continue Shopping
            </a>
          </div>
        </div>
      </main>

      <style jsx>{`
        .success-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 60px 24px;
        }
        .success-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
          transition: all 0.3s ease;
        }
        .success-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          background: #e6f4ea;
          border-radius: 50%;
          margin-bottom: 24px;
        }
        .success-checkmark {
          font-size: 36px;
        }
        .success-title {
          font-size: 24px;
          font-weight: 800;
          color: #10b981;
          margin: 0 0 12px 0;
        }
        .success-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0 0 32px 0;
          line-height: 1.5;
        }
        .divider {
          border: 0;
          border-top: 1px solid var(--border);
          margin: 24px 0;
        }
        .order-details-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }
        .detail-label {
          color: #64748b;
          font-weight: 500;
        }
        .detail-value {
          color: var(--foreground);
          font-weight: 600;
        }
        .detail-value.order-id {
          font-family: var(--font-geist-mono), monospace;
          background: #e2e8f0;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 13px;
        }
        .detail-value.price {
          color: var(--foreground);
        }
        .success-actions {
          margin-top: 32px;
        }
        .continue-btn {
          display: inline-block;
          width: 100%;
          background: var(--primary);
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }
        .continue-btn:hover {
          background: var(--primary-hover);
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
          transform: translateY(-1px);
        }
        .continue-btn:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
}
