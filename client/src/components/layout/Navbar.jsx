"use client";

import Link from "next/link";
import WishlistBadge from "../ui/WishlistBadge";

function Navbar({ searchValue = "", onSearchChange }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link href="/">Flipkart</Link>
      </div>

      <div className="navbar-search">
        <input
          type="search"
          placeholder="Search products..."
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
        />
      </div>

      <nav className="navbar-links">
        <Link href="/">Home</Link>
        <Link href="/wishlist">
          Wishlist <WishlistBadge />
        </Link>
        <Link href="/cart">Cart</Link>
        <Link href="/login">Profile</Link>
      </nav>
    </header>
  );
}

export default Navbar;
