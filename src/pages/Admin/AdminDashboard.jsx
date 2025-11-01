// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement
// );

// export default function AdminDashboard() {
//   const [jobSeekers, setJobSeekers] = useState(0);
//   const [employers, setEmployers] = useState(0);
//   const [loginData, setLoginData] = useState([]);
//   const [logoutData, setLogoutData] = useState([]);
//   const [dates, setDates] = useState([]);

//   useEffect(() => {
//     const jobSeekerData = JSON.parse(localStorage.getItem("jobSeekers")) || [];
//     const employerData = JSON.parse(localStorage.getItem("employers")) || [];

//     setJobSeekers(jobSeekerData.length);
//     setEmployers(employerData.length);

//     const logs = JSON.parse(localStorage.getItem("dailyLogs")) || [];
//     setDates(logs.map((e) => e.date));
//     setLoginData(logs.map((e) => e.logins));
//     setLogoutData(logs.map((e) => e.logouts));
//   }, []);

//   const pieData = {
//     labels: ["Job Seekers", "Employers"],
//     datasets: [
//       {
//         data: [jobSeekers, employers],
//         backgroundColor: ["#007bff", "#28a745"],
//         hoverBackgroundColor: ["#0056b3", "#1e7e34"]
//       }
//     ]
//   };

//   const lineData = {
//     labels: dates,
//     datasets: [
//       {
//         label: "Logins",
//         data: loginData,
//         borderColor: "#007bff",
//         fill: false,
//         tension: 0.3
//       },
//       {
//         label: "Logouts",
//         data: logoutData,
//         borderColor: "#ff5733",
//         fill: false,
//         tension: 0.3
//       }
//     ]
//   };

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-title">Admin Dashboard</h2>

//       <div className="stats">
//         <div className="card">
//           <h3>👤 Total Job Seekers</h3>
//           <p>{jobSeekers}</p>
//         </div>

//         <div className="card">
//           <h3>🏢 Total Employers</h3>
//           <p>{employers}</p>
//         </div>
//       </div>

//       <div className="charts">
//         <div className="chart-box">
//           <h3>Job Seekers vs Employers</h3>
//           <Pie data={pieData} />
//         </div>

//         <div className="chart-box">
//           <h3>Daily Login & Logout Activity</h3>
//           <Line data={lineData} />
//         </div>
//       </div>

//       <style>{`
//           .dashboard-container {
//             padding: 30px;
//             font-family: 'Poppins', sans-serif;
//             background: #eef3ff;
//             min-height: 100vh;
//           }
//           .dashboard-title {
//             text-align: center;
//             font-size: 28px;
//             font-weight: 700;
//             color: #0051ff;
//             margin-bottom: 25px;
//           }
//           .stats {
//             display: flex;
//             gap: 20px;
//             justify-content: center;
//             margin-bottom: 30px;
//           }
//           .card {
//             background: white;
//             padding: 20px;
//             border-radius: 12px;
//             width: 200px;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//             text-align: center;
//           }
//           .card p {
//             font-size: 24px;
//             font-weight: bold;
//             color: #0051ff;
//           }
//           .charts {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 25px;
//             padding: 0 50px;
//           }
//           .chart-box {
//             background: white;
//             padding: 20px;
//             border-radius: 12px;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//           }
//           @media (max-width: 768px) {
//             .charts {
//               grid-template-columns: 1fr;
//               padding: 0 10px;
//             }
//           }
//       `}</style>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function AdminDashboard() {
  const [jobSeekers, setJobSeekers] = useState(0);
  const [employers, setEmployers] = useState(0);
  const [loginData, setLoginData] = useState([]);
  const [logoutData, setLogoutData] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // ✅ Fetch all users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Count based on role
    setJobSeekers(users.filter((u) => u.role === "jobseeker").length);
    setEmployers(users.filter((u) => u.role === "employer").length);

    // ✅ Get login/logout tracking logs
    const logs = JSON.parse(localStorage.getItem("dailyLogs")) || [];
    setDates(logs.map((e) => e.date));
    setLoginData(logs.map((e) => e.logins));
    setLogoutData(logs.map((e) => e.logouts));
  }, []);

  const pieData = {
    labels: ["Job Seekers", "Employers"],
    datasets: [
      {
        data: [jobSeekers, employers],
        backgroundColor: ["#007bff", "#28a745"],
        hoverBackgroundColor: ["#0056b3", "#1e7e34"]
      }
    ]
  };

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: "Logins",
        data: loginData,
        borderColor: "#007bff",
        fill: false,
        tension: 0.3
      },
      {
        label: "Logouts",
        data: logoutData,
        borderColor: "#ff5733",
        fill: false,
        tension: 0.3
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="stats">
        <div className="card">
          <h3>👤 Total Job Seekers</h3>
          <p>{jobSeekers}</p>
        </div>

        <div className="card">
          <h3>🏢 Total Employers</h3>
          <p>{employers}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h3>Job Seekers vs Employers</h3>
          <Pie data={pieData} />
        </div>

        <div className="chart-box">
          <h3>Daily Login & Logout Activity</h3>
          <Line data={lineData} />
        </div>
      </div>

      <style>{`
          .dashboard-container {
            padding: 30px;
            font-family: 'Poppins', sans-serif;
            background: #eef3ff;
            min-height: 100vh;
          }
          .dashboard-title {
            text-align: center;
            font-size: 28px;
            font-weight: 700;
            color: #0051ff;
            margin-bottom: 25px;
          }
          .stats {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 30px;
          }
          .card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            width: 200px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
          }
          .card p {
            font-size: 24px;
            font-weight: bold;
            color: #0051ff;
          }
          .charts {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            padding: 0 50px;
          }
          .chart-box {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          @media (max-width: 768px) {
            .charts {
              grid-template-columns: 1fr;
              padding: 0 10px;
            }
          }
      `}</style>
    </div>
  );
}
