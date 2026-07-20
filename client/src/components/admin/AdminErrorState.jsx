export default function AdminErrorState({ message }) {
  return (
    <div className="admin-status-card admin-error-state" role="alert">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <div>
        <h2>Unable to load products</h2>
        <p>{message || "Something went wrong while fetching product data."}</p>
      </div>

      <style jsx>{`
        .admin-status-card {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 28px;
          background: #fff7f6;
          border: 1px solid #f4c4c0;
          border-radius: 20px;
          color: #7f1d1d;
        }

        .error-icon {
          width: 54px;
          height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          border-radius: 18px;
          background: #fee2e2;
        }

        .admin-error-state h2 {
          margin: 0 0 8px 0;
          font-size: 20px;
        }

        .admin-error-state p {
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
