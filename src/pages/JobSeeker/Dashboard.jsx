import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth(); // assuming user has { username, email, role }
  const [stats, setStats] = useState([
    { label: "Jobs Applied", value: 0 },
    { label: "Saved Jobs", value: 0 },
    { label: "Interviews", value: 0 },
  ]);

  // ✅ Fetch counts from localStorage if they exist
  useEffect(() => {
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const interviews = JSON.parse(localStorage.getItem("interviews")) || [];

    setStats([
      { label: "Jobs Applied", value: appliedJobs.length },
      { label: "Saved Jobs", value: savedJobs.length },
      { label: "Interviews", value: interviews.length },
    ]);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome, {user?.username || "Job Seeker"} 👋</h2>
      <p style={styles.subtext}>Here’s your personalized job dashboard.</p>

      <div style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <h3 style={styles.statValue}>{stat.value}</h3>
            <p style={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Inline Styles ---
const styles = {
  container: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
  },
  heading: {
    color: "#0d6efd",
    fontSize: "28px",
    marginBottom: "10px",
  },
  subtext: {
    color: "#555",
    fontSize: "16px",
    marginBottom: "40px",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px",
  },
  statCard: {
    backgroundColor: "#e9f1ff",
    borderRadius: "16px",
    width: "200px",
    height: "140px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
  },
  statValue: {
    fontSize: "28px",
    color: "#0d6efd",
    margin: 0,
  },
  statLabel: {
    fontSize: "16px",
    color: "#333",
    marginTop: "8px",
  },
};

export default Dashboard;
