"use client";

import Link from "next/link";
import StockBadge from "./StockBadge";
import { post } from "@/services/api";

export default function WishlistCard({ item, onRemove }) {
  const { product } = item;

  const handleMoveToCart = async () => {
    try {
      await post("/api/cart", { productId: product.id });
      onRemove(item.id);
      alert("Moved to cart successfully!");
    } catch (err) {
      alert("Failed to move to cart: " + err.message);
    }
  };

  return (
    <div className="wishlist-card">
      <div className="image-container">
        {/* Placeholder image or actual product image */}
        <img src={product.image || "https://via.placeholder.com/150"} alt={product.title || product.name} />
      </div>
      <div className="details">
        <h3>
          <Link href={`/product/${product.id}`}>
            {product.title || product.name}
          </Link>
        </h3>
        <p className="price">${product.price}</p>
        <div className="stock-info">
          <StockBadge stock={product.stock} />
        </div>
      </div>
      <div className="actions">
        <button onClick={handleMoveToCart} className="btn-move-cart">
          Move To Cart
        </button>
        <button onClick={() => onRemove(item.id)} className="btn-remove">
          Remove
        </button>
      </div>

      <style jsx>{`
        .wishlist-card {
          display: flex;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          align-items: center;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .image-container img {
          width: 100px;
          height: 100px;
          object-fit: contain;
          border-radius: 4px;
        }
        .details {
          flex: 1;
          margin-left: 16px;
        }
        .details h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
        }
        .details h3 a {
          color: #333;
          text-decoration: none;
        }
        .details h3 a:hover {
          color: #2874f0;
        }
        .price {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 8px;
        }
        .actions {
          margin-left: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .btn-move-cart {
          background-color: #2874f0;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-move-cart:hover {
          background-color: #1e5bb8;
        }
        .btn-remove {
          background-color: transparent;
          border: 1px solid #ddd;
          color: #666;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-remove:hover {
          background-color: #fef7e0;
          color: #b06000;
          border-color: #b06000;
        }
      `}</style>
    </div>
  );
}
