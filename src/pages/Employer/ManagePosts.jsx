import React, { useState, useEffect } from "react";

const ManagePosts = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });
  const [editingJobId, setEditingJobId] = useState(null);

  // ✅ Load jobs from localStorage on mount
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  // ✅ Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update job
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.salary ||
      !formData.description
    ) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    if (editingJobId) {
      // Update existing job
      const updatedJobs = jobs.map((job) =>
        job.id === editingJobId
          ? { ...formData, id: editingJobId, date: job.date }
          : job
      );
      setJobs(updatedJobs);
      setEditingJobId(null);
    } else {
      // Add new job
      const newJob = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
      };
      setJobs([...jobs, newJob]);
    }

    // Reset form
    setFormData({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });
  };

  // ✅ Edit a job
  const handleEdit = (job) => {
    setEditingJobId(job.id);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      description: job.description,
    });
  };

  // ✅ Delete a job
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        {editingJobId ? "Edit Job Post" : "Add a New Job Post"}
      </h2>

      {/* Job Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
        ></textarea>

        <button type="submit" style={styles.addBtn}>
          {editingJobId ? "Update Job" : "Add Job"}
        </button>
      </form>

      {/* Job List */}
      <h3 style={{ marginTop: "40px", color: "#0d6efd" }}>Your Posted Jobs</h3>

      {jobs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No jobs posted yet.</p>
      ) : (
        <div style={styles.jobList}>
          {jobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <h3 style={{ color: "#0d6efd" }}>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p>{job.description}</p>
              <p style={{ color: "#6c757d" }}>
                <em>Posted on: {job.date}</em>
              </p>
              <div>
                <button onClick={() => handleEdit(job)} style={styles.editBtn}>
                  Edit
                </button>
                <button onClick={() => handleDelete(job.id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Inline Styles ---
const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    color: "#0d6efd",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  addBtn: {
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  jobList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  jobCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
  },
  editBtn: {
    backgroundColor: "#ffc107",
    color: "#000",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ManagePosts;
