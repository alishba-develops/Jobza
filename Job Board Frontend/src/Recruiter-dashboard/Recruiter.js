import React, { useState, useEffect } from "react";
import Recruiterheader from "../Components/Recruiterheader";
import Recruitersidebar from "../Components/Recruitersidebar";
import Recruitercandidate from "./Recruitercandidate";
import Recruiterjob from "./Recruiterjob";
import "./Recruiter.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from "./Application";
import Interview from "./Interview";
import Recruitercompany from "./Recruitercompany";
import Dashboard from "./Dashboard";
import Setting from "../JobSeeker-dashboard/Setting";

function Recruiter(props) {
  const [jobdata, setjobdata] = useState([]);
  const fetchapi = () => {
    fetch("http://localhost:5000/getemployerjobdata/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        setjobdata(user);
        console.log(user);
      });
  };

  useEffect(() => {
    fetchapi();
  }, []);
  return (
    <div id="recruiter" className="bg-light">
      <Recruitersidebar />
      <div id="recruiter-right" className="col-10">
        <Recruiterheader id="header" />
        <Routes>
          <Route path="/Recruiterdashboard" element={<Dashboard />}></Route>
          <Route
            path="/job"
            element={<Recruiterjob jobdata={jobdata} fetchapi={fetchapi} />}
          ></Route>
          <Route path="/application" element={<Application />}></Route>
          <Route path="/company" element={<Recruitercompany />}></Route>
          <Route path="/candidate/*" element={<Recruitercandidate />}></Route>
          <Route path="/Interview/" element={<Interview />}></Route>
          <Route path="/recruitersetting/" element={<Setting />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Recruiter;
