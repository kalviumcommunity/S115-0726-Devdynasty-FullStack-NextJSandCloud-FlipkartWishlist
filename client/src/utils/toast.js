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
