import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sort, setSort] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  // Filter & Search Logic
  const filteredJobs = jobs
    .filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((job) =>
      locationFilter ? job.location === locationFilter : true
    )
    .sort((a, b) => {
      if (sort === "low") return a.salary - b.salary;
      if (sort === "high") return b.salary - a.salary;
      return 0;
    });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <Wrapper>
      <Title>Job Opportunities</Title>

      <Filters>
        <SearchInput
          placeholder="Search jobs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">Location</option>
          {[...new Set(jobs.map((j) => j.location))].map((loc, i) => (
            <option key={i} value={loc}>{loc}</option>
          ))}
        </Select>

        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort Salary</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </Select>
      </Filters>

      {currentJobs.length === 0 ? (
        <NoJobs>No jobs found</NoJobs>
      ) : (
        <Grid>
          {currentJobs.map((job, index) => (
            <Card key={index}>
              <JobTitle>{job.title}</JobTitle>
              <Text><b>Company:</b> {job.company}</Text>
              <Text><b>Location:</b> {job.location}</Text>
              <Text><b>Salary:</b> ₹{job.salary}</Text>
              <Description>{job.description}</Description>

              <ApplyBtn onClick={() => navigate("/applications", { state: { job } })}>
                Apply Now
              </ApplyBtn>
            </Card>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageBtn
            key={i}
            active={currentPage === i + 1}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageBtn>
        ))}
      </Pagination>
    </Wrapper>
  );
}

/************** Styled Components ****************/

const Wrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 25px;
  background: #eef5ff;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #004aad;
  margin-bottom: 20px;
`;

const Filters = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #9cc0ff;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #9cc0ff;
`;

const Grid = styled.div`
  display: grid;
  gap: 15px;
`;

const Card = styled.div`
  background: white;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid #cfe0ff;
  box-shadow: 0px 4px 12px rgba(0, 80, 180, 0.12);
`;

const JobTitle = styled.h3`
  color: #004aad;
  margin-bottom: 8px;
`;

const Text = styled.p`
  margin: 2px 0;
  font-size: 14px;
`;

const Description = styled.p`
  margin: 6px 0;
  color: #4a4a4a;
  font-size: 14px;
`;

const ApplyBtn = styled.button`
  width: 100%;
  background: #0b5ed7;
  padding: 10px;
  margin-top: 10px;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:hover {
    background: #0846a3;
  }
`;

const NoJobs = styled.p`
  color: #444;
  text-align: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
  gap: 8px;
`;

const PageBtn = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: ${(p) => (p.active ? "#0b5ed7" : "#cfe0ff")};
  color: ${(p) => (p.active ? "white" : "#004aad")};
  cursor: pointer;
`;
