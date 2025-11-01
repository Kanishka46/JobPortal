import React, { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
    
    // Only Job Seekers
    const jobSeekers = storedUsers.filter((u) => u.role === "jobseeker");

    setUsers(jobSeekers);
    setApplications(storedApplications);
  }, []);

  // Calculate applications count for each jobseeker
  const getApplicationCount = (email) => {
    return applications.filter((app) => app.fullName && app.appliedJob && app.email === email).length
      || applications.filter(app => app?.applicantEmail === email).length
      || 0;
  };

  // Search filter
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="manage-container">
      <h2 className="page-title">Manage Jobseekers</h2>

      {/* Search */}
      <input
        type="text"
        className="search-box"
        placeholder="Search jobseeker by email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>SI.No</th>
            <th>Email</th>
            <th>Applications Submitted</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, i) => (
            <tr key={i}>
              <td>{indexOfFirstUser + i + 1}</td>
              <td>{user.email}</td>
              <td>{getApplicationCount(user.email)}</td>
            </tr>
          ))}

          {currentUsers.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "10px" }}>
                ❌ No Jobseekers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
          ⬅ Prev
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next ➡
        </button>
      </div>

      {/* Inline CSS */}
      <style>{`
        .manage-container {
          width: 90%;
          margin: auto;
          padding: 20px;
          background: #eef5ff;
          min-height: 100vh;
          font-family: Poppins, sans-serif;
        }

        .page-title {
          text-align: center;
          color: #0b5ed7;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .search-box {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 8px;
          border: 1px solid #99baff;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }

        .data-table th, .data-table td {
          border: 1px solid #d1e3ff;
          padding: 10px;
          text-align: center;
        }

        .data-table th {
          background: #0b5ed7;
          color: white;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-top: 20px;
        }

        .pagination button {
          padding: 8px 14px;
          background: #0b5ed7;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .pagination button:disabled {
          background: #a0c2ff;
          cursor: not-allowed;
        }

        .pagination span {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
