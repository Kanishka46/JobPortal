import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // simulate backend check
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      setMessage("✅ Password reset link sent to your email (simulated).");
    } else {
      setMessage("❌ No account found with that email address.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "350px",
          backgroundColor: "#f8f9fa",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0d6efd", marginBottom: "20px" }}>
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#0d6efd",
              color: "#fff",
              border: "none",
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.startsWith("✅") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px" }}>
          <Link
            to="/login"
            style={{
              color: "#0d6efd",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
