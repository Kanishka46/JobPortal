import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  return (
    <Wrapper>
      <Title>Job Posts Overview</Title>
      <Subtitle>All jobs you have posted</Subtitle>

      {jobs.length === 0 ? (
        <NoJobs>You have not posted any jobs yet.</NoJobs>
      ) : (
        <JobsGrid>
          {jobs.map((job, index) => (
            <JobCard key={index}>
              <JobTitle>{job.title}</JobTitle>

              <Field><b>Company:</b> {job.company}</Field>
              <Field><b>Location:</b> {job.location}</Field>
              <Field><b>Salary:</b> {job.salary}</Field>
              <FieldDesc>{job.description}</FieldDesc>

              <Status>✅ Active</Status>
            </JobCard>
          ))}
        </JobsGrid>
      )}
    </Wrapper>
  );
}

/************** Styled Components **************/

const Wrapper = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 30px;
  background: #eef5ff;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #0b5ed7;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 16px;
  color: #4a6fa5;
  margin-bottom: 25px;
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
`;

const JobCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #cfe0ff;
  box-shadow: 0px 3px 14px rgba(0, 80, 180, 0.12);
  transition: 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 5px 18px rgba(0, 80, 180, 0.2);
  }
`;

const JobTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #004aad;
  margin-bottom: 10px;
`;

const Field = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #003b7a;
`;

const FieldDesc = styled.p`
  font-size: 14px;
  margin-top: 5px;
  color: #444;
`;

const NoJobs = styled.p`
  text-align: center;
  color: #004aad;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: fit-content;
  margin: 50px auto;
  border: 1px solid #9cc0ff;
`;

const Status = styled.div`
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #0b5ed7;
`;
