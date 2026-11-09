import React, { useState, useEffect } from "react";
import Viewjob from "../Components/Viewjob";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuSlidersHorizontal } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import "./Jobseeker.css";
function Jobseekerjobs() {
  const [show, setshow] = useState(false);
  const [filterjobs, setfilterjobs] = useState(false);
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

  // get all jobs

  const [alljobs, setalljobs] = useState([]);
  const fetchalljobs = () => {
    fetch("http://localhost:5000/getalljobs/")
      .then((res) => res.json())
      .then((alljobs) => {
        setalljobs(alljobs);
      });
  };

  useEffect(() => {
    fetchalljobs();
  }, []);

  // Search job
  const [searchjob, setsearchjob] = useState({});

  const Handlesearchinput = (e) => {
    const { name, value } = e.target;
    setsearchjob({ ...searchjob, [name]: value });
  };
  const [searchedjobs, setsearchedjobs] = useState([]);
  const browsejobs = async () => {
    setfilterjobs(true);
    try {
      const response = await fetch("http://localhost:5000/searchjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchjob),
      });
      const jobs = await response.json();
      setsearchedjobs(jobs);
    } catch (error) {
      alert(error.message);
    }
  };

  // View Job
  const [showdrawer, setshowdrawer] = useState(false);
  const [jobid, setjobid] = useState("");

  // Apply
  const navigate = useNavigate();
  const apply = async (jobid) => {
    try {
      const res = await fetch(`http://localhost:5000/apply/${jobid}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 401) {
        navigate("/Jobseekersignup");
        return;
      }
      if (res.status === 403) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        toast.success(data.message);
        navigate("/Applyjob", {
          state: { jobid: jobid },
        });
        return;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Save job
  const savejob = async (jobid) => {
    try {
      const res = await fetch(`http://localhost:5000/save/${jobid}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 401) {
        toast.alert("To save jobs, create jobseeker account");
        navigate("/Jobseekersignup");
        return;
      }
      if (res.status === 403) {
        toast.alert("To save jobs, create jobseeker account");
        navigate("/Jobseekersignup");
        return;
      }
      if (res.ok) {
        toast.success(data.message);
        navigate("/Jobseeker/savedjobs", { state: jobid });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div id="browsejobs-page">
      <div id="job-search-bar" className="shadow-lg">
        <div id="search-fields" className="d-flex">
          <input
            placeholder="Enter the Job title"
            id="title"
            name="title"
            value={searchjob.title}
            onChange={Handlesearchinput}
            required
          />
          <select
            className="d-flex"
            id="location"
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

        <button className="btn" id="search-btn" onClick={() => browsejobs()}>
          Search
        </button>

        <button
          className="btn"
          id="filter-btn"
          onClick={() => {
            setshow(true);
          }}
        >
          <LuSlidersHorizontal width={18} id="filter-slide-icon" />
          Filter
        </button>
      </div>

      {/* Filter */}
      {show && (
        <div id="filter-area" className="d-flex align-items-center gap-2">
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

          <div id="filterbtn-div">
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
        </div>
      )}

      {/* Show Jobs */}
      {filterjobs && (
        <div id="jobs-area">
          {searchedjobs.map((item) => (
            <div id="job-card">
              <div id="job-jobcard-top">
                <p id="job-tag">{item.tag}</p>
                <button
                  className="btn"
                  id="save-job-btn"
                  type="button"
                  onClick={() => savejob(item._id)}
                >
                  <FaRegBookmark id="job-job-save-mark" />
                </button>
              </div>
              <h1 id="job-title">{item.title}</h1>

              <p id="job-location">{item.location}</p>

              <h1 id="job-salary">
                {item.currency} {item.minsalary}-{item.maxsalary}
              </h1>

              <div id="job-actions" className="d-flex gap-2">
                <button
                  className="btn"
                  id="view-job-btn"
                  onClick={() => {
                    setshowdrawer(true);
                    setjobid(item);
                  }}
                >
                  View Job
                </button>

                <button
                  className="btn"
                  id="apply-job-btn"
                  onClick={() => apply(item._id)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alljobs */}
      {!filterjobs && (
        <div id="jobs-area">
          {alljobs.map((item) => (
            <div id="job-card">
              <div id="job-jobcard-top">
                <p id="job-tag">{item.tag}</p>
                <button
                  className="btn"
                  id="save-job-btn"
                  type="button"
                  onClick={() => savejob(item._id)}
                >
                  <FaRegBookmark id="job-job-save-mark" />
                </button>
              </div>

              <h3 id="job-title">{item.title}</h3>

              <p id="job-company">{item.company}</p>

              <p id="job-salary">
                {item.currency} {item.minsalary}-{item.maxsalary}
              </p>

              <div id="job-actions" className="d-flex gap-2">
                <button
                  className="btn"
                  id="view-job-btn"
                  onClick={() => {
                    setshowdrawer(true);
                    setjobid(item._id);
                  }}
                >
                  View Job
                </button>

                <button
                  className="btn"
                  id="apply-job-btn"
                  onClick={() => apply(item._id)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showdrawer && <Viewjob id={jobid} setshowdrawer={setshowdrawer} />}
    </div>
  );
}

export default Jobseekerjobs;
