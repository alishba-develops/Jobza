import React, { useState } from "react";
import "./Components.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
function Myprofile() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.handleinput;
  const edit = location.state.edit;
  const editprofile = () => {
    navigate("/Editprofile", { state: user });
  };

  return (
    <div id="profile-page" className="container">
      <div id="profile-header" className="card">
        <div id="profile-cover"></div>

        <div id="profile-main" className="card-body">
          <img
            id="profile-image"
            src={user.profileimg}
            alt="Profile"
            width={50}
          />
{
  edit && 
   <button
            id="profile-edit-btn"
            className="btn"
            onClick={() => editprofile()}
          >
            Edit Profile
          </button>
}
         

          <h2 id="profile-name">{user.name}</h2>
          <p id="profile-city">{user.city}</p>
        </div>
      </div>
 
      <div id="profile-experience" className="card profile-section">
        <h4>Experience</h4>

        {user.profile.experience.map((item, index) => (
          <div className="profile-item" key={index}>
            <div className="profile-item-icon">
              <FaBriefcase />
            </div>

            <div>
              <h5>{item.expjob}</h5>
              <p>{item.exporganization}</p>
              <p>{item.explocation}</p>
              <p>
                {item.explocationtype} · {item.expemploymenttype}
              </p>
            </div>
          </div>
        ))}
      </div>
    
      <div id="profile-education" className="card profile-section">
        <h4>Education</h4>

        {user.profile.education.map((item, index) => (
          <div className="profile-item" key={index}>
            <div className="profile-item-icon">
              <FaGraduationCap />
            </div>

            <div>
              <h5 id="profile-item-h">{item.school}</h5>
            </div>
          </div>
        ))}
      </div>

      <div id="profile-skills" className="card profile-section">
        <h4>Skills</h4>

        <div id="profile-skills-list">
          {user.profile.skill.map((item, index) => (
            <div className="profile-skill" key={index}>
              {item.skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Myprofile;
