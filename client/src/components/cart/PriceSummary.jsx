"use client";

import React from "react";

export default function PriceSummary({ items }) {
  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const deliveryThreshold = 500;
  const deliveryFee = subtotal > deliveryThreshold ? 0 : 40;
  const total = subtotal + tax + deliveryFee;

  return (
    <div className="price-summary-card">
      <h3 className="price-summary-title">Price Details</h3>
      <hr className="divider" />
      <div className="summary-row">
        <span>Price ({items.length} items)</span>
        <span>₹{subtotal.toLocaleString("en-IN")}</span>
      </div>
      <div className="summary-row">
        <span>GST (18%)</span>
        <span>₹{tax.toLocaleString("en-IN")}</span>
      </div>
      <div className="summary-row">
        <span>Delivery Charges</span>
        <span className={deliveryFee === 0 ? "free-delivery" : ""}>
          {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
        </span>
      </div>
      <hr className="divider" />
      <div className="summary-row total-row">
        <span>Total Amount</span>
        <span>₹{total.toLocaleString("en-IN")}</span>
      </div>
      {deliveryFee === 0 && (
        <p className="delivery-savings-msg">
          🎉 You saved ₹40 on delivery charges on this order!
        </p>
      )}

      <style jsx>{`
        .price-summary-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          position: sticky;
          top: 100px;
        }
        .price-summary-title {
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
