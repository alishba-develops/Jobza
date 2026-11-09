import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { toast } from "react-hot-toast";
function Dashboard() {
  // Name
  const [user, setuser] = useState("");
  const fetchuser = () => {
    fetch("http://localhost:5000/getuser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        setuser(user);
      });
  };

  useEffect(() => {
    fetchuser();
  }, []);

  // Get Appnum
  const [appnum, setappnum] = useState("");
  const [hirednum, sethirednum] = useState("");
  const getappnum = async (req, res) => {
    fetch("http://localhost:5000/appnum", { credentials: "include" })
      .then((res) => res.json())
      .then((user) => {
        setappnum(user.num);
        sethirednum(user.hirednum);
      });
  };

  useEffect(() => {
    getappnum();
  }, []);

  // Get Jobnum
  const [jobnum, setjobnum] = useState("");
  const getjobnum = async (req, res) => {
    fetch("http://localhost:5000/getjobnum", { credentials: "include" })
      .then((res) => res.json())
      .then((user) => {
        setjobnum(user);
      });
  };

  useEffect(() => {
    getjobnum();
  }, []);

  // Applications

  const [appdata, setappdata] = useState([]);
  const [data, setdata] = useState("");
  console.log("id:", appdata._id);
  const fetchapi = () => {
    fetch("http://localhost:5000/showrecruiterapplication/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        console.log("applications:", appdata);
        setappdata(user);
      });
  };

  useEffect(() => {
    fetchapi();
  }, []);

  // Get jobs
  const [empjobs, setempjobs] = useState([]);
  const getjobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/getemployerjobdata", {
        credentials: "include",
      });
      const jobs = await response.json();
      setempjobs(jobs);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getjobs();
  }, []);

  return (
    <div id="recruiter-dashboard">
      <div id="dashboard-top-section" className="d-flex">
        <div id="dashboard-left" className="col-6">
          <div id="dashboard-stats" className="d-flex">
            <div id="applications-stat-card" className="card">
              <p id="applications-stat-title">Applications Recieved</p>
              <p id="applications-stat-number">{appnum}</p>
            </div>

            <div id="jobs-stat-card" className="card">
              <p id="jobs-stat-title">Active Jobs</p>
              <p id="jobs-stat-number">{jobnum}</p>
            </div>

            <div id="hired-stat-card" className="card">
              <p id="hired-stat-title">Hired</p>
              <p id="hired-stat-number">{hirednum}</p>
            </div>
          </div>

          <div id="dash-candidate-management">
            <h4 id="candidate-management-title">Candidate Management</h4>

            <div id="candidate-management-list">
              {appdata.slice(0, 3).map((application) => (
                <div id="management-application-info" key={application._id}>
                  <img
                    id="management-profile-img"
                    src={application.applicant.profileimg}
                    width={50}
                    alt="Candidate"
                  />
                  <p id="management-applicant-name">{application.fullname}</p>

                  <p id="management-application-job">{application.job.title}</p>

                  <a href="/Recruiter/candidate" id="management-profile-action">
                    <button id="management-profile-btn">View Profile</button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="dashboard-right" className="col-6">
          <div id="quick-actions">
            <p id="quick-actions-title">Quick Actions</p>

            <div id="quick-actions-list" className="d-flex flex-column">
              <a href="/Recruiter/job/Createjobmodal">
                <button id="post-job-action-btn">Post a job</button>
              </a>

              <a href="/Recruiter/recruitersetting">
                <button id="account-settings-action-btn">
                  Account settings
                </button>
              </a>

              <a href="/Recruiter/company">
                <button id="company-settings-action-btn">
                  Company settings
                </button>
              </a>
            </div>
          </div>

          <div id="interview-section">
            <p id="interview-title">Job Openings ({jobnum})</p>

            <div id="job-list">
              {empjobs.slice(0, 3).map((item) => (
                <div id="dash-job-card" key={item._id}>
                  <p id="dash-job-title">{item.title}</p>

                  <p id="dash-job-status">{item.status}</p>

                  <p id="dash-job-location">{item.location}</p>
                  <a href="/Recruiter/job" id="management-profile-action">
                    <button id="management-profile-btn">View</button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="dashapplication-outer">
        <div id="dashboard-applications" className="col-12">
          <div id="applications-heading-row" className="d-flex">
            <h3 id="dashboard-applications-title">Applications ({appnum})</h3>

            <a href="/Recruiter/application">
              <button id="view-all-applications-btn">View All</button>
            </a>
          </div>

          <table id="dashboard-applications-list">
            <thead id="recapp-thead">
              <tr>
                <th>Applicant</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Applied at</th>
              </tr>
            </thead>

            <tbody>
              {appdata.slice(0, 6).map((application) => (
                <tr id="dashboard-application-card" key={application._id}>
                  <td id="dashboard-applicant-name">{application.fullname}</td>

                  <td id="dashboard-application-job">
                    {application.job.title}
                  </td>

                  <td>
                    <span id="dashboard-application-status">
                      {application.status}
                    </span>
                  </td>

                  <td id="dashboard-application-date">
                    {new Date(application.createdAt).toLocaleDateString(
                      "en-GB",
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
