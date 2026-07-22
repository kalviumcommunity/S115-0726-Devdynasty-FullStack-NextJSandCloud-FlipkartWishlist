import React from "react";
import Link from "next/link";

export default function ErrorState({ message, onRetry, actionText = "Try Again", actionLink }) {
  const isAuthError = message?.toLowerCase().includes("login") || message?.toLowerCase().includes("unauthorized");

  return (
    <div className="error-state">
      <div className="error-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="error-icon"
        >
          {isAuthError ? (
            <>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </>
          ) : (
            <>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </>
          )}
        </svg>
      </div>
      <h2>{isAuthError ? "Authentication Required" : "Oops! Something went wrong"}</h2>
      <p>{message || "We encountered an unexpected error. Please try again."}</p>
      
      <div className="error-actions">
        {isAuthError || actionLink ? (
          <Link href={isAuthError ? "/login" : actionLink} className="btn-primary">
            {isAuthError ? "Login Now" : actionText}
          </Link>
        ) : (
          <button onClick={onRetry} className="btn-primary">
            {actionText}
          </button>
        )}
      </div>

      <style jsx>{`
        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 64px 24px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          margin: 40px auto;
          max-width: 480px;
          animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .error-icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          background-color: ${isAuthError ? "#e0f2fe" : "#fee2e2"};
          color: ${isAuthError ? "#0284c7" : "#ef4444"};
          border-radius: 50%;
          margin-bottom: 24px;
        }
        .error-state h2 {
          margin: 0 0 12px 0;
          color: #1e293b;
          font-size: 22px;
          font-weight: 700;
        }
        .error-state p {
          margin-bottom: 32px;
          color: #64748b;
          font-size: 16px;
          line-height: 1.5;
        }
        .error-actions {
          display: flex;
          gap: 16px;
        }
        .btn-primary {
          display: inline-block;
          background-color: var(--primary, #2874f0);
          color: white;
          padding: 12px 28px;
          text-decoration: none;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(40, 116, 240, 0.25);
        }
        .btn-primary:hover {
          background-color: var(--primary-hover, #1e5bb8);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(40, 116, 240, 0.35);
        }
        .btn-primary:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
