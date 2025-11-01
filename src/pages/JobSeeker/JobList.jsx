import { useEffect, useState } from "react";
import styled from "styled-components";

export default function JobList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(data);
  }, []);

  return (
    <Wrapper>
      <Title>📄 My Job Applications</Title>

      {applications.length === 0 ? (
        <EmptyMessage>
          😕 No Applications Yet <br /> Apply for jobs to see them here!
        </EmptyMessage>
      ) : (
        <List>
          {applications.map((app, idx) => (
            <Card key={idx}>
              <Header>
                <JobTitle>{app.role}</JobTitle>
                <Company>{app.appliedJob?.company || "N/A"}</Company>
              </Header>

              <Field><strong>Name:</strong> {app.fullName}</Field>
              <Field><strong>Degree:</strong> {app.degree}</Field>
              <Field><strong>Expected Salary:</strong> ₹{app.expectedSalary}</Field>
              <Field><strong>Contact:</strong> {app.contact}</Field>

              {app.referenceId && (
                <Field><strong>Reference ID:</strong> {app.referenceId}</Field>
              )}

              <Field>
                <strong>Status:</strong>{" "}
                <StatusBadge status={app.status || "Pending"}>
                  {app.status || "Pending"}
                </StatusBadge>
              </Field>

              {app.message && (
                <MessageBox>
                  <strong>Employer Message: </strong> {app.message}
                </MessageBox>
              )}

              <LinkGroup>
                <Link href={app.linkedIn} target="_blank">LinkedIn</Link>
                <Link href={app.github} target="_blank">GitHub</Link>
              </LinkGroup>

              {app.cv && <FileTag>📎 CV Uploaded</FileTag>}
            </Card>
          ))}
        </List>
      )}
    </Wrapper>
  );
}

/******** Styled Components ********/

const Wrapper = styled.div`
  max-width: 850px;
  margin: auto;
  padding: 30px;
  min-height: 100vh;
  background: #eef4ff;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #0051ff;
  margin-bottom: 20px;
  font-weight: 700;
`;

const EmptyMessage = styled.div`
  margin-top: 100px;
  text-align: center;
  color: #777;
  font-size: 18px;
`;

const List = styled.div`
  display: grid;
  gap: 18px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #cbdcff;
  box-shadow: 0px 6px 18px rgba(0, 70, 200, 0.15);
  transition: 0.2s ease;
  &:hover {
    transform: translateY(-3px);
  }
`;

const Header = styled.div`
  margin-bottom: 12px;
`;

const JobTitle = styled.h3`
  margin: 0;
  color: #0b5ed7;
`;

const Company = styled.p`
  margin: 0;
  font-size: 15px;
  color: #444;
`;

const Field = styled.p`
  margin: 6px 0;
  font-size: 15px;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  text-transform: capitalize;

  background: ${(props) =>
    props.status === "Accepted"
      ? "#28a745"
      : props.status === "Rejected"
      ? "#dc3545"
      : "#ffc107"};
`;

const MessageBox = styled.div`
  background: #e7f0ff;
  padding: 8px;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: #003a91;
`;

const LinkGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Link = styled.a`
  background: #0b5ed7;
  padding: 8px 14px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
`;

const FileTag = styled.div`
  margin-top: 10px;
  color: #004aad;
  font-weight: 600;
`;
