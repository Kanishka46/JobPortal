import React, { useEffect, useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem("jobApplications")) || [];
    setApplications(storedApps);
  }, []);

  const handleWithdraw = (id) => {
    const updated = applications.filter((app) => app.id !== id);
    setApplications(updated);
    localStorage.setItem("jobApplications", JSON.stringify(updated));
    alert("Application withdrawn successfully!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Applications</h2>

      {applications.length === 0 ? (
        <p style={styles.noData}>You haven't applied for any jobs yet.</p>
      ) : (
        <div style={styles.grid}>
          {applications.map((app) => (
            <div key={app.id} style={styles.card}>
              <h3 style={styles.title}>{app.title}</h3>
              <p style={styles.company}>{app.company}</p>
              <p>
                <strong>Location:</strong> {app.location}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      app.status === "Pending"
                        ? "#ffc107"
                        : app.status === "Accepted"
                        ? "#198754"
                        : "#dc3545",
                  }}
                >
                  {app.status}
                </span>
              </p>
              <button style={styles.withdrawBtn} onClick={() => handleWithdraw(app.id)}>
                Withdraw
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f8f9fa",
    minHeight: "80vh",
  },
  heading: {
    color: "#0d6efd",
    textAlign: "center",
    marginBottom: "30px",
  },
  noData: {
    textAlign: "center",
    color: "#555",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  title: {
    color: "#0d6efd",
    marginBottom: "5px",
  },
  company: {
    color: "#555",
    marginBottom: "10px",
  },
  withdrawBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Applications;
