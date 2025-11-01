import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function AdminManageJobs() {
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [empSearch, setEmpSearch] = useState("");
  const [jobSearch, setJobSearch] = useState("");

  // Pagination states
  const [empPage, setEmpPage] = useState(1);
  const [jobPage, setJobPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    const employer = JSON.parse(localStorage.getItem("employerProfile")) || [];
    const jobsList = JSON.parse(localStorage.getItem("jobs")) || [];

    setEmployers(Array.isArray(employer) ? employer : [employer]);
    setJobs(jobsList);
  }, []);

  /** ✅ Employer Actions **/
  const blockEmployer = (index) => {
    const updated = [...employers];
    updated[index].blocked = true;
    setEmployers(updated);
    localStorage.setItem("employerProfile", JSON.stringify(updated[0]));
  };

  const unblockEmployer = (index) => {
    const updated = [...employers];
    updated[index].blocked = false;
    setEmployers(updated);
    localStorage.setItem("employerProfile", JSON.stringify(updated[0]));
  };

  const deleteEmployer = (index) => {
    if (!window.confirm("Delete this employer & their jobs?")) return;
    localStorage.removeItem("employerProfile");
    localStorage.removeItem("jobs");
    setEmployers([]);
    setJobs([]);
  };

  /** ✅ Delete Job **/
  const deleteJob = (index) => {
    if (!window.confirm("Delete this job post?")) return;
    const updated = jobs.filter((_, i) => i !== index);
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  /** ✅ Search Filters **/
  const filteredEmployers = employers.filter((emp) =>
    `${emp.companyName} ${emp.fullName} ${emp.location}`
      .toLowerCase()
      .includes(empSearch.toLowerCase())
  );

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(jobSearch.toLowerCase())
  );

  /** ✅ Pagination Logic **/
  const totalEmpPages = Math.ceil(filteredEmployers.length / ITEMS_PER_PAGE);
  const totalJobPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const currentEmp = filteredEmployers.slice(
    (empPage - 1) * ITEMS_PER_PAGE,
    empPage * ITEMS_PER_PAGE
  );

  const currentJobs = filteredJobs.slice(
    (jobPage - 1) * ITEMS_PER_PAGE,
    jobPage * ITEMS_PER_PAGE
  );

  return (
    <Wrapper>
      <Title>Admin – Manage Employers & Job Posts</Title>

      {/* ✅ Employer Search */}
      <SectionTitle>👤 Employers</SectionTitle>
      <SearchBar
        placeholder="Search employer by company, name, location..."
        value={empSearch}
        onChange={(e) => {
          setEmpSearch(e.target.value);
          setEmpPage(1);
        }}
      />

      {currentEmp.length === 0 ? (
        <Empty>No employer found.</Empty>
      ) : (
        currentEmp.map((emp, index) => (
          <Card key={index}>
            <h3>{emp.companyName || "Unknown Employer"}</h3>
            <p><b>Name:</b> {emp.fullName}</p>
            <p><b>Contact:</b> {emp.contact}</p>
            <p><b>Location:</b> {emp.location}</p>
            <p><b>Status:</b> {emp.blocked ? "⛔ Blocked" : "✅ Active"}</p>

            <BtnRow>
              {!emp.blocked ? (
                <BlockBtn onClick={() => blockEmployer(index)}>Block</BlockBtn>
              ) : (
                <UnblockBtn onClick={() => unblockEmployer(index)}>Unblock</UnblockBtn>
              )}
              <DeleteBtn onClick={() => deleteEmployer(index)}>Delete</DeleteBtn>
            </BtnRow>
          </Card>
        ))
      )}

      {/* ✅ Employer Pagination */}
      {totalEmpPages > 1 && (
        <Pagination>
          <button disabled={empPage === 1} onClick={() => setEmpPage(empPage - 1)}>Prev</button>
          <span>Page {empPage} / {totalEmpPages}</span>
          <button disabled={empPage === totalEmpPages} onClick={() => setEmpPage(empPage + 1)}>Next</button>
        </Pagination>
      )}

      {/* ✅ Job Search */}
      <SectionTitle style={{ marginTop: "35px" }}>📄 Job Posts</SectionTitle>
      <SearchBar
        placeholder="Search jobs by title, company, location..."
        value={jobSearch}
        onChange={(e) => {
          setJobSearch(e.target.value);
          setJobPage(1);
        }}
      />

      {currentJobs.length === 0 ? (
        <Empty>No job posts found.</Empty>
      ) : (
        currentJobs.map((job, index) => (
          <Card key={index}>
            <h3>📌 {job.title}</h3>
            <p><b>Company:</b> {job.company}</p>
            <p><b>Location:</b> {job.location}</p>
            <p><b>Salary:</b> {job.salary}</p>
            <p><b>Description:</b> {job.description}</p>

            <BtnRow>
              <DeleteBtn onClick={() => deleteJob(index)}>Delete</DeleteBtn>
            </BtnRow>
          </Card>
        ))
      )}

      {/* ✅ Job Pagination */}
      {totalJobPages > 1 && (
        <Pagination>
          <button disabled={jobPage === 1} onClick={() => setJobPage(jobPage - 1)}>Prev</button>
          <span>Page {jobPage} / {totalJobPages}</span>
          <button disabled={jobPage === totalJobPages} onClick={() => setJobPage(jobPage + 1)}>Next</button>
        </Pagination>
      )}
    </Wrapper>
  );
}

/************* Styled Components *************/
const Wrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 25px;
  background: #eef5ff;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #0051ff;
  font-weight: 700;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #003ea8;
  font-size: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0 15px;
  border-radius: 8px;
  border: 1px solid #9cc0ff;
`;

const Card = styled.div`
  background: white;
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0px 4px 14px rgba(0,0,0,0.08);
  border-left: 5px solid #0051ff;
  margin-bottom: 15px;
`;

const BtnRow = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 10px;
`;

const BlockBtn = styled.button`
  background: #ff4444;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const UnblockBtn = styled.button`
  background: #00b050;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  background: #d62828;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const Empty = styled.p`
  color: #555;
  font-style: italic;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  gap: 10px;

  button {
    padding: 6px 14px;
    background: #0051ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
      background: #b7caff;
      cursor: not-allowed;
    }
  }
`;
