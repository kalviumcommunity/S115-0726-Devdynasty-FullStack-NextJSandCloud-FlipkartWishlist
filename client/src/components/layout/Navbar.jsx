"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import WishlistBadge from "../ui/WishlistBadge";

function Navbar({ searchValue = "", onSearchChange }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem("token"));
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const dropdown = document.querySelector(".profile-dropdown");
      if (dropdown && !dropdown.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link href="/">Flipkart</Link>
      </div>

      <div className="navbar-search">
        <input
          type="search"
          placeholder="Search products, brands, or categories"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          aria-label="Search products"
        />
      </div>

      <nav className="navbar-links">
        <Link href="/">Home</Link>
        <Link href="/wishlist">
          Wishlist <WishlistBadge />
        </Link>
        <Link href="/cart">Cart</Link>

        {isAuthenticated ? (
          <div className="profile-dropdown">
            <button
              type="button"
              className="profile-toggle"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              Account
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link href="/wishlist">My Wishlist</Link>
                <Link href="/cart">My Cart</Link>
                <button type="button" onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>

      <style jsx>{`
        .profile-dropdown {
          position: relative;
        }

        .profile-toggle {
          background: transparent;
          border: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          padding: 0;
          font-weight: 500;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background: white;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 12px;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 20;
        }

        .dropdown-menu a,
        .logout-button {
          padding: 10px 14px;
          border-radius: 12px;
          text-align: left;
          text-decoration: none;
          color: var(--foreground);
          background: transparent;
          border: none;
          font: inherit;
          cursor: pointer;
        }

        .dropdown-menu a:hover,
        .logout-button:hover {
          background: #f8fafc;
        }
      `}</style>
    </header>
  );
}

export default Navbar;
