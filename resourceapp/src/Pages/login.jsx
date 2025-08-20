import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://full-stack-4iu6.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.Error || "Failed to login");
      }

      // ✅ Save tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}. Please login again.`);
    } finally {
      setLoading(false);
      setUser({ email: "", password: "" });
    }
  }

  return (
    <>
      <h2>Welcome to Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
};
