"use client";

import Link from "next/link";
import StockBadge from "./StockBadge";

export default function WishlistCard({ item, onRemove, onMoveToCart, isMoving }) {
  const { product } = item;
  const moveDisabled = isMoving || product.stock === 0 || product.stock === "Out of stock";
  const moveLabel = product.stock === 0 || product.stock === "Out of stock" ? "Out of stock" : isMoving ? "Moving..." : "Move To Cart";

  return (
    <div className="wishlist-card transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl">
      <div className="image-container overflow-hidden rounded-xl">
        {/* Placeholder image or actual product image */}
        <img src={product.image || "https://via.placeholder.com/150"} alt={product.title || product.name} className="transition-transform duration-300 ease-in-out hover:scale-105" />
      </div>
      <div className="details">
        <h3 className="line-clamp-2">
          <Link href={`/product/${product.id}`} aria-label={`View details for ${product.title || product.name}`}>
            {product.title || product.name}
          </Link>
        </h3>
        <p className="price">₹{product.price}</p>
        <div className="stock-info">
          <StockBadge stock={product.stock} />
        </div>
      </div>
      <div className="actions">
        <button
          onClick={onMoveToCart}
          disabled={moveDisabled}
          className={`btn-move-cart transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-md ${moveDisabled ? "btn-disabled" : ""}`}
          aria-busy={isMoving}
          aria-label={moveDisabled ? "Cannot move to cart" : "Move item to cart"}
        >
          {moveLabel}
        </button>
        <button 
          onClick={() => onRemove(item.id)} 
          disabled={isMoving} 
          className="btn-remove transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-md"
          aria-label="Remove item from wishlist"
        >
          Remove
        </button>
      </div>

      <style jsx>{`
        .wishlist-card {
          display: flex;
          border: 1px solid var(--border, #eaeaea);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
          align-items: center;
          background: var(--card-bg, white);
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
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
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .image-container {
          flex-shrink: 0;
        }
        .image-container img {
          width: 100px;
          height: 100px;
          object-fit: contain;
          border-radius: 12px;
          background: #f8fafc;
          padding: 8px;
        }
        .details {
          flex: 1;
          margin-left: 24px;
          min-width: 0;
        }
        .details h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          font-weight: 600;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .details h3 a {
          color: #1e293b;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .details h3 a:hover, .details h3 a:focus {
          color: var(--primary, #2874f0);
          outline: none;
        }
        .price {
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 8px;
          color: var(--primary, #2874f0);
        }
        .actions {
          margin-left: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 140px;
        }
        .btn-move-cart {
          background: linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%);
          color: white;
          border: none;
          padding: 11px 20px;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .btn-move-cart:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
        }
        .btn-move-cart:focus-visible, .btn-remove:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
        .btn-remove {
          background-color: #f1f5f9;
          border: none;
          color: #334155;
          padding: 11px 20px;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #94a3b8 !important;
          box-shadow: none !important;
          transform: none !important;
        }
        .btn-remove:hover:not(:disabled) {
          background-color: #fee2e2;
          color: #ef4444;
        }
        
        /* Tablet */
        @media (max-width: 768px) {
          .wishlist-card {
            padding: 16px;
          }
          .details {
            margin-left: 16px;
          }
          .actions {
            margin-left: 16px;
            min-width: 120px;
          }
        }
        
        /* Mobile */
        @media (max-width: 600px) {
          .wishlist-card {
            flex-direction: column;
            align-items: stretch;
            padding: 16px;
          }
          .image-container {
            align-self: center;
          }
          .image-container img {
            width: 140px;
            height: 140px;
          }
          .details {
            margin-left: 0;
            margin-top: 16px;
            text-align: center;
          }
          .actions {
            margin-left: 0;
            margin-top: 20px;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .btn-move-cart, .btn-remove {
            flex: 1;
            text-align: center;
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  );
}
