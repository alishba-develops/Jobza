import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

function Reviewapp() {
  const location = useLocation();
  const [reviewdata, setreviewdata] = useState(location.state);
  const jobid = reviewdata.jobid;
  const navigate = useNavigate();
  const handlefinalinput = (e) => {
    const { name, value } = e.target;
    setreviewdata({ ...reviewdata, [name]: value });
  };

  // Submit application
  const submitapp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/submitapp/${jobid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reviewdata),
      });

      const response = await res.json();

      if (res.ok) {
        toast.success(response.message);
        navigate("/Jobseeker/application");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div id="review-page" className="d-flex flex-column">
      <div id="review-form">
        <h1 id="review-title">Review your application</h1>

        <label id="review-name-label">Name</label>

        <input
          id="review-name"
          name="fullname"
          onChange={handlefinalinput}
          value={reviewdata.fullname}
        />

        <label id="review-email-label">Email</label>

        <input
          id="review-email"
          name="email"
          onChange={handlefinalinput}
          value={reviewdata.email}
        />

        <label id="review-phone-label">Phone</label>

        <input
          id="review-phone"
          name="phone"
          onChange={handlefinalinput}
          value={reviewdata.phone}
        />

        <label id="review-address-label">Address</label>

        <input
          id="review-address"
          name="city"
          onChange={handlefinalinput}
          value={reviewdata.city}
        />

        <label id="review-resume-label">Resume</label>

        <div id="resume-preview-container">
          <iframe
            id="resume-preview"
            src={reviewdata.resume}
            width={500}
            height={500}
            className="resume-preview"
          />
        </div>

        <div id="submitapp-btn-div">
          <button
            className="btn"
            id="submit-application-btn"
            onClick={submitapp}
          >
            Submit application
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reviewapp;
