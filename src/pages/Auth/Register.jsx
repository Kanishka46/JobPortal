import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    const result = register(email, password, role);

    if (result.success) {
      alert("Registration successful! Please log in.");
      navigate("/login");
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            style={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>

          <button style={styles.button} type="submit">
            Register
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom right, #0d6efd, #b3d9ff)",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: { color: "#0d6efd" },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
  },
  error: { color: "red" },
};

export default Register;
