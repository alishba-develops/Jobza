import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modals.css";
import { toast } from "react-hot-toast";

function Jobseekersignup() {
  const navigate = useNavigate();
  const [handleinput, sethandleinput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const Handleinput = (e) => {
    const { name, value } = e.target;
    sethandleinput({ ...handleinput, [name]: value });
  };

  const Createjobseekeraccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(handleinput),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        sessionStorage.setItem("verificationEmail", handleinput.email);
        navigate("/JobseekerEmailverify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("FULL FETCH ERROR:", error);
      toast.error(error.message);
    }
  };

  return (
    <div id="jobseeker-signup">
      <form
        id="jobseeker-signup-form"
        className="col-4"
        onSubmit={Createjobseekeraccount}
      >
        <div id="jobseekersignup-top">
          <h1 className="text-center" id="jobseekersignup-logo">
            Job<span>za</span>
          </h1>
          <div>
            <h3 className="text-center" id="jobseeker-signup-create-h">
              Create your account
            </h3>
            <p className="text-center" id="jobsignup-para">
              Free for job seekers. Takes about a minute.
            </p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name" className="lead" id="jobseekersignup-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={handleinput.name}
            onChange={Handleinput}
            required
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="lead" id="jobseekersignup-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={handleinput.email}
            onChange={Handleinput}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="lead" id="jobseekersignup-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="email"
            name="password"
            value={handleinput.password}
            onChange={Handleinput}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            required
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            I agree to the Terms of Service and Privacy Policy
          </label>
        </div>

        <div id="jobseekersignup-btn" className="text-center">
          <button
            type="submit"
            className="btn"
            href="/Emailverify"
            id="jobseeker-createacc-btn"
          >
            Create Account
          </button>
        </div>

        <p id="job-connect-login" className="text-center">
          Already have an account <a href="/JobseekerdsignIn"> Log in </a>
        </p>
      </form>
    </div>
  );
}

export default Jobseekersignup;
