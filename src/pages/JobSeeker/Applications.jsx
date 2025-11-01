import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Applications() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job || {};

  const [form, setForm] = useState({
    fullName: "",
    degree: "",
    contact: "",
    linkedIn: "",
    github: "",
    expectedSalary: "",
    role: job.title || "",
    description: "",
    referenceId: "",
    cv: null,
  });

  const [cvName, setCvName] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setCvName(file ? file.name : "");
    setForm({ ...form, cv: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    existingApplications.push({ ...form, appliedJob: job });

    localStorage.setItem("applications", JSON.stringify(existingApplications));

    alert("✅ Application Submitted Successfully!");
    navigate("/dashboard");
  };

  return (
    <Wrapper>
      <Title>Apply for {job.title}</Title>
      <Card>
        <Form onSubmit={handleSubmit}>
          
          <InputField>
            <Label>Full Name</Label>
            <Input name="fullName" value={form.fullName} onChange={handleChange} required />
          </InputField>

          <InputField>
            <Label>Degree</Label>
            <Input name="degree" value={form.degree} onChange={handleChange} required />
          </InputField>

          <InputField>
            <Label>Contact Number</Label>
            <Input name="contact" value={form.contact} onChange={handleChange} required />
          </InputField>

          <InputField>
            <Label>LinkedIn URL</Label>
            <Input name="linkedIn" value={form.linkedIn} onChange={handleChange} required />
          </InputField>

          <InputField>
            <Label>GitHub URL</Label>
            <Input name="github" value={form.github} onChange={handleChange} required />
          </InputField>

          <InputField>
            <Label>Expected Salary</Label>
            <Input name="expectedSalary" value={form.expectedSalary} onChange={handleChange} required />
          </InputField>

          <InputField>
            <Label>Job Role</Label>
            <Input name="role" value={form.role} onChange={handleChange} required />
          </InputField>

          <InputField>
            <Label>Description</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} required />
          </InputField>

          <InputField>
            <Label>Reference ID (optional)</Label>
            <Input name="referenceId" value={form.referenceId} onChange={handleChange} />
          </InputField>

          <InputField>
            <Label>Upload CV (PDF/Doc)</Label>
            <FileUpload type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
            {cvName && <FileName>📎 {cvName}</FileName>}
          </InputField>

          <Button type="submit">Submit Application</Button>
        </Form>
      </Card>
    </Wrapper>
  );
}

/************ Styled Components ************/
const Wrapper = styled.div`
  max-width: 650px;
  margin: auto;
  padding: 25px;
  background: #eef5ff;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #0b5ed7;
  margin-bottom: 18px;
`;

const Card = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 14px;
  border: 1px solid #cfe0ff;
  box-shadow: 0px 6px 18px rgba(0,80,180,0.15);
`;

const Form = styled.form`
  display: grid;
  gap: 15px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #004aad;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #9cc0ff;
  background: #f8fbff;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #9cc0ff;
  min-height: 80px;
  background: #f8fbff;
`;

const FileUpload = styled.input`
  margin-top: 5px;
`;

const FileName = styled.div`
  font-size: 14px;
  color: #004aad;
  margin-top: 5px;
`;

const Button = styled.button`
  background: #0b5ed7;
  padding: 12px;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  &:hover {
    background: #0846a3;
  }
`;
