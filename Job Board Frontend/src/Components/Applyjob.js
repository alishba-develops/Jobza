import React, { useState, useEffect } from "react";
import "./Components.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Applyjob() {
  const location = useLocation();
  const { jobid } = location.state;
  const [handleinput, sethandleinput] = useState({});
  const Handleinput = (e) => {
    const { name, value } = e.target;

    sethandleinput({ ...handleinput, [name]: value });
  };
  const [resume, setresume] = useState("");
  const Handleresume = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setresume(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const navigate = useNavigate();
  const reviewpage = (e) => {
    e.preventDefault();
    const allappdata = {
      ...handleinput,
      resume,
      jobid,
    };
    navigate("/Reviewapp", {
      state: allappdata,
    });
  };

  return (
    <div id="applyjob-page">
      <form
        id="application-form"
        className="col-6 d-flex flex-column"
        onSubmit={reviewpage}
      >
        <h1 id="apply-top-hed">Complete Your Application</h1>

        <div id="contact-section">
          <h1 id="section-title">Add your contact info</h1>

          <p id="section-description">
            Add your location Fields marked with an asterisk(*) are required.
          </p>

          <label id="firstname-label">Full Name*</label>

          <input
            type="text"
            id="firstname"
            name="fullname"
            value={handleinput.fullname}
            onChange={Handleinput}
            required
          />
          <label id="email-label">Email*</label>

          <input
            type="email"
            id="email"
            name="email"
            value={handleinput.email}
            onChange={Handleinput}
            required
          />

          <label id="phone-label">Phone Number*</label>

          <input
            type="text"
            id="phone"
            name="phone"
            value={handleinput.phone}
            onChange={Handleinput}
            required
          />
        </div>

        <div id="location-section">
          <h1 id="section-title">Add your location</h1>

          <p id="section-description">
            Add your location Fields marked with an asterisk(*) are required.
          </p>

          <label id="location-label">Country*</label>

          <input
            id="city"
            name="location"
            value={handleinput.location}
            onChange={Handleinput}
            required
          />

          <label id="city-label">City, Province*</label>

          <input
            id="city"
            name="city"
            value={handleinput.city}
            onChange={Handleinput}
            required
          />

          <label id="address-label">Street Address*</label>

          <input
            id="address"
            name="address"
            value={handleinput.address}
            onChange={Handleinput}
            required
          />
        </div>

        <div id="resume-section">
          <h1 id="section-title">Add resume</h1>

          <div id="upload-resume-option">
            <h4 id="resume-option-title">Upload resume</h4>

            <div id="resume-upload-group" className="form-group">

              <input
                type="file"
                className="form-control-file"
                id="resume"
                name="resume"
                onChange={Handleresume}
                required
              />
            </div>
          </div>
        </div>

        <div id="rev-btn-div">
          <button type="submit" className="btn" id="rev-review-button">
            Review your application
          </button>
        </div>
      </form>
    </div>
  );
}

export default Applyjob;
