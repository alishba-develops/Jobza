import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./Modals.css";

function JobseekerdsignIn() {
  const Company = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/companyexist", {
        credentials: "include",
      });
      const data = await response.json();

      if (response.status === 404) {
        return false;
      }

      if (response.ok) {
        return true;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("FULL FETCH ERROR:", error);
      toast.error(error.message);
    }
  };

  const navigate = useNavigate();
  const [handleinput, sethandleinput] = useState({
    email: "",
    password: "",
  });
  const Handleinput = (e) => {
    const { name, value } = e.target;
    sethandleinput({ ...handleinput, [name]: value });
  };

  const loginjobseekeraccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(handleinput),
      });
      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("verificationEmail", handleinput.email);

        if (data.role === "Employer") {
          const hascompany = await Company();
          if (hascompany) {
            navigate("/Recruiter/Recruiterdashboard");
          } else {
            navigate("/Companymodal");
          }
        } else {
          toast.error("Account does not exist for employer");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("FULL FETCH ERROR:", error);
      toast.error(error.message);
    }
  };

  return (
    <div id="emp-signin-form1">
      <form
        id="emp-signin-form"
        className="col-4"
        onSubmit={loginjobseekeraccount}
      >
        <div id="emp-signin-top">
          <h1 className="text-center" id="employersignin-logo">
            Job<span>za</span>
          </h1>
          <p className="text-center" id="emp-for-employers">
            For Employers
          </p>
        </div>

        <h3 className="text-center" id="employer-signin-create-h">
          Login your Account
        </h3>

        <div className="form-group" id="emp-login-email-group">
          <label htmlFor="email" id="employersignin-label-email">
            Enter your email
          </label>

          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            id="email"
            name="email"
            value={handleinput.email}
            onChange={Handleinput}
          />
        </div>

        <div className="form-group" id="employer-login-password-group">
          <label htmlFor="password" id="employersignin-label-password">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            id="email"
            name="password"
            value={handleinput.password}
            onChange={Handleinput}
          />
        </div>

        <div id="employeesignin-btn">
          <button type="submit" className="btn" id="emp-login-btn">
            Login
          </button>
        </div>

        <p id="job-connect-login" className="text-center">
          Do not have an account <a href="/Employersignup">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default JobseekerdsignIn;
