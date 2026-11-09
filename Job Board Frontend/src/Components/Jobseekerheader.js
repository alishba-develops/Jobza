import React, { useState } from "react";
import wave from "../assets/images/wave.png";
import notify from "../assets/icons/bell (2).svg";
import "./Components.css";

function Jobseekerheader(props) {
  return (
    <div id="job-dash-right" className="col-12">
      <h4>
        Welcome, {props.user.name}
        <img src={wave} width={45} />
      </h4>

      <div className="col-2" id="header-right">
        <img src={notify} id="job-notify" />

        <div id="job-head-profile">
          <div id="job-profile-pic">
            <img id="header-img" src={props.user.profileimg} />
          </div>

          <p id="rec-profile-name">{props.user.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Jobseekerheader;
