"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { post } from "../../services/api";
import Navbar from "@/components/layout/Navbar";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await post("/api/auth/signup", { name, email, password });
      setMessage("Account created successfully. Redirecting to login...");
      setTimeout(() => router.push("/login"), 600);
    } catch (error) {
      setError(error.message || "Signup failed.");
    }
  }

  return (
    <div>
      <Navbar />
      <main className="auth-page">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button type="submit">Signup</button>
        </form>

        <p className="auth-toggle">
          Already have an account? <Link href="/login">Login here</Link>
        </p>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </main>
    </div>
  );
}
