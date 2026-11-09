import React, { useState, useEffect } from "react";
import "./Recruiterjob.css";
import { useNavigate } from "react-router-dom";
import Viewjob from "../Components/Viewjob";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import {toast} from "react-hot-toast"
function Recruiterjob(props) {
  // Cities
  const [cities, setcities] = useState([]);
  const fetchapi = () => {
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "Pakistan",
      }),
    })
      .then((res) => res.json())
      .then((cities) => {
        console.log(cities.data);
        setcities(cities.data);
      })
      .catch((error) => {
        console.log("Api failed");
      });
  };

  useEffect(() => {
    fetchapi();
  }, []);

  const navigate = useNavigate();
  const openjobmodal = () => {
    navigate("/Recruiter/job/Createjobmodal");
  };
  const [jobid, setjobid] = useState("");
  const [showdrawer, setshowdrawer] = useState(false);

  // Close job

  const closejob = async (jobid) => {
    try {
      const response = await fetch(`http://localhost:5000/closejob/${jobid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        props.fetchapi();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("FULL FETCH ERROR:", error);
      toast.error(error.message);
    }
  };

  // Delete job

  const deletejob = async (jobid) => {
    try {
      const response = await fetch(`http://localhost:5000/deletejob/${jobid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Job Deleted");
        browsejobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Show

  const [show, setshow] = useState(false);

  const [searchjob, setsearchjob] = useState({});

  const Handlesearchinput = (e) => {
    const { name, value } = e.target;
    setsearchjob({ ...searchjob, [name]: value });
  };
  const [searchedjobs, setsearchedjobs] = useState([]);
  const [filterjobs, setfilterjobs] = useState(false);
  const browsejobs = async () => {
    setfilterjobs(true);
    try {
      const response = await fetch("http://localhost:5000/searchemployerjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(searchjob),
      });
      const jobs = await response.json();
      setsearchedjobs(jobs);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div id="job-row2" class="mt-3">
        <h1>Jobs</h1>
        <a class="ml-auto">
          <button class="btn btn-primary" onClick={() => openjobmodal()}>
            + Create a new a job
          </button>
        </a>
      </div>
      <h1 id="row2-line" class="mt-2"></h1>

      {/* Jobs Row 3 */}
      <div id="jobs-row3" className="col-12">
        {/* Job Find */}

        <div id="search-bar" className="shadow-lg d-flex align-items-center">
          <div className="d-flex">
            <div className="d-flex" id="search-input-icon-div">
              <CiSearch id="search-input-icon" />
              <input
                placeholder="Job title"
                id="search-job-title"
                name="title"
                value={searchjob.title}
                onChange={Handlesearchinput}
                required
              />
            </div>

            <div id="search-input-icon-div">
              <IoLocationOutline id="search-input-icon" />
              <select
                className="d-flex"
                id="search-location"
                name="location"
                value={searchjob.location}
                onChange={Handlesearchinput}
                required
              >
                <option>Location</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn" id="search-btn" onClick={() => browsejobs()}>
            Search
          </button>
        </div>
        <div id="buttons">
          <button
            className="btn"
            id="filter"
            onClick={() => {
              setshow(true);
            }}
          >
            Filters
          </button>

          <select
            id="status-filter"
            name="status"
            value={searchjob.status || ""}
            onChange={Handlesearchinput}
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Row 4 */}

      {/* Filter */}
      {show && (
        <div id="on-filter" className="d-flex align-items-center gap-2">
          <select
            id="category-filter"
            name="category"
            value={searchjob.category || ""}
            onChange={Handlesearchinput}
            className="form-select"
          >
            <option value="">Category</option>

            <option value="Software & Web Development">
              Software & Web Development
            </option>

            <option value="Mobile App Development">
              Mobile App Development
            </option>

            <option value="Data Science & Analytics">
              Data Science & Analytics
            </option>

            <option value="AI & Machine Learning">AI & Machine Learning</option>

            <option value="Cybersecurity">Cybersecurity</option>

            <option value="UI/UX & Graphic Design">
              UI/UX & Graphic Design
            </option>

            <option value="DevOps & Cloud">DevOps & Cloud</option>

            <option value="IT & Technical Support">
              IT & Technical Support
            </option>

            <option value="Product & Project Management">
              Product & Project Management
            </option>

            <option value="Business & Management">Business & Management</option>

            <option value="Marketing & Digital Marketing">
              Marketing & Digital Marketing
            </option>

            <option value="Sales & Business Development">
              Sales & Business Development
            </option>

            <option value="Finance & Accounting">Finance & Accounting</option>

            <option value="Human Resources">Human Resources</option>

            <option value="Customer Support">Customer Support</option>

            <option value="Content Writing & Editing">
              Content Writing & Editing
            </option>

            <option value="Education & Training">Education & Training</option>

            <option value="Engineering">Engineering</option>

            <option value="Healthcare & Medical">Healthcare & Medical</option>

            <option value="Legal">Legal</option>

            <option value="Architecture & Interior Design">
              Architecture & Interior Design
            </option>

            <option value="Media & Communications">
              Media & Communications
            </option>

            <option value="Operations & Administration">
              Operations & Administration
            </option>

            <option value="Research">Research</option>

            <option value="Other">Other</option>
          </select>

          <select
            id="employment-filter"
            name="employmenttype"
            value={searchjob.employmenttype || ""}
            onChange={Handlesearchinput}
            className="form-select"
          >
            <option value="">Employment Type</option>
            <option value="Internship">Internship</option>
            <option value="Fulltime">Fulltime</option>
            <option value="Partime">Partime</option>
            <option value="Contract">Contract</option>
          </select>

          <select
            id="workplace-filter"
            name="workplace"
            value={searchjob.workplace || ""}
            onChange={Handlesearchinput}
            className="form-select"
          >
            <option value="">Workplace</option>
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select
            id="experience-filter"
            name="experience"
            value={searchjob.experience || ""}
            onChange={Handlesearchinput}
            className="form-select"
          >
            <option value="">Experience</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <button
            className="btn"
            id="apply-filter-btn"
            onClick={() => browsejobs()}
          >
            Apply
          </button>

          <button
            className="btn"
            id="nofilter-btn"
            onClick={() => {
              setshow(false);
            }}
          >
            <IoIosCloseCircleOutline />
          </button>
        </div>
      )}

      <div id="cards-main">
        {!filterjobs &&
          props.jobdata.map((item) => (
            <div id="job-cards">
              <div id="card-top-ends">
                <p id="card-status">{item.status}</p>
                <button
                  className="btn btn danger"
                  type="button"
                  onClick={() => deletejob(item._id)}
                >
                  <RiDeleteBin6Line id="top-space-del-btn" />
                </button>
              </div>

              <h5>{item.title}</h5>

              <p id="card-loc">{item.location}</p>

              <p id="card-sal">
                {item.currency}
                {item.minsalary}-{item.maxsalary}
              </p>
              <div>
                <button
                  id="job-preview-btn"
                  className="btn"
                  onClick={() => {
                    setshowdrawer(true);
                    setjobid(item._id);
                  }}
                >
                  Preview
                </button>

                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => closejob(item._id)}
                >
                  Close
                </button>
              </div>
            </div>
          ))}
      </div>

      <div id="cards-main">
        {filterjobs &&
          searchedjobs.map((item) => (
            <div id="job-cards">
              <div id="card-top-ends">
                <p id="card-status">{item.status}</p>
                <button
                  className="btn btn danger"
                  type="button"
                  onClick={() => deletejob(item._id)}
                >
                  <RiDeleteBin6Line id="top-space-del-btn" />
                </button>
              </div>
              <h5>{item.title}</h5>

              <p id="card-loc">{item.location}</p>

              <p id="card-sal">
                {item.minsalary}-{item.maxsalary}
              </p>
              <div>
                <button
                  id="job-preview-btn"
                  className="btn"
                  onClick={() => {
                    setshowdrawer(true);
                    setjobid(item._id);
                  }}
                >
                  Preview
                </button>

                <button
                  className="btn btn-danger"
                  type
                  button
                  onClick={() => closejob(item._id)}
                >
                  Close
                </button>
              </div>
            </div>
          ))}
      </div>

      {showdrawer && <Viewjob setshowdrawer={setshowdrawer} id={jobid} />}
    </div>
  );
}

export default Recruiterjob;
