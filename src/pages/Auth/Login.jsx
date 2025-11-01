// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const result = login(email, password);

//     if (result.success) {
//       if (result.role === "admin") navigate("/admin/dashboard");
//       else if (result.role === "employer") navigate("/employer/dashboard");
//       else navigate("/jobs");
//     } else {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             style={styles.input}
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             style={styles.input}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <p style={{ textAlign: "center" }}>
//   <Link
//     to="/forgot-password"
//     style={{ color: "#0d6efd", textDecoration: "none" }}
//   >
//     Forgot Password?
//   </Link>
// </p>

//           <button style={styles.button} type="submit">
//             Login
//           </button>
//         </form>
//         {error && <p style={styles.error}>{error}</p>}
//         <p style={{ marginTop: "10px" }}>
//           Don't have an account? <Link to="/register">Register here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#ffffff"
//     //"linear-gradient(to bottom right, #0d6efd, #b3d9ff)",
//   },
//   card: {
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "12px",
//     width: "350px",
//     textAlign: "center",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   },
//   title: { color: "#0d6efd" },
//   input: {
//     width: "100%",
//     padding: "10px",
//     margin: "8px 0",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     background: "#0d6efd",
//     color: "#fff",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "8px",
//     width: "100%",
//     cursor: "pointer",
//   },
//   error: { color: "red" },
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(email, password);

    if (result.success) {

      // ✅ Store login count in localStorage
      const logs = JSON.parse(localStorage.getItem("dailyLogs")) || [];
      const today = new Date().toISOString().split("T")[0];

      let todayLog = logs.find(log => log.date === today);

      if (todayLog) {
        todayLog.logins += 1;
      } else {
        logs.push({ date: today, logins: 1, logouts: 0 });
      }

      localStorage.setItem("dailyLogs", JSON.stringify(logs));

      // ✅ Navigate based on role
      if (result.role === "admin") navigate("/admin/dashboard");
      else if (result.role === "employer") navigate("/employer/dashboard");
      else navigate("/jobs");

    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
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
          
          <p style={{ textAlign: "center" }}>
            <Link
              to="/forgot-password"
              style={{ color: "#0d6efd", textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </p>

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/register">Register here</Link>
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
    background: "#ffffff",
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

export default Login;
