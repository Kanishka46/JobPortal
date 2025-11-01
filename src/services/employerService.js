// ✅ LocalStorage Employer Job Service
const JOB_KEY = "jobs";

export const getJobs = () => JSON.parse(localStorage.getItem(JOB_KEY)) || [];

export const saveJobs = (jobs) =>
  localStorage.setItem(JOB_KEY, JSON.stringify(jobs));

export const postJob = (job) => {
  const jobs = getJobs();
  jobs.push({ id: Date.now(), ...job });
  saveJobs(jobs);
};

export const deleteJob = (id) => {
  const jobs = getJobs().filter((job) => job.id !== id);
  saveJobs(jobs);
};

export const updateJob = (id, updatedData) => {
  const jobs = getJobs().map((job) =>
    job.id === id ? { ...job, ...updatedData } : job
  );
  saveJobs(jobs);
};
