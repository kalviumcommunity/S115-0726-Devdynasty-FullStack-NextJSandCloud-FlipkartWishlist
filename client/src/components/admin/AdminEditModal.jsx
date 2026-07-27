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
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 60;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-card {
          width: min(100%, 480px);
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 28px 60px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .modal-header {
          margin-bottom: 24px;
        }

        .modal-eyebrow {
          margin: 0 0 8px;
          font-size: 12px;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }

        .modal-header h3 {
          margin: 0 0 8px;
          font-size: 26px;
          font-weight: 800;
          color: var(--foreground);
          letter-spacing: -0.02em;
        }

        .modal-description {
          margin: 0;
          color: #64748b;
          line-height: 1.6;
          font-size: 15px;
        }

        .modal-form {
          display: grid;
          gap: 18px;
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

        .field-group input,
        .field-group textarea {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 15px;
          color: var(--foreground);
          background: #f8fafc;
          outline: none;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .field-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .field-group input:focus,
        .field-group textarea:focus {
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .error-banner {
          border: 1px solid rgba(239, 68, 68, 0.3);
          background: rgba(254, 226, 226, 0.5);
          color: #b91c1c;
          padding: 14px 16px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 500;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 12px;
        }

        .secondary-button,
        .primary-button {
          border: none;
          border-radius: 999px;
          padding: 12px 20px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .secondary-button {
          background: #f1f5f9;
          color: #334155;
        }

        .secondary-button:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }

        .primary-button {
          background: linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .primary-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
        }

        .secondary-button:disabled,
        .primary-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}
