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
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 100;
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-card {
          width: min(100%, 540px);
          background: rgba(255, 255, 255, 0.98);
          border-radius: 28px;
          padding: 32px 36px;
          box-shadow: 
            0 32px 64px -12px rgba(15, 23, 42, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .modal-header {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .modal-eyebrow {
          margin: 0;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          background: linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.03em;
        }

        .modal-description {
          margin: 6px 0 0;
          color: #64748b;
          line-height: 1.6;
          font-size: 15px;
        }

        .modal-form {
          display: grid;
          gap: 20px 16px;
          grid-template-columns: 1fr 1fr;
        }

        /* 
          Using :global because the field-groups are passed as children 
          from the parent component, so they don't have this component's jsx hash.
        */
        :global(.modal-form > .field-group) {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* Title, Category, Image, Description take full width */
        :global(.modal-form > .field-group:nth-child(1)),
        :global(.modal-form > .field-group:nth-child(4)),
        :global(.modal-form > .field-group:nth-child(5)),
        :global(.modal-form > .field-group:nth-child(6)) {
          grid-column: span 2;
        }

        /* Price and Stock take half width */
        :global(.modal-form > .field-group:nth-child(2)),
        :global(.modal-form > .field-group:nth-child(3)) {
          grid-column: span 1;
        }

        :global(.field-group label) {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
          margin-left: 4px;
        }

        :global(.field-group input),
        :global(.field-group textarea) {
          width: 100%;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 15px;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: inherit;
          box-shadow: 0 2px 4px rgba(15, 23, 42, 0.02) inset;
        }

        :global(.field-group textarea) {
          resize: vertical;
          min-height: 100px;
          line-height: 1.5;
        }

        :global(.field-group input:focus),
        :global(.field-group textarea:focus) {
          border-color: var(--primary);
          background: white;
          box-shadow: 
            0 0 0 4px rgba(37, 99, 235, 0.12),
            0 2px 4px rgba(15, 23, 42, 0.02) inset;
          transform: translateY(-1px);
        }

        .error-banner {
          grid-column: span 2;
          border: 1px solid rgba(239, 68, 68, 0.3);
          background: rgba(254, 226, 226, 0.4);
          color: #b91c1c;
          padding: 14px 16px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-actions {
          grid-column: span 2;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 8px;
          padding-top: 24px;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
        }

        .secondary-button,
        .primary-button {
          border: none;
          border-radius: 999px;
          padding: 12px 24px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .secondary-button {
          background: #f1f5f9;
          color: #475569;
        }

        .secondary-button:hover:not(:disabled) {
          background: #e2e8f0;
          color: #0f172a;
          transform: translateY(-2px);
        }

        .primary-button {
          background: linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%);
          color: white;
          box-shadow: 0 8px 16px -4px rgba(37, 99, 235, 0.3);
        }

        .primary-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px -4px rgba(37, 99, 235, 0.4);
        }

        .secondary-button:disabled,
        .primary-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          filter: grayscale(20%);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { 
            transform: scale(0.96) translateY(12px);
            opacity: 0;
          }
          to { 
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .modal-form {
            grid-template-columns: 1fr;
          }
          :global(.modal-form > .field-group) {
            grid-column: span 1 !important;
          }
          .modal-actions {
            grid-column: span 1;
            flex-direction: column-reverse;
          }
          .secondary-button,
          .primary-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
