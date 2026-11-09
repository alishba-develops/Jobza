import React, { useState, useEffect } from "react";
import './Browsejobs.css'
import Viewjob from "./Components/Viewjob";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Browsejobs() {
  const location = useLocation();
   const category = location.state?.category;
   const id = location.state?.id;
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

  const [searchjob, setsearchjob] = useState({});

  const Handlesearchinput = (e) => {
    const { name, value } = e.target;
    setsearchjob({ ...searchjob, [name]: value });
  };
  const [searchedjobs, setsearchedjobs] = useState([]);
  const searchjobs = async () => {
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

  // Apply
  const navigate = useNavigate();
  const apply = async (jobid) => {
    try {
      const res = await fetch(`http://localhost:5000/apply/${jobid}`, {
        method: "POST",
        credentials: "include",
      });
      console.log("STATUS:", res.status);
      const data = await res.json();
      console.log("RESPONSE:", data);
      if (res.status === 401) {
        toast.error("To save jobs, create jobseeker account");
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
          state: jobid,
        });
        return;
      }
    } catch (error) {
      console.log("APPLY ERROR:", error);
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
        toast.error("To save jobs, create jobseeker account");
        navigate("/Jobseekersignup");
        return;
      }
      if (res.status === 403) {
        toast.error("To save jobs, create jobseeker account");
        navigate("/Jobseekersignup");
        return;
      }
      if (res.ok) {
        toast.success(data.message);
        navigate("/Jobseeker/savedjobs", { state: jobid });
        return;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get all jobs

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

  // View job

  const [showdrawer, setshowdrawer] = useState(false);
  const [jobid, setjobid] = useState("");

  return (
    <div id="browsejobs-body">
      <header id="bj-header">
        <h1 id="logo">
          Job<span id="span">za</span>
        </h1>
        <nav>
        
          <a href="/" id="Browsejob-a">Home</a>
          <a href="/Company" id="Browsejob-a">Comapny Reviews</a>
          <a id="for-employers">Browse Jobs</a>
          <a href="/Employerlandingpage" id="Browsejob-a">For Employers</a>
        </nav>
        <div id="bj-header-btn-div">
          <a href="/JobseekerdsignIn" id="link">
            <button className="btn" id="signin-btn">
              Sign In
            </button>
          </a>
          <a href="/Employersignup" id="link">
            <button className="btn" id="signup-btn">
              Employer Signup
            </button>
          </a>
        </div>
      </header>

 <div id="find" className="shadow-lg" >
            <div className="d-flex col-9">
              <input
              className="col-6"
            placeholder="Enter the Job title"
            id="title"
            name="title"
            value={searchjob.title}
            onChange={Handlesearchinput}
            required
          />
            
             <select
             
            className="d-flex col-6"
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
           <button className="btn" id="search-btn" onClick={() => searchjobs()}>
            Search
          </button>
          </div>

      <div className="d-flex" id="row3">
       

        <div className="col-4 d-flex flex-column" id="bj-filter-div">
         <div className="d-flex" id="filter-top">
           <p>Filter</p>
<button className="btn" id="search-btn" onClick={() => searchjobs()}>
            Apply
          </button>
         </div>
         
         
          <h4>Category</h4>
          <select name="category"  value={searchjob.category}
            onChange={Handlesearchinput} id="cat-select">
            <option value="">Select Category</option>
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
          <h4>Employemnt Type</h4>
          <div id="option">
             <label id="label">Internship</label>
             <input
          id="checkbox"
            type="checkbox"
            name="employmenttype"
            value={"Internship"}
            onChange={Handlesearchinput}
          />
          </div>
          
         
          
          <div id="option">
              <label id="label">Fulltime</label>
          <input
           id="checkbox"
            type="checkbox"
            name="employmenttype"
            value={"Fulltime"}
            onChange={Handlesearchinput}
          />
          </div>
        
        
        <div id="option">
          <label id="label">Partime</label>
           <input
           id="checkbox"
            type="checkbox"
            name="employmenttype"
            value={"Partime"}
            onChange={Handlesearchinput}
          />
        </div>
          
         
          <div id="option">
             <label id="label">Contract</label>
           <input
           id="checkbox"
            type="checkbox"
            name="employmenttype"
            value={"Contract"}
            onChange={Handlesearchinput}
          />
          </div>

          <h4>Workplace</h4>
          <div id="option">
             <label id="label">On-site</label>
          <input
           id="checkbox"
            type="checkbox"
            name="workplace"
            value={"On-site"}
            onChange={Handlesearchinput}
          />
          </div>
         

         <div id="option">
            <label id="label">Remote</label>
           <input
           id="checkbox"
            type="checkbox"
            name="workplace"
            value={"Remote"}
            onChange={Handlesearchinput}
          />
         </div>
        

          <div id="option">
             <label id="label">Hybrid</label>
<input
           id="checkbox"
            type="checkbox"
            name="workplace"
            value={"Hybrid"}
            onChange={Handlesearchinput}
          />
          </div>
         
          <h4>Experience</h4>
        <div id="option">
            <label  id="label">Beginner</label>
          <input  id="checkbox" type="checkbox"    name="experience"
            value={"Beginner"}
            onChange={Handlesearchinput}/>
        </div>

            <div id="option">
               <label id="label">Intermediate</label>
          <input  id="checkbox" type="checkbox"   name="experience"
            value={"Intermediate"}
            onChange={Handlesearchinput}/>
            </div>
         
        
         
          <div id="option">
            <label id="label">Advanced</label>
<input  id="checkbox" type="checkbox"   name="experience"
            value={"Advanced"}
            onChange={Handlesearchinput}/>
          </div>
          
        </div>

        <div  id="bj-show-jobs">
          {filterjobs && (
            <div id="bj-job-card">
              {searchedjobs.map((item) => (
                <div className="d-flex" id="bj-each-card">
                  <p id="bj-job-title">{item.title}</p>
                   <p id="bj-job-company">{item.company}</p>
                
                  <p id="bj-job-salary"> {item.currency} {item.salary}</p>
                 
                  <button
                   id="bj-view-btn"
                    onClick={() => {
                      setshowdrawer(true);
                      setjobid(item._id);
                    }}
                  >
                    View Job
                  </button>
               
                 
                </div>
              ))}
            </div>
          )}

          {/* All jobs */}
          {!filterjobs && (
            <div id="bj-job-card">
              {alljobs.filter((job)=>job.status === "Open")
              .filter((job)=>!category || job.category === category)
              .filter((job)=>!id || job._id === id)
              .map((item) => (
                <div id="bj-each-card">
                  <p  id="bj-job-tag">{item.tag}</p>
                  <h3  id="bj-job-title">{item.title}</h3>
                  <p  id="bj-job-company">{item.company}</p>    
                  <p  id="bj-job-salary">{item.currency } {item.salary}</p>
                  <div>
                      <button
                      id="bj-view-btn"
                    onClick={() => {
                      setshowdrawer(true);
                      setjobid(item._id);
                    }}
                  >
                    View Job
                  </button>
                 
                    </div>
                </div>
                
              ))}
            </div>
          )}
        </div>
      </div>

      {showdrawer && <Viewjob id={jobid} setshowdrawer={setshowdrawer} />}
    </div>
  );
}

export default Browsejobs;
