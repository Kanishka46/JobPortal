

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

import EmployerProfile from "./pages/Employer/EmployerProfile";
import JobList from "./pages/JobSeeker/JobList";
import EmployerApplications from "./pages/Employer/EmployerApplications";


import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminManageJobs from "./pages/Admin/AdminManageJobs";
import ManageUsers from "./pages/Admin/ManageUsers";





// --- page styles ---
const pageStyle = {
  textAlign: "center",
  paddingTop: "100px",
  color: "#0d6efd",
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
};



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
        <Route path="/admin/managejobs" element={<AdminManageJobs />} />


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
  path="/employer/profile"
  element={
    <ProtectedRoute allowedRoles={["employer"]}>
      <EmployerProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/employer/applications"
  element={
    <ProtectedRoute allowedRoles={["employer"]}>
      <EmployerApplications />
    </ProtectedRoute>
  }
/>

<Route
          path="/joblist"
          element={
            <ProtectedRoute allowedRoles={["jobseeker"]}>
              <JobList />
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
<Route
  path="/admin/manageusers"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <ManageUsers />
    </ProtectedRoute>
  }
/>


        
      </Routes>

      {/* ✅ Footer hidden on login/register */}
     {/* ✅ Hide Footer only on login/register/profile AND manage-posts */}
{!(
  location.pathname === "/login" ||
  location.pathname === "/register" ||
  location.pathname === "/" ||
  location.pathname === "/jobseeker/profile" ||
  location.pathname === "/employer/profile" ||
  location.pathname === "/employer/manage-posts"||
  location.pathname==="/applications"||
  location.pathname==="/admin/dashboard"||
  location.pathname==="/admin/managejobs"||
  location.pathname==="/admin/manageusers"
) && <Footer />}


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
