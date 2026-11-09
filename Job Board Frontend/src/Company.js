import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Company.css";

function Company() {
  // Get Company

  const [company, setcompany] = useState([]);
  const fetchapi = () => {
    fetch("http://localhost:5000/getallcompany/")
      .then((res) => res.json())
      .then((company) => {
        setcompany(company);
        console.log(company);
      });
  };
  useEffect(() => {
    fetchapi();
  }, []);

  // Visit
  const navigate = useNavigate();
  const visit = (id) => {
    navigate("/Companyinfo", { state: { id: id } });
  };

  // Get comapny by name

  const [searchcompany, setsearchcompany] = useState({});

  const Handlesearchinput = (e) => {
    const { name, value } = e.target;
    setsearchcompany({ ...searchcompany, [name]: value });
  };

  const [filtername, setfiltername] = useState("");
  const browsecompany = () => {
    setfiltername(searchcompany.name || "");
  };

  return (
    <div id="companies-page">
      <header id="company-hero-header">
        <h1 id="logo">
          Job<span id="span">za</span>
        </h1>
        <nav id="lp-nav">
          <a href="/">Home</a>
          <a href="/Company" id="for-employers">
            Comapny Reviews
          </a>
          <a href="/Browsejobs">Browse Jobs</a>
          <a href="/Employerlandingpage">For Employers</a>
        </nav>
        <div id="lp-btn-div">
          <a href="/JobseekerdsignIn" id="link">
            <button className="btn" id="signin-btn">
              Sign In
            </button>
          </a>
          <a href="/Jobseekersignup" id="link">
            <button className="btn" id="signup-btn">
              Signup
            </button>
          </a>
        </div>
      </header>

      <div id="companies-header">
        <h1 id="companies-title">Find great places to work</h1>

        <p id="companies-subtitle">Get access to millions of company reviews</p>

        <div id="company-search">
          <input
            placeholder="Company name"
            id="company-search-label"
            name="name"
            value={searchcompany.name || ""}
            onChange={Handlesearchinput}
          />
          <button id="company-search-btn" onClick={browsecompany}>
            Find Companies
          </button>
        </div>
      </div>

      <div id="company-list">
        {company
          .filter((item) =>
            item.name.toLowerCase().includes(filtername.toLowerCase()),
          )
          .map((item) => (
            <div id="company-card" key={item._id}>
              <div id="company-card-top">
                <div id="company-logo-box">
                  <img width={50} src={item.logo} />
                </div>

                <h4>{item.name}</h4>
              </div>

              <div id="company-details">
                <p id="company-salary">Salaries</p>

                <p id="card-company-jobs">Open jobs</p>
              </div>

              <button
                id="company-visit-btn"
                type="button"
                onClick={() => visit(item._id)}
              >
                Visit
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Company;
