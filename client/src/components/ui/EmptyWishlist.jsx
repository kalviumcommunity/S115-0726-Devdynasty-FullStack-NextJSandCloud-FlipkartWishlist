import Link from "next/link";

export default function EmptyWishlist() {
  return (
    <div className="empty-state">
      <div className="empty-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="empty-icon"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
      <h2>Your wishlist is empty!</h2>
      <p>Looks like you haven't added anything to your wishlist yet.</p>
      <Link href="/" className="btn-primary">
        Browse Products
      </Link>
      <style jsx>{`
        .empty-state {
          text-align: center;
          padding: 80px 24px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          margin: 40px auto;
          max-width: 480px;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .empty-icon-container {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 96px;
          height: 96px;
          background: linear-gradient(135deg, #fce8e6 0%, #fef2f2 100%);
          color: #d32f2f;
          border-radius: 50%;
          margin-bottom: 24px;
          animation: pulseIcon 2s infinite;
        }
        @keyframes pulseIcon {
          0% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.15); }
          70% { box-shadow: 0 0 0 15px rgba(211, 47, 47, 0); }
          100% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0); }
        }
        .empty-state h2 {
          margin: 0 0 12px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }
        .empty-state p {
          margin-bottom: 32px;
          color: #64748b;
          font-size: 16px;
          line-height: 1.5;
        }
        .btn-primary {
          display: inline-block;
          background-color: var(--primary, #2874f0);
          color: white;
          padding: 14px 36px;
          text-decoration: none;
          border-radius: 999px;
          font-weight: 600;
          font-size: 16px;
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
