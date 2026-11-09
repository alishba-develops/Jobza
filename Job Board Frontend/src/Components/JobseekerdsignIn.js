import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modals.css";
import { toast } from "react-hot-toast";

function JobseekerdsignIn() {
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
        if (data.role === "Jobseeker") {
          navigate("/Jobseeker/browsejob");
        } else {
          toast("Account does not exist for Jobseeker", { icon: "⚠️" });
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("FULL FETCH ERROR:", error);
      toast.alert(error.message);
    }
  };

  return (
    <div id="jobseekersignin">
      <form
        id="jobseeker-signin-form"
        className="col-4"
        onSubmit={loginjobseekeraccount}
      >
        <div id="jobseekersignin-top">
          <h1 className="text-center" id="jobseekersignin-logo">
            Job<span>za</span>
          </h1>
          <div>
            <h3 className="text-center" id="jobseekersignin-create-h">
              SignIn your account
            </h3>

            <p className="text-center" id="jobseekersignin-para">
              Free for job seekers. Takes about a minute.
            </p>
          </div>
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1" id="employersignin-label">
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
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1" id="employersignin-label">
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

        <div id="jobseekersignin-div">
          <button type="submit" className="btn" id="jobseekersignin-btn-login">
            Login
          </button>
        </div>

        <p id="job-connect-login" className="text-center">
          Do not have an account <a href="/Jobseekersignup">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default JobseekerdsignIn;
