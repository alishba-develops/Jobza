import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Viewjob from "../Components/Viewjob";
import "./Jobseeker.css";
function Jobseekersavejob() {
  const [getjob, setgetjob] = useState([]);

  const fetchjob = () => {
    fetch(`http://localhost:5000/getsavedjobs/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((jobs) => {
        setgetjob(jobs);
        console.log("Saved jobs:", jobs);
      });
  };

  useEffect(() => {
    fetchjob();
  }, []);

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
      const response = await fetch(
        `http://localhost:5000/searchjobbyid/${jobid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(searchjob),
        },
      );
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

  return (
    <div id="savejob-container">
      <h1 id="save-head">Saved Jobs</h1>
      <div id="save-outer">
        {getjob.map((item) => (
          <div id="save-card">
            <p id="save-tag">{item.tag}</p>
            <h3 id="save-title">{item.title}</h3>
            <p id="save-company">{item.company}</p>
            <p id="save-salary ">
              {item.currency} {item.minsalary}-{item.maxsalary}
            </p>
            <div id="save-actions">
              <button
                id="saveview-job-btn"
                onClick={() => {
                  setshowdrawer(true);
                  setjobid(item._id);
                }}
              >
                View Job
              </button>
              <button id="save-apply-job-btn" onClick={() => apply(item._id)}>
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
      {showdrawer && <Viewjob id={jobid} setshowdrawer={setshowdrawer} />}
    </div>
  );
}

export default Jobseekersavejob;
