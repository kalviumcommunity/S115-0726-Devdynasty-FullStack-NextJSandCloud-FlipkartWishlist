import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/api";

function Signup() {
  const navigate = useNavigate();
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
      setTimeout(() => navigate("/login"), 600);
    } catch (error) {
      setError(error.message || "Signup failed.");
    }
  }

  return (
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

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </main>
  );
}

export default Signup;
