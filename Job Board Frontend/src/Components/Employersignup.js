import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"
import "./Modals.css";

function Employersignup() {
  const navigate = useNavigate();
  const [handleinput, sethandleinput] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const Handleinput = (e) => {
    const { name, value } = e.target;
    sethandleinput({ ...handleinput, [name]: value });
  };

  const Createjobseekeraccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/employersignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(handleinput),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        sessionStorage.setItem("verificationEmail", handleinput.email);
        navigate("/Employeremailverify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("FULL FETCH ERROR:", error);
      toast.error(error.message);
    }
  };

  return (
    <div id="emp-signup-form1">
      <form
        id="emp-signup-form"
        className="col-4"
        onSubmit={Createjobseekeraccount}
      >
        <div id="emp-signup-top">
          <h2 className="text-center" id="employersignup-logo">
            Job<span id="employersignup-logo-span">za</span>
          </h2>

          <p className="text-center" id="empsignup-for-employers">
            For Employers.
          </p>
        </div>

        <h3 className="text-center" id="emp-signup-create-h">
          Create your account
        </h3>

        <div className="form-group" id="emp-name-group">
          <label htmlFor="name" className="lead" id="employersignup-label">
            Full Name
          </label>

          <input
            type="text"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="name"
            value={handleinput.name}
            onChange={Handleinput}
            required
          />
        </div>

        <div className="form-group" id="employer-email-group">
          <label
            htmlFor="email"
            className="lead"
            id="employersignup-label"
          >
            Work email
          </label>

          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            id="email"
            name="email"
            value={handleinput.email}
            onChange={Handleinput}
            required
          />
        </div>

        <div className="form-group" id="employer-password-group">
          <label
            htmlFor="password"
            className="lead"
            id="employersignup-label"
          >
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
          />
        </div>

        <div id="employer-terms" className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />

          <label className="form-check-label" htmlFor="exampleCheck1">
            I agree to the <a>Terms of Service</a> and
            <a>Privacy Policy</a>
          </label>
        </div>

        <div id="emp-signup-btn">
          <button type="submit" className="btn" id="empsignup-button">
            Create account
          </button>
        </div>

        <p id="job-connect-login" className="text-center">
          Already have an account
          <a href="/EmployersignIn">Log in</a>
        </p>
      </form>
    </div>
  );
}

export default Employersignup;
