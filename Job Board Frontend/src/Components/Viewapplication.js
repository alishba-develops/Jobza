import React, { useState, useEffect } from "react";
import "./Components.css";
import { IoMdClose } from "react-icons/io";
function Viewapplication(props) {
  const [appbyid, setappbyid] = useState({});
  const fetchapi = () => {
    fetch(`http://localhost:5000/showrecruiterapplicationbyid/${props.data}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        setappbyid(user);
      });
  };

  useEffect(() => {
    console.log("Received ID in Viewapplication:", props.data);
    fetchapi();
  }, []);

  const [status, setstatus] = useState({});
  const Handlestatus = (e) => {
    const { name, value } = e.target;
    setstatus({ ...status, [name]: value });
  };

  const fetchstatus = () => {
    fetch(`http://localhost:5000/status/${props.data}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        setappbyid(user);
        props.fetchapi();
      });
  };

  const close = () => {
    props.setshow(false);
  };

  return (
    <div id="drawer-outer">
      <div id="job-drawer">
        <div id="drawer-header">
          <h4 id="drawer-title">Application Details</h4>

          <button className="btn" onClick={() => close()}>
            <IoMdClose id="viewapp-drawer-close-btn" />
          </button>
        </div>

        <div id="applicant-section">
          <p id="applicant-name">{appbyid.fullname}</p>

          <div id="applicant-contact">
            <p id="applicant-city">{appbyid.city}</p>
            <p id="applicant-email">{appbyid.email}</p>
            <p id="applicant-phone">{appbyid.phone}</p>
          </div>
        </div>

        <div id="status-section">
          <h5 id="status-title">Status</h5>

          <select
            id="status-select"
            className="form-select"
            onChange={Handlestatus}
            name="status"
          >
            <option value={"Pending"}>{appbyid.status}</option>
            <option value={"Shortlist"}>Shortlist</option>
            <option value={"Interview"}>Interview</option>
            <option value={"Offer"}>Offer</option>
            <option value={"Hired"}>Hired</option>
            <option value={"Rejected"}>Rejected</option>
          </select>

          <button
            id="status-update-btn"
            className="btn"
            onClick={() => fetchstatus()}
          >
            Update
          </button>
        </div>

        <div id="resume-section">
          <h5 id="resume-title">Resume</h5>

          <div id="resume-container">
            <iframe id="application-resume" src={appbyid.resume} width={400} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewapplication;
