import React, { useState, useEffect } from "react";
import hand from "../assets/icons/hand.jpg";
import "./Components.css";
import { useNavigate } from "react-router-dom";
function Recruiterheader() {
  const [user, setuser] = useState("");
  const fetchuser = () => {
    fetch("http://localhost:5000/getuser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        setuser(user);
      });
  };

  useEffect(() => {
    fetchuser();
  }, []);

  const navigate = useNavigate();
  const profile = () => {
    navigate("/Myprofile", {
      state: user,
    });
  };

    const openjobmodal = () => {
      navigate("/Recruiter/job/Createjobmodal");
    };

  return (
    <div id="rec-dash-right" className="col-12">
      <h3 id="welcome-heading">
        Welcome Back, {user.name}
        <div id="profile-pic">
          <img id="header-img" src={hand} />
        </div>
      </h3>

      <div className="col-2" id="header-right">
       
          <button className="btn" id="post-job-btn" onClick={() => openjobmodal()}>
          + Post a job
        </button>

        <div id="rec-profile">
          <div id="job-profile-pic">
            <img id="header-img" src={user.profileimg} />
          </div>

          <p id="rec-profile-name">{user.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Recruiterheader;
