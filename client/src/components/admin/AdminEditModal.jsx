export default function AdminEditModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  onSubmit,
  isSubmitting,
  submitLabel = "Save changes",
  error,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">Admin action</p>
            <h3>{title}</h3>
            <p className="modal-description">{description}</p>
          </div>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          {children}

          {error ? <div className="error-banner">{error}</div> : null}

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 60;
        }

        .modal-card {
          width: min(100%, 480px);
          background: white;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 28px 60px rgba(15, 23, 42, 0.2);
        }

        .modal-header {
          margin-bottom: 20px;
        }

        .modal-eyebrow {
          margin: 0 0 8px;
          font-size: 12px;
          font-weight: 800;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }

        .modal-header h3 {
          margin: 0 0 8px;
          font-size: 24px;
          color: var(--foreground);
        }

        .modal-description {
          margin: 0;
          color: #64748b;
          line-height: 1.6;
        }

        .modal-form {
          display: grid;
          gap: 16px;
        }

        .field-group {
          display: grid;
          gap: 8px;
        }

        .field-group label {
          font-size: 14px;
          font-weight: 700;
          color: #334155;
        }

        .field-group input {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 15px;
          color: var(--foreground);
          outline: none;
        }

        .field-group input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.16);
        }

        .error-banner {
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #b91c1c;
          padding: 12px 14px;
          border-radius: 14px;
          font-size: 14px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 8px;
        }

        .secondary-button,
        .primary-button {
          border: none;
          border-radius: 999px;
          padding: 11px 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .secondary-button {
          background: #f1f5f9;
          color: #334155;
        }

        .primary-button {
          background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
          color: white;
        }

        .secondary-button:disabled,
        .primary-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
