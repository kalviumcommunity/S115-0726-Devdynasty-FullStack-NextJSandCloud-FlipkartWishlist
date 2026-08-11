import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Centralized toast utility for the application.
 * Helps ensure consistent styling and prevents duplicate toasts,
 * which is especially useful for polling mechanisms.
 */
export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      toastId: message,
      ...options
    });
  },
  error: (message, options = {}) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      toastId: message,
      ...options
    });
  },
  warn: (message, options = {}) => {
    toast.warn(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      toastId: message,
      ...options
    });
  },
  info: (message, options = {}) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      toastId: message,
      ...options
    });
  }
};

/**
 * Standardized API error handler for cart actions and others.
 */
export const handleApiError = (err, defaultMessage = "An error occurred.") => {
  const msg = err.message?.toLowerCase() || "";
  if (msg.includes("401") || msg.includes("unauthorized") || msg.includes("token")) {
    showToast.error("Unauthorized access. Please log in.");
  } else if (msg.includes("failed to fetch") || msg.includes("network") || msg.includes("timed out")) {
    showToast.error("Network failure. Please try again later.");
  } else if (msg.includes("item already added to cart")) {
    showToast.info("ℹ Item already added to cart", { icon: false });
  } else if (msg.includes("stock") || msg.includes("cannot add more")) {
    showToast.error(err.message || "Out of stock item.");
  } else {
    showToast.error(err.message || defaultMessage);
  }
};
