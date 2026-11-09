import React, { useState, useEffect } from "react";
import Jobseekerheader from "../Components/Jobseekerheader";
import Jobseekersidebar from "../Components/Jobseekersidebar";
import "./Jobseeker.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Jobseekerjobs from "./Jobseekerjobs";
import Jobseekersavejob from "./Jobseekersavejob";
import Jobseekerapplication from "./Jobseekerapplication";
import Setting from "./Setting";
import Jobseekercompany from "./Jobseekercompany"
function Jobseeker() {
 
    const [user, setuser] = useState("");
     const fetchuser = () => {
       fetch("http://localhost:5000/getuser", {
        credentials:"include"
       })
         .then((res) => res.json())
         .then((user) => {
           setuser(user);
         });
     };
   
     useEffect(() => {
       fetchuser();
     }, []);


  return (
    <div id="recruiter" className="bg-light">
      <Jobseekersidebar />
      <div id="recruiter-right" className="col-10">
        <Jobseekerheader id="header" user = {user}/>
        <Routes>
          <Route path="/browsejob" element={<Jobseekerjobs />}></Route>
          <Route path="/savedjobs" element={<Jobseekersavejob />}></Route>
          <Route path="/application" element={<Jobseekerapplication />}></Route>
           <Route path="/setting" element={<Setting  user = {user}/>}></Route>
           <Route path="/company" element={<Jobseekercompany  user = {user}/>}></Route>
        </Routes>
      </div>
     
    </div>


  );
}

export default Jobseeker;
