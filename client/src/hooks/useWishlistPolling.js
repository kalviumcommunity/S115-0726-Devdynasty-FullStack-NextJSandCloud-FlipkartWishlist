import { useEffect, useState } from "react";
import { get } from "@/services/api";
import { toast } from "react-toastify";

export function useWishlistPolling(wishlist, setWishlist, intervalMs = 30000) {
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    if (wishlist.length === 0) return;

    const poll = async () => {
      // Only poll when the page is active/visible
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        return;
      }

      try {
        setIsPolling(true);
        const stockData = await get("/api/wishlist/check-stock");

        setWishlist((prevWishlist) =>
          prevWishlist.map((item) => {
            const newStock = stockData[item.productId];
            if (newStock !== undefined && item.product.stock !== newStock) {
              if (newStock === 0 && item.product.stock > 0) {
                toast.error(`"${item.product.title || item.product.name}" is now sold out!`);
              } else if (newStock <= 3 && item.product.stock > 3) {
                toast.warn(`"${item.product.title || item.product.name}" is running out fast!`);
              }
              
              return {
                ...item,
                product: {
                  ...item.product,
                  stock: newStock,
                },
              };
            }
            return item;
          })
        );
      } catch (err) {
        console.error("Failed to check stock updates", err);
      } finally {
        setIsPolling(false);
      }
    };

    const interval = setInterval(poll, intervalMs);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [wishlist.length, setWishlist, intervalMs]);

  return isPolling;
}
