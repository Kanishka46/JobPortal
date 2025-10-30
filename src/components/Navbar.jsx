import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = {
    color: "#0d6efd",
    textDecoration: "none",
    margin: "0 12px",
    fontWeight: "500",
  };

  const buttonStyle = {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "10px 40px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <h2 style={{ color: "#0d6efd", margin: 0, fontWeight: "700" }}>JobPortal</h2>

      {/* Links */}
      <div>
        {!user && (
          <>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}

        {user?.role === "jobseeker" && (
          <>
            <Link to="/jobs" style={linkStyle}>Find Jobs</Link>
            {/* <Link to="/applications" style={linkStyle}>My Applications</Link> */}
            {/* <Link to="/profile" style={linkStyle}>Profile</Link> */}
            <Link to="/applications" style={linkStyle}>My Applications</Link>

            <NavLink to="/jobseeker/profile" style={linkStyle}>Profile</NavLink>

            <button style={buttonStyle} onClick={handleLogout}>Logout</button>
          </>
        )}

        {user?.role === "employer" && (
          <>
            <Link to="/employer/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/employer/post-job" style={linkStyle}>Applications</Link>
            <Link to="/employer/manage-posts" style={linkStyle}>Manage Jobs</Link>
            <button style={buttonStyle} onClick={handleLogout}>Logout</button>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/admin/manage-users" style={linkStyle}>Manage Users</Link>
            <Link to="/admin/manage-jobs" style={linkStyle}>Manage Jobs</Link>
            <button style={buttonStyle} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
