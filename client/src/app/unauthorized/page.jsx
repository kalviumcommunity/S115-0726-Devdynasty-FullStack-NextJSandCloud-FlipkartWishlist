import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="auth-page">
      <h1>Access denied</h1>
      <p>Your account does not have permission to view this page.</p>
      <Link href="/">Return to home</Link>
    </main>
  );
}
