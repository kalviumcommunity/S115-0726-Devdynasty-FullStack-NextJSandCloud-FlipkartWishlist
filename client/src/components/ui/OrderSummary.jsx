"use client";

import React from "react";

export default function OrderSummary({ items }) {
  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const deliveryCharges = subtotal >= 500 ? 0 : 40;
  const grandTotal = subtotal + gst + deliveryCharges;

  return (
    <div className="order-summary-card">
      <h3 className="order-summary-title">Order Summary</h3>
      <hr className="divider" />
      
      <div className="summary-row">
        <span>Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})</span>
        <span>₹{subtotal.toLocaleString("en-IN")}</span>
      </div>

      <div className="summary-row">
        <span>GST (18%)</span>
        <span>₹{gst.toLocaleString("en-IN")}</span>
      </div>

      <div className="summary-row">
        <span>Delivery Charges</span>
        <span className={deliveryCharges === 0 ? "free-delivery" : ""}>
          {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
        </span>
      </div>

      <hr className="divider" />
      
      <div className="summary-row total-row">
        <span>Grand Total</span>
        <span>₹{grandTotal.toLocaleString("en-IN")}</span>
      </div>

      {deliveryCharges === 0 && (
        <p className="delivery-savings-msg">
          🎉 Free delivery applied to this order!
        </p>
      )}

      <style jsx>{`
        .order-summary-card {
          background: var(--card-bg);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 100px;
        }
        .order-summary-title {
          font-size: 20px;
          font-weight: 800;
          color: var(--foreground);
          letter-spacing: -0.5px;
          margin: 0 0 20px 0;
        }
        .divider {
          border: 0;
          border-top: 1px dashed #cbd5e1;
          margin: 20px 0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          margin-bottom: 16px;
          color: #475569;
        }
        .summary-row span:last-child {
          font-weight: 600;
          color: var(--foreground);
        }
        .free-delivery {
          color: #10b981 !important;
          background: #ecfdf5;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
        }
        .total-row {
          font-size: 20px;
          font-weight: 800;
          color: var(--foreground);
          margin-bottom: 0;
          align-items: center;
        }
        .total-row span:last-child {
          color: var(--primary);
          font-size: 24px;
        }
        .delivery-savings-msg {
          font-size: 13px;
          color: #059669;
          background: #d1fae5;
          padding: 10px 14px;
          border-radius: 8px;
          margin: 20px 0 0 0;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1px solid #a7f3d0;
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
