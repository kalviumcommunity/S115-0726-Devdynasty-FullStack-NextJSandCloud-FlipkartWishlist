export default function AdminEmptyState() {
  return (
    <div className="admin-status-card admin-empty-state">
      <div className="empty-icon" aria-hidden="true">📦</div>
      <div>
        <h2>No products found</h2>
        <p>Your product catalog is currently empty. Add items in the database to see them appear here.</p>
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

        .empty-icon {
          width: 54px;
          height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          border-radius: 18px;
          background: #eff6ff;
        }

        .admin-empty-state h2 {
          margin: 0 0 8px 0;
          font-size: 20px;
          color: var(--foreground);
        }

        .admin-empty-state p {
          margin: 0;
          color: #64748b;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
