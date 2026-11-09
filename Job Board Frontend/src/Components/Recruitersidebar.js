import React from "react";
import "./Components.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
function Recruitersidebar() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await fetch(`http://localhost:5000/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        navigate("/Employerlandingpage");
        return;
      }
    } catch (error) {
      console.log("APPLY ERROR:", error);
      toast.error(error.message);
    }
  };

  return (
    <div id="dash-left" className="col-2 mt-1">
      <div id="logo" className="column">
        <div className="container">
          <h1 id="logo">
            Job<span id="span">za</span>
          </h1>
        </div>
      </div>

      <div id="side-down" className="column">
        <div id="left-general" className="mt-3 column">
          <p id="general-p" className="lead">
            General
          </p>

          <a href="/Recruiter/Recruiterdashboard">
            <button href="#" className="btn " id="side-button">
              <MdDashboard id="dash-icons" />
              Dashboard
            </button>
          </a>

          <a href="/Recruiter/job">
            <button className="btn" id="side-button">
              <MdWorkOutline id="dash-icons" />
              Jobs
            </button>
          </a>

          <a href="/Recruiter/application">
            <button href="#" className="btn " id="side-button">
              <MdOutlineAssignment id="dash-icons" />
              Applications
            </button>
          </a>

          <a href="/Recruiter/candidate">
            <button href="#" className="btn " id="side-button">
              <HiOutlineUsers id="dash-icons" />
              Candidates
            </button>
          </a>

          <a href="/Recruiter/company">
            <button href="#" className="btn " id="side-button">
              <HiOutlineBuildingOffice2 id="dash-icons" />
              Company
            </button>
          </a>
        </div>
        <div id="sidedown-d">
          <a href="/Recruiter/recruitersetting">
            <button className="btn" id="rec-side-setting">
              <IoSettingsOutline id="dash-icons" />
              Settings
            </button>
          </a>

          <button className="btn" onClick={() => logout()} id="rec-side-logout">
            <FiLogOut id="dash-icons" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recruitersidebar;
