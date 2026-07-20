"use client";

import Link from "next/link";
import StockBadge from "./StockBadge";

export default function WishlistCard({ item, onRemove, onMoveToCart, isMoving }) {
  const { product } = item;
  const moveDisabled = isMoving || product.stock === 0 || product.stock === "Out of stock";
  const moveLabel = product.stock === 0 || product.stock === "Out of stock" ? "Out of stock" : isMoving ? "Moving..." : "Move To Cart";

  return (
    <div className="wishlist-card">
      <div className="image-container">
        {/* Placeholder image or actual product image */}
        <img src={product.image || "https://via.placeholder.com/150"} alt={product.title || product.name} style={{ width: "auto", height: "auto" }} />
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
        <button
          onClick={onMoveToCart}
          disabled={moveDisabled}
          className={`btn-move-cart ${moveDisabled ? "btn-disabled" : ""}`}
          aria-busy={isMoving}
        >
          {moveLabel}
        </button>
        <button onClick={() => onRemove(item.id)} disabled={isMoving} className="btn-remove">
          Remove
        </button>
      </div>

      <style jsx>{`
        .wishlist-card {
          display: flex;
          border: 1px solid #eaeaea;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          align-items: center;
          background: white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: slideIn 0.4s ease-out forwards;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .wishlist-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px rgba(0,0,0,0.08);
        }
        .image-container img {
          width: 120px;
          height: 120px;
          object-fit: contain;
          border-radius: 8px;
          background: #f8f9fa;
          padding: 8px;
        }
        .details {
          flex: 1;
          margin-left: 24px;
        }
        .details h3 {
          margin: 0 0 12px 0;
          font-size: 20px;
          font-weight: 600;
        }
        .details h3 a {
          color: #2c3e50;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .details h3 a:hover {
          color: #2874f0;
        }
        .price {
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 12px;
          color: #2874f0;
        }
        .actions {
          margin-left: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 140px;
        }
        .btn-move-cart {
          background-color: #2874f0;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
        }
        .btn-move-cart:hover {
          background-color: #1e5bb8;
          transform: scale(1.02);
        }
        .btn-remove {
          background-color: white;
          border: 1px solid #e0e0e0;
          color: #757575;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-disabled {
          opacity: 0.65;
          cursor: not-allowed;
          pointer-events: none;
        }
        .btn-remove:hover {
          background-color: #fff3f3;
          color: #d32f2f;
          border-color: #d32f2f;
        }
        @media (max-width: 600px) {
          .wishlist-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .details {
            margin-left: 0;
            margin-top: 16px;
            width: 100%;
          }
          .actions {
            margin-left: 0;
            margin-top: 16px;
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .btn-move-cart, .btn-remove {
            flex: 1;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
