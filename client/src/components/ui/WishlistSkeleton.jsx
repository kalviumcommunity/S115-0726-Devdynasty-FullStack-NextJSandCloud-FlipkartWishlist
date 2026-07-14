export default function WishlistSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-details">
        <div className="skeleton-title"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-badge"></div>
      </div>
      <div className="skeleton-actions">
        <div className="skeleton-btn"></div>
        <div className="skeleton-btn"></div>
      </div>
      <style jsx>{`
        .skeleton-card {
          display: flex;
          border: 1px solid #eaeaea;
          border-radius: 12px;
          padding: 20px;
          align-items: center;
          background: white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.04);
        }
        .skeleton-image {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          background: #e0e0e0;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-details {
          flex: 1;
          margin-left: 24px;
        }
        .skeleton-title {
          width: 70%;
          height: 24px;
          background: #e0e0e0;
          margin-bottom: 12px;
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-price {
          width: 30%;
          height: 20px;
          background: #e0e0e0;
          margin-bottom: 12px;
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-badge {
          width: 80px;
          height: 24px;
          background: #e0e0e0;
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-actions {
          margin-left: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 140px;
        }
        .skeleton-btn {
          width: 100%;
          height: 40px;
          background: #e0e0e0;
          border-radius: 6px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { background-color: #e0e0e0; }
          50% { background-color: #f5f5f5; }
          100% { background-color: #e0e0e0; }
        }
        @media (max-width: 600px) {
          .skeleton-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .skeleton-details {
            margin-left: 0;
            margin-top: 16px;
            width: 100%;
          }
          .skeleton-actions {
            margin-left: 0;
            margin-top: 16px;
            width: 100%;
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}
