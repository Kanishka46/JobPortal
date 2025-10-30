import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  // ✅ Load jobs from localStorage
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  // ✅ Filter, search, and sort jobs
  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        filterLocation === "All" || job.location === filterLocation;
      return matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

  // Unique locations for filter dropdown
  const uniqueLocations = ["All", ...new Set(jobs.map((job) => job.location))];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employer Dashboard</h2>

      {/* Search, Filter, Sort */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />

        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          style={styles.select}
        >
          {uniqueLocations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={styles.select}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Job List */}
      {filteredJobs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          No jobs found. Try adjusting your filters.
        </p>
      ) : (
        <div style={styles.jobList}>
          {filteredJobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <h3 style={styles.jobTitle}>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p style={styles.description}>{job.description}</p>
              <p style={styles.date}><em>Posted on: {job.date}</em></p>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <Link to="/employer/manage-posts" style={styles.manageLink}>
          ✏️ Manage Your Posts
        </Link>
      </div>
    </div>
  );
};

// --- Inline Styles ---
const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    color: "#0d6efd",
    marginBottom: "30px",
  },
  filters: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  searchInput: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    width: "250px",
  },
  select: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  jobList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  jobCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
  jobTitle: {
    color: "#0d6efd",
    marginBottom: "8px",
  },
  description: {
    color: "#333",
    fontSize: "14px",
    margin: "8px 0",
  },
  date: {
    color: "#777",
    fontSize: "13px",
  },
  manageLink: {
    display: "inline-block",
    backgroundColor: "#0d6efd",
    color: "white",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "6px",
  },
};

export default EmployerDashboard;
