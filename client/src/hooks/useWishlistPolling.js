import { useEffect } from "react";
import { get } from "@/services/api";

export function useWishlistPolling(wishlist, setWishlist, intervalMs = 30000) {
  useEffect(() => {
    if (wishlist.length === 0) return;

    const poll = async () => {
      // Only poll when the page is active/visible
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        return;
      }

      try {
        const stockData = await get("/api/wishlist/check-stock");

        setWishlist((prevWishlist) =>
          prevWishlist.map((item) => {
            const newStock = stockData[item.productId];
            if (newStock !== undefined && item.product.stock !== newStock) {
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
      }
    };

    const interval = setInterval(poll, intervalMs);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [wishlist.length, setWishlist, intervalMs]);
}
