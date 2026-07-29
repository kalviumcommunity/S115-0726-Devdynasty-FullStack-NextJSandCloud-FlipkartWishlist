"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Session expired or not logged in.");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        const res = await fetch("/api/auth/me", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else if (res.status === 401 || res.status === 403) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("token");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          setError("Failed to load profile. Please try again later.");
        }
      } catch (err) {
        setError("Network failure. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card skeleton-card">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-line medium" style={{ margin: "20px auto 10px" }}></div>
          <div className="skeleton-line small" style={{ margin: "0 auto 30px" }}></div>
          <div className="skeleton-details">
            <div className="skeleton-line short"></div>
            <div className="skeleton-line medium" style={{ marginTop: '12px' }}></div>
            <div className="skeleton-line short" style={{ marginTop: '12px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message" style={{ width: '100%' }}>{error}</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-wrapper">
          <div className="avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-email">{user.email}</p>

        <div className="profile-details">
          {user.id && (
            <div className="detail-item">
              <span className="detail-label">User ID</span>
              <span className="detail-value">#{user.id}</span>
            </div>
          )}
          {user.role && (
            <div className="detail-item">
              <span className="detail-label">Role</span>
              <span className="detail-value badge">{user.role}</span>
            </div>
          )}
          {user.createdAt && (
            <div className="detail-item">
              <span className="detail-label">Member Since</span>
              <span className="detail-value">{new Date(user.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          )}
        </div>

        <button className="primary-btn logout-btn" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}>
          Logout
        </button>
      </div>

      <style jsx>{`
        .profile-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          display: flex;
          justify-content: center;
          animation: fadeIn 0.4s ease-out;
        }

        .profile-card {
          width: 100%;
          background: var(--card-bg, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 24px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .profile-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 50px -15px rgba(15, 23, 42, 0.15);
        }

        .avatar-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .avatar {
          width: 96px;
          height: 96px;
          background: linear-gradient(135deg, var(--primary, #2563eb) 0%, #3b82f6 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: 700;
          box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.4);
          transition: transform 0.3s ease;
        }
        
        .avatar:hover {
          transform: scale(1.05);
        }

        .profile-name {
          font-size: 28px;
          font-weight: 800;
          margin: 0 0 8px 0;
          color: var(--foreground, #0f172a);
        }

        .profile-email {
          font-size: 16px;
          color: #64748b;
          margin: 0 0 32px 0;
        }

        .profile-details {
          background: #f8fafc;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          text-align: left;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .detail-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        
        .detail-item:first-child {
          padding-top: 0;
        }

        .detail-label {
          font-weight: 600;
          color: #475569;
          font-size: 14px;
        }

        .detail-value {
          font-weight: 600;
          color: var(--foreground, #0f172a);
          font-size: 14px;
        }
        
        .badge {
          background: rgba(37, 99, 235, 0.1);
          color: var(--primary, #2563eb);
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .logout-btn {
          width: 100%;
          padding: 14px;
          font-size: 16px;
        }
        
        .skeleton-card {
          padding-top: 40px;
        }

        .skeleton-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          margin: 0 auto 24px;
          background: linear-gradient(90deg, rgba(226,232,240,1) 0%, rgba(241,245,249,1) 50%, rgba(226,232,240,1) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
        
        .skeleton-details {
          background: #f8fafc;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          text-align: left;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
