"use client";

import React from "react";

export default function CheckoutForm({
  formData,
  errors,
  onChange,
  paymentMethod,
  onPaymentMethodChange
}) {
  return (
    <div className="checkout-form-card">
      <h2 className="form-title">Shipping & Contact Details</h2>
      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName || ""}
            onChange={onChange}
            className={errors.fullName ? "error-input" : ""}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email || ""}
            onChange={onChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            placeholder="10-digit mobile number"
            value={formData.mobileNumber || ""}
            onChange={onChange}
            className={errors.mobileNumber ? "error-input" : ""}
          />
          {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Flat, House no., Building, Company, Apartment, Street"
            value={formData.address || ""}
            onChange={onChange}
            className={errors.address ? "error-input" : ""}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={formData.city || ""}
            onChange={onChange}
            className={errors.city ? "error-input" : ""}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="State"
            value={formData.state || ""}
            onChange={onChange}
            className={errors.state ? "error-input" : ""}
          />
          {errors.state && <span className="error-message">{errors.state}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            placeholder="6-digit pincode"
            value={formData.pincode || ""}
            onChange={onChange}
            className={errors.pincode ? "error-input" : ""}
          />
          {errors.pincode && <span className="error-message">{errors.pincode}</span>}
        </div>
      </div>

      <div className="payment-method-section">
        <h2 className="form-title">Payment Method</h2>
        <div className="payment-options">
          <label className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => onPaymentMethodChange("cod")}
            />
            <div className="option-details">
              <span className="option-title">Cash on Delivery</span>
              <span className="option-desc">Pay with cash when the order is delivered to your door.</span>
            </div>
          </label>

          <label className={`payment-option ${paymentMethod === "online" ? "selected" : ""}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => onPaymentMethodChange("online")}
            />
            <div className="option-details">
              <span className="option-title">Demo Online Payment</span>
              <span className="option-desc">Pay instantly using simulated credit/debit card, UPI or NetBanking.</span>
            </div>
          </label>
        </div>
      </div>

      <style jsx>{`
        .checkout-form-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }
        .form-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 20px 0;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 10px;
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
        label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }
        input[type="text"],
        input[type="email"],
        input[type="tel"] {
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s ease;
          background: #f8fafc;
        }
        input:focus {
          outline: none;
          border-color: var(--primary);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }
        .error-input {
          border-color: var(--accent) !important;
          background: #fff5f5 !important;
        }
        .error-message {
          color: var(--accent);
          font-size: 12px;
          font-weight: 500;
        }
        .payment-method-section {
          margin-top: 24px;
        }
        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .payment-option {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #f8fafc;
        }
        .payment-option:hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
        }
        .payment-option.selected {
          border-color: var(--primary);
          background: rgba(37, 99, 235, 0.04);
          box-shadow: 0 0 0 1px var(--primary);
        }
        .payment-option input[type="radio"] {
          margin-top: 4px;
          cursor: pointer;
          accent-color: var(--primary);
        }
        .option-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .option-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--foreground);
        }
        .option-desc {
          font-size: 13px;
          color: #64748b;
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
