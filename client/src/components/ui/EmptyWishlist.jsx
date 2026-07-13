import Link from "next/link";

export default function EmptyWishlist() {
  return (
    <div className="empty-state">
      <h2>Your wishlist is empty!</h2>
      <p>Explore more and shortlist some items.</p>
      <Link href="/" className="btn-primary">
        Browse Products
      </Link>
      <style jsx>{`
        .empty-state {
          text-align: center;
          padding: 64px 24px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          margin: 40px auto;
          max-width: 400px;
        }
        .empty-state h2 {
          margin: 0 0 12px 0;
          color: #333;
          font-size: 22px;
        }
        .empty-state p {
          margin-bottom: 24px;
          color: #666;
          font-size: 16px;
        }
        .btn-primary {
          display: inline-block;
          background-color: #2874f0;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        .btn-primary:hover {
          background-color: #1e5bb8;
        }
      `}</style>
    </div>
  );
}
