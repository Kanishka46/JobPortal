// import React, { useState, useEffect } from "react";

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     fullName: "",
//     phone: "",
//     location: "",
//     email: "",
//     resumeUrl: "",
//     workExperience: "",
//     education: "",
//     projects: "",
//     skills: "",
//     preferredRoles: "",
//     industries: "",
//     preferredLocation: "",
//     salaryExpectations: "",
//   });

//   const [editMode, setEditMode] = useState(true);

//   // ✅ Load from localStorage on mount
//   useEffect(() => {
//     const storedProfile = JSON.parse(localStorage.getItem("jobSeekerProfile"));
//     if (storedProfile) {
//       setProfile(storedProfile);
//       setEditMode(false);
//     }
//   }, []);

//   // ✅ Save to localStorage whenever profile changes
//   const handleSave = () => {
//     localStorage.setItem("jobSeekerProfile", JSON.stringify(profile));
//     setEditMode(false);
//     alert("Profile saved successfully!");
//   };

//   // ✅ Handle input updates
//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle resume upload
//   const handleResumeUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const resumeUrl = URL.createObjectURL(file);
//       setProfile({ ...profile, resumeUrl });
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Job Seeker Profile</h2>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Personal & Contact Information</h3>

//         <div style={styles.formGroup}>
//           <label>Full Name:</label>
//           <input
//             type="text"
//             name="fullName"
//             value={profile.fullName}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Phone Number:</label>
//           <input
//             type="text"
//             name="phone"
//             value={profile.phone}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Location:</label>
//           <input
//             type="text"
//             name="location"
//             value={profile.location}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Email Address:</label>
//           <input
//             type="email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Upload Resume:</label>
//           {editMode && (
//             <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
//           )}
//           {profile.resumeUrl && (
//             <p>
//               <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
//                 View Uploaded Resume
//               </a>
//             </p>
//           )}
//         </div>
//       </div>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Professional & Educational Background</h3>

//         <div style={styles.formGroup}>
//           <label>Work Experience:</label>
//           <textarea
//             name="workExperience"
//             value={profile.workExperience}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.textarea}
//             placeholder="E.g., Software Engineer at XYZ Corp (2020–2024)"
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Education:</label>
//           <textarea
//             name="education"
//             value={profile.education}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.textarea}
//             placeholder="E.g., B.Tech in CSE, ABC University, 2020"
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Projects:</label>
//           <textarea
//             name="projects"
//             value={profile.projects}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.textarea}
//             placeholder="E.g., Grocery Ordering System using MERN Stack"
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Skills:</label>
//           <input
//             type="text"
//             name="skills"
//             value={profile.skills}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.input}
//             placeholder="E.g., React, Node.js, JavaScript, Python"
//           />
//         </div>
//       </div>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Job Preferences</h3>

//         <div style={styles.formGroup}>
//           <label>Preferred Roles:</label>
//           <input
//             type="text"
//             name="preferredRoles"
//             value={profile.preferredRoles}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Industries:</label>
//           <input
//             type="text"
//             name="industries"
//             value={profile.industries}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Preferred Location:</label>
//           <input
//             type="text"
//             name="preferredLocation"
//             value={profile.preferredLocation}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label>Salary Expectations:</label>
//           <input
//             type="text"
//             name="salaryExpectations"
//             value={profile.salaryExpectations}
//             onChange={handleChange}
//             disabled={!editMode}
//             style={styles.input}
//           />
//         </div>
//       </div>

//       <div style={styles.buttonGroup}>
//         {editMode ? (
//           <button style={styles.saveBtn} onClick={handleSave}>
//             Save Profile
//           </button>
//         ) : (
//           <button style={styles.editBtn} onClick={() => setEditMode(true)}>
//             Edit Profile
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// // --- Styles ---
// const styles = {
//   container: {
//     backgroundColor: "#ffffff",
//     padding: "40px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     margin: "40px auto",
//     width: "80%",
//     maxWidth: "900px",
//   },
//   heading: {
//     textAlign: "center",
//     color: "#0d6efd",
//     fontSize: "28px",
//     marginBottom: "30px",
//   },
//   section: {
//     marginBottom: "30px",
//   },
//   sectionTitle: {
//     fontSize: "20px",
//     color: "#0d6efd",
//     borderBottom: "2px solid #0d6efd",
//     paddingBottom: "6px",
//     marginBottom: "15px",
//   },
//   formGroup: {
//     marginBottom: "15px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     fontSize: "14px",
//   },
//   textarea: {
//     width: "100%",
//     height: "80px",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     fontSize: "14px",
//   },
//   buttonGroup: {
//     textAlign: "center",
//     marginTop: "20px",
//   },
//   editBtn: {
//     backgroundColor: "#0d6efd",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },
//   saveBtn: {
//     backgroundColor: "#198754",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },
// };

