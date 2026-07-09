import Link from "next/link";
import WishlistBadge from "../ui/WishlistBadge";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link href="/">Flipkart</Link>
      </div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
        <Link href="/wishlist">
          Wishlist <WishlistBadge />
        </Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Navbar;
