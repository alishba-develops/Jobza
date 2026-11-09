import React, { useState, useEffect } from "react";
import "./Recruitercandidate.css";
import { useNavigate } from "react-router-dom";
import Viewapplication from "../Components/Viewapplication";

function Recruitercandidate() {
  const navigate = useNavigate();
  // Get applications

  const [appdata, setappdata] = useState([]);
  const [data, setdata] = useState("");
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

  // View Application
  const [show, setshow] = useState(false);

  // Show
  const [showmodal, setshowmodal] = useState(false);
  const Showmodal = () => {
    setshowmodal(true);
  };
  const close = () => {
    setshowmodal(false);
  };

  // Schedule Interview
  const [app, setapp] = useState("");

  // Search candididate

  const [search, setsearch] = useState({ name: "" });
  const Searchcand = (e) => {
    const { name, value } = e.target;
    setsearch({ ...search, [name]: value });
  };

  return (
    <div id="candidates-page">
      <div id="cand-row1">
        <h1 id="candidates-title" className="lead col-12">
          Candidates
        </h1>
      </div>

      <div id="cand-row2" className="col-12">
        <div id="cand-pipeline">
          <button id="pipeline-btn">Pipeline</button>
        </div>

        <div id="jobs-row3-left" className="d-flex align-items-center">
          <input
            type=""
            className="form-control col-10"
            id="inputPassword2"
            placeholder="Search candidates"
            name="name"
            value={search.name}
            onChange={Searchcand}
          />

          <button className="btn" id="reccand-filter-btn">
            Search
          </button>
        </div>
      </div>

      <div id="candidate-pipeline-board" className="d-flex">
        <div id="application-column" className="candidate-column">
          <h4 id="application-column-title">Application</h4>

          {appdata
            .filter(
              (application) =>
                application.status === "Pending" &&
                application.fullname
                  .toLowerCase()
                  .includes(search.name.toLowerCase()),
            )
            .map((application) => (
              <div
                id="application-candidate-card"
                className="candidate-card"
                key={application._id}
              >
                <p id="application-candidate-name">{application.fullname}</p>

                <p id="application-candidate-job">{application.job.title}</p>

                <div id="application-card-actions">
                  <button
                    id="interview-profile-btn"
                    onClick={() => {
                      navigate("/Myprofile", {
                        state: {
                           handleinput:application.applicant
                        },
                      });
                    }}
                  >
                    View Profile
                  </button>

                  <button
                    id="application-view-btn"
                    onClick={() => {
                      setshow(true);
                      setdata(application._id);
                    }}
                  >
                    View Application
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div id="shortlist-column" className="candidate-column">
          <h4 id="shortlist-column-title">Shortlist</h4>

          {appdata
            .filter(
              (application) =>
                application.status === "Shortlist" &&
                application.fullname
                  .toLowerCase()
                  .includes(search.name.toLowerCase()),
            )
            .map((application) => (
              <div
                id="shortlist-candidate-card"
                className="candidate-card"
                key={application._id}
              >
                <p id="shortlist-candidate-name">{application.fullname}</p>

                <p id="shortlist-candidate-job">{application.job.title}</p>

                <p id="shortlist-candidate-empty"></p>

                <div id="shortlist-card-actions">
                  <button
                    id="interview-profile-btn"
                    onClick={() => {
                      navigate("/Myprofile", {
                        state: {
                          handleinput:application.applicant
                        },
                      });
                    }}
                  >
                    View Profile
                  </button>

                  <button
                    id="shortlist-view-btn"
                    onClick={() => {
                      setshow(true);
                      setdata(application._id);
                    }}
                  >
                    View Application
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div id="interview-column" className="candidate-column">
          <h4 id="interview-column-title">Interview</h4>

          {appdata
            .filter(
              (application) =>
                application.status === "Interview" &&
                application.fullname
                  .toLowerCase()
                  .includes(search.name.toLowerCase()),
            )
            .map((application) => (
              <div
                id="interview-candidate-card"
                className="candidate-card"
                key={application._id}
              >
                <p id="interview-candidate-name">{application.fullname}</p>

                <p id="interview-candidate-job">{application.job.title}</p>

                <p id="interview-candidate-empty"></p>

                <div id="interview-card-actions">
                  <button
                    id="interview-profile-btn"
                    onClick={() => {
                      navigate("/Myprofile", {
                        state: {
                          handleinput:application.applicant
                        },
                      });
                    }}
                  >
                    View Profile
                  </button>

                  <button
                    id="schedule-interview-btn"
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div id="offer-column" className="candidate-column">
          <h4 id="offer-column-title">Offer</h4>

          {appdata
            .filter(
              (application) =>
                application.status === "Offer" &&
                application.fullname
                  .toLowerCase()
                  .includes(search.name.toLowerCase()),
            )
            .map((application) => (
              <div
                id="offer-candidate-card"
                className="candidate-card"
                key={application._id}
              >
                <p id="offer-candidate-name">{application.fullname}</p>

                <p id="offer-candidate-job">{application.job.title}</p>

                <p id="offer-candidate-empty"></p>

                <div id="offer-card-actions">
                  <button
                    id="interview-profile-btn"
                    onClick={() => {
                      navigate("/Myprofile", {
                        state: {
                          handleinput:application.applicant
                        },
                      });
                    }}
                  >
                    View Profile
                  </button>

                  <button
                    id="offer-view-btn"
                    onClick={() => {
                      setshow(true);
                      setdata(application._id);
                    }}
                  >
                    View Application
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div id="hired-column" className="candidate-column">
          <h4 id="hired-column-title">Hired</h4>

          {appdata
            .filter(
              (application) =>
                application.status === "Hired" &&
                application.fullname
                  .toLowerCase()
                  .includes(search.name.toLowerCase()),
            )
            .map((application) => (
              <div
                id="hired-candidate-card"
                className="candidate-card"
                key={application._id}
              >
                <p id="hired-candidate-name">{application.fullname}</p>

                <p id="hired-candidate-job">{application.job.title}</p>

                <p id="hired-candidate-empty"></p>

                <div id="hired-card-actions">
                  <button
                    id="interview-profile-btn"
                    onClick={() => {
                      navigate("/Myprofile", {
                        state: {
                          handleinput:application.applicant
                        },
                      });
                    }}
                  >
                    View Profile
                  </button>

                  <button
                    id="hired-view-btn"
                    onClick={() => {
                      setshow(true);
                      setdata(application._id);
                    }}
                  >
                    View Application
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div id="rejected-column" className="candidate-column">
          <h4 id="rejected-column-title">Rejected</h4>

          {appdata
            .filter(
              (application) =>
                application.status === "Rejected" &&
                application.fullname
                  .toLowerCase()
                  .includes(search.name.toLowerCase()),
            )
            .map((application) => (
              <div
                id="rejected-candidate-card"
                className="candidate-card"
                key={application._id}
              >
                <p id="rejected-candidate-name">{application.fullname}</p>

                <p id="rejected-candidate-job">{application.job.title}</p>

                <p id="rejected-candidate-empty"></p>

                <div id="rejected-card-actions">
                  <button
                    id="interview-profile-btn"
                    onClick={() => {
                      navigate("/Myprofile", {
                        state: {
                           handleinput:application.applicant
                        },
                      });
                    }}
                  >
                    View Profile
                  </button>

                  <button
                    id="rejected-view-btn"
                    onClick={() => {
                      setshow(true);
                      setdata(application._id);
                    }}
                  >
                    View Application
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {show && (
        <Viewapplication data={data} fetchapi={fetchapi} setshow={setshow} />
      )}
    </div>
  );
}

export default Recruitercandidate;
