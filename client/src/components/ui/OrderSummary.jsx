"use client";

import React from "react";

export default function OrderSummary({ items }) {
  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryThreshold = 500;
  const deliveryCharges = subtotal >= deliveryThreshold ? 0 : 40;
  const total = subtotal + deliveryCharges;

  return (
    <div className="order-summary-card">
      <h3 className="order-summary-title">Order Summary</h3>
      <hr className="divider" />
      <div className="summary-row">
        <span>Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})</span>
        <span>₹{subtotal.toLocaleString("en-IN")}</span>
      </div>
      <div className="summary-row">
        <span>Delivery Charges</span>
        <span className={deliveryCharges === 0 ? "free-delivery" : ""}>
          {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
        </span>
      </div>
      <hr className="divider" />
      <div className="summary-row total-row">
        <span>Total Amount</span>
        <span>₹{total.toLocaleString("en-IN")}</span>
      </div>
      {deliveryCharges === 0 && (
        <p className="delivery-savings-msg">
          🎉 Free delivery applied to this order!
        </p>
      )}

      <style jsx>{`
        .order-summary-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          position: sticky;
          top: 100px;
        }
        .order-summary-title {
          font-size: 18px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 16px 0;
        }
        .divider {
          border: 0;
          border-top: 1px solid var(--border);
          margin: 16px 0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          margin-bottom: 12px;
          color: var(--foreground);
        }
        .free-delivery {
          color: #10b981;
          font-weight: 600;
        }
        .total-row {
          font-size: 18px;
          font-weight: 800;
          color: var(--foreground);
          margin-bottom: 0;
        }
        .delivery-savings-msg {
          font-size: 13px;
          color: #10b981;
          background: #e6f4ea;
          padding: 8px 12px;
          border-radius: 6px;
          margin: 16px 0 0 0;
          font-weight: 500;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
