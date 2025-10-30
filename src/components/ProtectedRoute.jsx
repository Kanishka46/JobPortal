import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // If not logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If logged in but not authorized
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  // Otherwise, allow access
  return children;
};

export default ProtectedRoute;
