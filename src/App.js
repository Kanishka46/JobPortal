

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/JobSeeker/Dashboard";
import Profile from "./pages/JobSeeker/Profile";
import Applications from "./pages/JobSeeker/Applications";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import ManagePosts from "./pages/Employer/ManagePosts";






// --- page styles ---
const pageStyle = {
  textAlign: "center",
  paddingTop: "100px",
  color: "#0d6efd",
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
};

// --- dashboards for each role ---
const JobSeekerDashboard = () => (
  <div style={pageStyle}>
    <h2>Welcome, Job Seeker</h2>
    <p>Browse and apply for jobs!</p>
  </div>
);

// const EmployerDashboard = () => (
//   <div style={pageStyle}>
//     <h2>Welcome, Employer</h2>
//     <p>Post and manage job listings!</p>
//   </div>
// );

const AdminDashboard = () => (
  <div style={pageStyle}>
    <h2>Welcome, Admin</h2>
    <p>Manage users and monitor the platform.</p>
  </div>
);

// --- main content wrapper ---
function AppContent() {
  const location = useLocation();

  // hide footer + navbar on login/register pages
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/"||
      location.pathname === "/profile";

  return (
    <>
      {/* ✅ Navbar only shows when user is inside dashboard or logged in */}
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />


        {/* Protected routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={["jobseeker"]}>
            <Dashboard/>
            </ProtectedRoute>
          }
        />
        <Route
  path="/jobseeker/profile"
  element={
    <ProtectedRoute allowedRoles={["jobseeker"]}>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/applications"
  element={
    <ProtectedRoute allowedRoles={["jobseeker"]}>
      <Applications />
    </ProtectedRoute>
  }
/>


        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/employer/manage-posts"
  element={
    <ProtectedRoute allowedRoles={["employer"]}>
      <ManagePosts />
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ✅ Footer hidden on login/register */}
      {!hideLayout && location.pathname !== "/jobseeker/profile" && <Footer />}

    </>
  );
}

// --- main app with router wrapper ---
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
