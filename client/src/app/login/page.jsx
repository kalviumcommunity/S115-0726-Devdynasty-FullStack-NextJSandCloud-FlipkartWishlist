"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "../../services/api";
import Navbar from "../../components/layout/Navbar";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const data = await post("/api/auth/login", { email, password });
      if (data.token) {
         localStorage.setItem("token", data.token); // Store token if the API returns it
      }
      setMessage("Login successful. Redirecting to home...");
      setTimeout(() => router.push("/"), 500);
    } catch (error) {
      setError(error.message || "Login failed.");
    }
  }

  return (
    <div>
      <Navbar />
      <main className="auth-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="auth-form">
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
          <button type="submit">Login</button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </main>
    </div>
  );
}
