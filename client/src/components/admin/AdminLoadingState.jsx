export default function AdminLoadingState() {
  return (
    <div className="admin-status-card admin-loading-state" role="status" aria-live="polite">
      <div className="loader" aria-hidden="true" />
      <div>
        <h2>Loading products</h2>
        <p>Please wait while we fetch the latest product inventory.</p>
      </div>

      <style jsx>{`
        .admin-status-card {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 28px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
        }

        .admin-loading-state h2 {
          margin: 0 0 8px 0;
          font-size: 20px;
          color: var(--foreground);
        }

        .admin-loading-state p {
          margin: 0;
          color: #64748b;
          line-height: 1.6;
        }

        .loader {
          width: 44px;
          height: 44px;
          border: 5px solid #e2e8f0;
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
