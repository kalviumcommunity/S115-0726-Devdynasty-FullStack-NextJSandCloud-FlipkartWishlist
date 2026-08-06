"use client";

export default function StockBadge({ stock }) {
  const stockNum = typeof stock === "number" ? stock : (stock === "Out of stock" ? 0 : Number(stock || 0));
  
  let status = "in-stock";
  let label = "In Stock";
  
  if (stockNum === 0 || stock === "Out of stock") {
    status = "out-of-stock";
    label = "Out of Stock";
  } else if (stockNum <= 3) {
    status = "low-stock";
    label = "Low Stock";
  }

  return (
    <span className={`stock-live-badge ${status}`} title="Live monitored stock (updates every 30s)">
      <span className="pulse-indicator" aria-hidden="true">
        <span className="pulse-ring"></span>
        <span className="pulse-dot"></span>
      </span>
      <span className="badge-text">{label}</span>

      <style jsx>{`
        .stock-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: -0.01em;
          transition: all 0.2s ease-in-out;
          white-space: nowrap;
        }

        .pulse-indicator {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 10px;
          height: 10px;
          flex-shrink: 0;
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          z-index: 2;
        }

        .pulse-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          animation: breathingPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          z-index: 1;
        }

        @keyframes breathingPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(2.2);
            opacity: 0;
          }
          100% {
            transform: scale(0.8);
            opacity: 0;
          }
        }

        /* In Stock Theme */
        .stock-live-badge.in-stock {
          background-color: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
        }
        .stock-live-badge.in-stock .pulse-dot {
          background-color: #10b981;
        }
        .stock-live-badge.in-stock .pulse-ring {
          background-color: #34d399;
        }

        /* Low Stock Theme */
        .stock-live-badge.low-stock {
          background-color: #fffbeb;
          color: #b45309;
          border: 1px solid #fde68a;
        }
        .stock-live-badge.low-stock .pulse-dot {
          background-color: #f59e0b;
        }
        .stock-live-badge.low-stock .pulse-ring {
          background-color: #fbbf24;
        }

        /* Out of Stock Theme */
        .stock-live-badge.out-of-stock {
          background-color: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }
        .stock-live-badge.out-of-stock .pulse-dot {
          background-color: #ef4444;
        }
        .stock-live-badge.out-of-stock .pulse-ring {
          background-color: #f87171;
        }
      `}</style>
    </span>
  );
}

