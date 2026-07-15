"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import CheckoutForm from "@/components/ui/CheckoutForm";
import OrderSummary from "@/components/ui/OrderSummary";
import { get, del } from "@/services/api";

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Fetch Cart Items
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await get("/api/cart");
      setItems(data);
    } catch (err) {
      console.error("Error loading cart for checkout:", err);
      if (
        err.message.includes("401") ||
        err.message.toLowerCase().includes("unauthorized") ||
        err.message.toLowerCase().includes("token")
      ) {
        setError("Please login to access and manage your cart.");
      } else {
        setError("Unable to load checkout page. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Mobile number must be a 10-digit numeric number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Pincode must be a 6-digit numeric pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Place Order Action
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (items.length === 0) return;

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(firstError)?.focus();
      }
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Deleting cart items sequentially to clear user cart database state
      for (const item of items) {
        await del(`/api/cart/${item.id}`);
      }

      // Generate Order Details
      const orderId = `OD${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 4);
      const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Calculate Total to store
      const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const gst = subtotal * 0.18;
      const deliveryCharges = subtotal >= 500 ? 0 : 40;
      const grandTotal = subtotal + gst + deliveryCharges;

      // Save Order Metadata in SessionStorage for Success Page
      sessionStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId,
          deliveryDate: formattedDeliveryDate,
          total: grandTotal,
        })
      );

      // Redirect to success page
      router.push("/order-success");
    } catch (err) {
      console.error("Order placement failed:", err);
      alert(err.message || "Something went wrong while processing your order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="checkout-container">
        {loading ? (
          <div className="checkout-loading-state">
            <div className="shimmer-circle"></div>
            <div className="shimmer-line header-shimmer"></div>
            <div className="shimmer-line desc-shimmer"></div>
          </div>
        ) : error ? (
          <div className="checkout-error-state">
            <p className="error-msg">{error}</p>
            {error.toLowerCase().includes("login") && (
              <a href="/login" className="login-redirect-btn">
                Log In
              </a>
            )}
          </div>
        ) : (
          <div className="checkout-layout">
            <div className="checkout-main-content">
              <h1 className="checkout-page-title">Secure Checkout</h1>
              {items.length === 0 ? (
                <div className="empty-cart-message">
                  <div className="empty-cart-icon">🛒</div>
                  <h3>Your cart is empty.</h3>
                  <p>Please add items to your cart before proceeding to checkout.</p>
                  <a href="/" className="continue-shopping-btn">
                    Continue Shopping
                  </a>
                </div>
              ) : (
                <form onSubmit={handlePlaceOrder} noValidate>
                  <CheckoutForm
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={setPaymentMethod}
                  />
                </form>
              )}
            </div>

            <div className="checkout-sidebar">
              <OrderSummary items={items} />
              <div className="place-order-wrapper">
                <button
                  type="submit"
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={items.length === 0 || isPlacingOrder}
                >
                  {isPlacingOrder ? (
                    <span className="spinner">Placing Order...</span>
                  ) : (
                    <>
                      <span>Place Order</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .checkout-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        .checkout-layout {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .checkout-page-title {
          font-size: 28px;
          font-weight: 800;
          margin: 0 0 24px 0;
          color: var(--foreground);
        }
        .checkout-main-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .checkout-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: sticky;
          top: 100px;
        }
        .place-order-wrapper {
          margin-top: 12px;
        }
        .place-order-btn {
          width: 100%;
          background: #fb641b;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 6px -1px rgba(251, 100, 27, 0.2);
          text-transform: uppercase;
        }
        .place-order-btn:hover:not(:disabled) {
          background: #f3580b;
          box-shadow: 0 10px 15px -3px rgba(251, 100, 27, 0.3);
          transform: translateY(-1px);
        }
        .place-order-btn:active:not(:disabled) {
          transform: translateY(1px);
        }
        .place-order-btn:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }
        .btn-arrow {
          font-size: 18px;
          transition: transform 0.2s ease;
        }
        .place-order-btn:hover:not(:disabled) .btn-arrow {
          transform: translateX(4px);
        }
        .spinner {
          display: inline-block;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .empty-cart-message {
          text-align: center;
          padding: 48px 24px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-top: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }
        .empty-cart-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .empty-cart-message h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: var(--foreground);
        }
        .empty-cart-message p {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 24px 0;
        }
        .continue-shopping-btn {
          display: inline-block;
          background: var(--primary);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .continue-shopping-btn:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
        }
        .checkout-loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
        }
        .shimmer-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #e2e8f0;
          animation: pulse 1.5s infinite ease-in-out;
          margin-bottom: 24px;
        }
        .shimmer-line {
          height: 16px;
          background: #e2e8f0;
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
          margin-bottom: 12px;
        }
        .header-shimmer {
          width: 200px;
          height: 24px;
        }
        .desc-shimmer {
          width: 320px;
        }
        .checkout-error-state {
          text-align: center;
          padding: 60px 24px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          max-width: 480px;
          margin: 40px auto;
        }
        .error-msg {
          color: #b91c1c;
          font-weight: 500;
          margin: 0 0 16px 0;
        }
        .login-redirect-btn {
          display: inline-block;
          background: #b91c1c;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .login-redirect-btn:hover {
          background: #991b1b;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        @media (max-width: 992px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }
          .checkout-sidebar {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
