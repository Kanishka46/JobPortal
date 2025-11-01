import { useState, useEffect } from "react";
import styled from "styled-components";

export default function EmployerApplications() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(data);
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...applications];
    updated[index].status = status;

    if (status === "Rejected") {
      updated[index].message = "We appreciate your interest. Unfortunately, not selected.";
    }

    localStorage.setItem("applications", JSON.stringify(updated));
    setApplications(updated);
    setSelectedIndex(null);
    setMessage("");
  };

  const submitMessage = () => {
    const updated = [...applications];
    updated[selectedIndex].status = "Accepted";
    updated[selectedIndex].message = message;

    localStorage.setItem("applications", JSON.stringify(updated));
    setApplications(updated);
    setSelectedIndex(null);
    setMessage("");
  };

  return (
    <Wrapper>
      <Title>📁 Applications Received</Title>

      {applications.length === 0 ? (
        <Empty>No applications submitted yet.</Empty>
      ) : (
        <Grid>
          {applications.map((app, index) => (
            <Card key={index}>
              <Job>{app.role}</Job>
              <Field><b>Name:</b> {app.fullName}</Field>
              <Field><b>Degree:</b> {app.degree}</Field>
              <Field><b>Contact:</b> {app.contact}</Field>
              <Field><b>Expected Salary:</b> ₹{app.expectedSalary}</Field>

              <LinkGroup>
                <A href={app.linkedIn} target="_blank">LinkedIn</A>
                <A href={app.github} target="_blank">GitHub</A>
              </LinkGroup>

              <Status status={app.status || "Pending"}>
                {app.status || "Pending"}
              </Status>

              {!app.status && (
                <BtnRow>
                  <AcceptBtn onClick={() => setSelectedIndex(index)}>
                    ✅ Accept
                  </AcceptBtn>
                  <RejectBtn onClick={() => updateStatus(index, "Rejected")}>
                    ❌ Reject
                  </RejectBtn>
                </BtnRow>
              )}
            </Card>
          ))}
        </Grid>
      )}

      {selectedIndex !== null && (
        <ModalBg>
          <Modal>
            <h3>Send Message to Applicant</h3>
            <MsgBox
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <ModalBtn onClick={submitMessage}>Send</ModalBtn>
            <Cancel onClick={() => setSelectedIndex(null)}>Cancel</Cancel>
          </Modal>
        </ModalBg>
      )}
    </Wrapper>
  );
}

/******** Styled Components ********/

const Wrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 30px;
  background: #eef5ff;
  min-height: 100vh;
  font-family: "Poppins";
`;

const Title = styled.h2`
  text-align: center;
  color: #004aad;
`;

const Empty = styled.p`
  text-align: center;
  color: #888;
`;

const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 16px;
`;

const Card = styled.div`
  background: #fff;
  padding: 18px;
  border-radius: 10px;
  border: 1px solid #c8dcff;
`;

const Job = styled.h3`
  margin: 0 0 6px;
  color: #0b5ed7;
`;

const Field = styled.p`
  margin: 4px 0;
`;

const LinkGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 8px 0;
`;

const A = styled.a`
  padding: 8px;
  background: #0b5ed7;
  color: white;
  text-decoration: none;
  border-radius: 6px;
`;

const Status = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
  color: white;
  background: ${(p) =>
    p.status === "Accepted"
      ? "#2ecc71"
      : p.status === "Rejected"
      ? "#e74c3c"
      : "#f1c40f"};
`;

const BtnRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const AcceptBtn = styled.button`
  padding: 8px;
  background: #2ecc71;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const RejectBtn = styled.button`
  padding: 8px;
  background: #e74c3c;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const ModalBg = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 350px;
`;

const MsgBox = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
`;

const ModalBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  background: #0b5ed7;
  color: white;
  padding: 8px;
  border-radius: 6px;
  border: none;
`;

const Cancel = styled.div`
  margin-top: 8px;
  color: #e74c3c;
  text-align: center;
  cursor: pointer;
`;
