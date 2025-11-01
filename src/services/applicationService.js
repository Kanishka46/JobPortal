const APPLICATION_KEY = "applications";

export const getApplications = () =>
  JSON.parse(localStorage.getItem(APPLICATION_KEY)) || [];

export const saveApplications = (apps) =>
  localStorage.setItem(APPLICATION_KEY, JSON.stringify(apps));

export const applyJob = (jobId, applicantName) => {
  const apps = getApplications();
  apps.push({
    id: Date.now(),
    jobId,
    applicant: applicantName,
  });
  saveApplications(apps);
};