// export default Profile;
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    location: "",
    email: "",
    resumeUrl: "",
    workExperience: "",
    education: "",
    projects: "",
    skills: "",
    preferredRoles: "",
    industries: "",
    preferredLocation: "",
    salaryExpectations: "",
  });

  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("jobSeekerProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
      setEditMode(false);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("jobSeekerProfile", JSON.stringify(profile));
    setEditMode(false);
    alert("Profile saved successfully!");
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const resumeUrl = URL.createObjectURL(file);
      setProfile({ ...profile, resumeUrl });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Seeker Profile</h2>

      {/* 🔹 Personal & Contact Info */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Personal & Contact Information</h3>

        <div style={styles.gridWithGap}>
          <div style={styles.formGroup}>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              disabled={!editMode}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editMode}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              disabled={!editMode}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editMode}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label>Upload Resume:</label>
          {editMode && (
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          )}
          {profile.resumeUrl && (
            <p>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                View Uploaded Resume
              </a>
            </p>
          )}
        </div>
      </div>

      {/* 🔹 Professional & Educational Background */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Professional & Educational Background</h3>

        <div style={styles.formGroup}>
          <label>Work Experience:</label>
          <textarea
            name="workExperience"
            value={profile.workExperience}
            onChange={handleChange}
            disabled={!editMode}
            style={styles.textarea}
            placeholder="E.g., Software Engineer at XYZ Corp (2020–2024)"
          />
        </div>

        <div style={styles.formGroup}>
          <label>Education:</label>
          <textarea
            name="education"
            value={profile.education}
            onChange={handleChange}
            disabled={!editMode}
            style={styles.textarea}
            placeholder="E.g., B.Tech in CSE, ABC University, 2020"
          />
        </div>

        <div style={styles.formGroup}>
          <label>Projects:</label>
          <textarea
            name="projects"
            value={profile.projects}
            onChange={handleChange}
            disabled={!editMode}
            style={styles.textarea}
            placeholder="E.g., Grocery Ordering System using MERN Stack"
          />
        </div>

        <div style={styles.formGroup}>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            disabled={!editMode}
            style={styles.input}
            placeholder="E.g., React, Node.js, JavaScript, Python"
          />
        </div>
      </div>

      {/* 🔹 Job Preferences */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Job Preferences</h3>

        <div style={styles.gridWithGap}>
          <div style={styles.formGroup}>
            <label>Preferred Roles:</label>
            <input
              type="text"
              name="preferredRoles"
              value={profile.preferredRoles}
              onChange={handleChange}
              disabled={!editMode}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Industries:</label>
            <input
              type="text"
              name="industries"
              value={profile.industries}
              onChange={handleChange}
              disabled={!editMode}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Preferred Location:</label>
            <input
              type="text"
              name="preferredLocation"
              value={profile.preferredLocation}
              onChange={handleChange}
              disabled={!editMode}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Salary Expectations:</label>
            <input
              type="text"
              name="salaryExpectations"
              value={profile.salaryExpectations}
              onChange={handleChange}
              disabled={!editMode}
              style={styles.input}
            />
          </div>
        </div>
      </div>

      {/* 🔹 Buttons */}
      <div style={styles.buttonGroup}>
        {editMode ? (
          <button style={styles.saveBtn} onClick={handleSave}>
            Save Profile
          </button>
        ) : (
          <button style={styles.editBtn} onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const styles = {
  container: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    margin: "40px auto",
    width: "85%",
    maxWidth: "950px",
    transition: "all 0.3s ease",
  },
  heading: {
    textAlign: "center",
    color: "#0d6efd",
    fontSize: "28px",
    marginBottom: "30px",
  },
  section: {
    backgroundColor: "#f9fbff",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
  },
  sectionTitle: {
    fontSize: "20px",
    color: "#0d6efd",
    borderBottom: "2px solid #0d6efd",
    paddingBottom: "6px",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  gridWithGap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    marginTop: "5px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    marginTop: "5px",
  },
  buttonGroup: {
    textAlign: "center",
    marginTop: "20px",
  },
  editBtn: {
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  saveBtn: {
    backgroundColor: "#198754",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Profile;
