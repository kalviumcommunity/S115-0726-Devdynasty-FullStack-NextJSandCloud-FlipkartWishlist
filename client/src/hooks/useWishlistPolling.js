import { useEffect, useState, useRef } from "react";
import { get } from "@/services/api";
import { showToast } from "@/utils/toast";

export function useWishlistPolling(wishlist, setWishlist, intervalMs = 30000) {
  const [isPolling, setIsPolling] = useState(false);
  const isPollingRef = useRef(false);

  useEffect(() => {
    if (wishlist.length === 0) return;

    let timeoutId;
    let isMounted = true;

    const poll = async () => {
      if (!isMounted) return;

      // Only poll when the page is active/visible
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        timeoutId = setTimeout(poll, intervalMs);
        return;
      }

      if (isPollingRef.current) {
        timeoutId = setTimeout(poll, intervalMs);
        return;
      }

      try {
        isPollingRef.current = true;
        setIsPolling(true);
        const stockData = await get("/api/wishlist/check-stock");

        if (!isMounted) return;

        setWishlist((prevWishlist) =>
          prevWishlist.map((item) => {
            const newStock = stockData[item.productId];
            if (newStock !== undefined && item.product.stock !== newStock) {
              if (newStock === 0 && item.product.stock > 0) {
                showToast.error(`"${item.product.title || item.product.name}" is now sold out!`, {
                  toastId: `stock-out-${item.productId}`
                });
              } else if (newStock <= 3 && item.product.stock > 3) {
                showToast.warn(`"${item.product.title || item.product.name}" is running out fast!`, {
                  toastId: `stock-low-${item.productId}`
                });
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
        if (isMounted) {
          isPollingRef.current = false;
          setIsPolling(false);
          timeoutId = setTimeout(poll, intervalMs);
        }
      }
    };

    timeoutId = setTimeout(poll, intervalMs);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [wishlist.length, setWishlist, intervalMs]);

  return isPolling;
}
