import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Jobseeker.css";
function Jobseekercompany() {
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

  // Get company by name

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
    <div id="job-companies-page">
      <div id="job-companies-header">
        <h1 id="job-companies-title">Find great places to work</h1>

        <p id="job-companies-subtitle">
          Get access to millions of company reviews
        </p>

        <div id="job-company-search">
          <input
            placeholder="Company name"
            className="col-4"
            name="name"
            value={searchcompany.name || ""}
            onChange={Handlesearchinput}
          />

          <button id="job-company-search-btn" onClick={browsecompany}>
            Find Companies
          </button>
        </div>
      </div>

      <div id="job-company-list">
        {company
          .filter((item) =>
            item.name.toLowerCase().includes(filtername.toLowerCase()),
          )
          .map((item) => (
            <div id="company-card" key={item._id}>
              <div id="job-company-card-top">
                <div id="job-company-logo-box">
                  <img width={50} src={item.logo} />
                </div>

                <div id="job-company-right-info">
                  <h4>{item.name}</h4>
                  <p>{item.address}</p>
                  <p>{item.location}</p>
                </div>
              </div>
              <div id="jobcompany-visitbtn-div">
                <button
                  id="job-company-visit-btn"
                  type="button"
                  onClick={() => visit(item._id)}
                >
                  Visit
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Jobseekercompany;
