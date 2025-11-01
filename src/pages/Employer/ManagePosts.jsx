import { useState, useEffect } from "react";
import styled from "styled-components";

export default function ManagePosts() {
  const [jobs, setJobs] = useState([]);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedJobs;

    if (editIndex !== null) {
      updatedJobs = [...jobs];
      updatedJobs[editIndex] = jobData;
      setEditIndex(null);
    } else {
      updatedJobs = [...jobs, jobData];
    }

    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    setJobData({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: ""
    });
  };

  const handleEdit = (index) => {
    setJobData(jobs[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  return (
    <Wrapper>
      <Card>
        <Title>{editIndex !== null ? "Edit Job Post" : "Create Job Post"}</Title>

        <Form onSubmit={handleSubmit}>
          <Input placeholder="Job Title" value={jobData.title} onChange={(e) => setJobData({ ...jobData, title: e.target.value })} required />
          <Input placeholder="Company" value={jobData.company} onChange={(e) => setJobData({ ...jobData, company: e.target.value })} required />
          <Input placeholder="Location" value={jobData.location} onChange={(e) => setJobData({ ...jobData, location: e.target.value })} required />
          <Input placeholder="Salary" value={jobData.salary} onChange={(e) => setJobData({ ...jobData, salary: e.target.value })} required />
          <Textarea placeholder="Job Description" value={jobData.description} onChange={(e) => setJobData({ ...jobData, description: e.target.value })} required />
          
          <Button type="submit">{editIndex !== null ? "Update Job" : "Post Job"}</Button>
        </Form>
      </Card>

      <SectionTitle>Job Listings</SectionTitle>

      {jobs.length === 0 ? (
        <NoJobs>No job posts yet.</NoJobs>
      ) : (
        <JobsGrid>
          {jobs.map((job, index) => (
            <JobCard key={index}>
              <JobTitle>{job.title}</JobTitle>
              <p><b>Company:</b> {job.company}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Salary:</b> {job.salary}</p>
              <Desc>{job.description}</Desc>

              <BtnGroup>
                <EditBtn onClick={() => handleEdit(index)}>Edit</EditBtn>
                <DeleteBtn onClick={() => handleDelete(index)}>Delete</DeleteBtn>
              </BtnGroup>
            </JobCard>
          ))}
        </JobsGrid>
      )}
    </Wrapper>
  );
}

/************** Styled Components **************/

const Wrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background: #eef5ff;
  font-family: Arial, sans-serif;
`;

const Card = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #cfe0ff;
  box-shadow: 0px 4px 15px rgba(0, 80, 180, 0.15);
  margin-bottom: 30px;
`;

const Title = styled.h2`
  text-align: center;
  color: #0b5ed7;
  font-size: 22px;
  margin-bottom: 12px;
`;

const Form = styled.form`
  display: grid;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #9cc0ff;
  background: #f8faff;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  height: 80px;
  border-radius: 8px;
  border: 1px solid #9cc0ff;
  background: #f8faff;
  resize: none;
`;

const Button = styled.button`
  background: #0b5ed7;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  &:hover { background: #0846a3; }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #004aad;
  margin-bottom: 10px;
`;

const NoJobs = styled.p`
  color: #555;
`;

const JobsGrid = styled.div`
  display: grid;
  gap: 15px;
`;

const JobCard = styled.div`
  background: white;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid #cfe0ff;
  box-shadow: 0px 3px 10px rgba(0, 80, 180, 0.15);
`;

const JobTitle = styled.h4`
  color: #004aad;
  font-size: 18px;
  margin-bottom: 6px;
`;

const Desc = styled.p`
  color: #444;
  margin: 6px 0;
`;

const BtnGroup = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 10px;
`;

const EditBtn = styled.button`
  background: #0b5ed7;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  &:hover { background: #0846a3; }
`;

const DeleteBtn = styled.button`
  background: #d62828;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  &:hover { background: #a61b1b; }
`;
