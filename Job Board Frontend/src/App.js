import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Recruiter from "./Recruiter-dashboard/Recruiter";
import Browsejobs from "./Browsejobs";
import Createjobmodal from "./Components/Createjobmodal";
import Landingpage from "./Landingpage";
import Jobseekersignup from "./Components/Jobseekersignup";
import JobseekerdsignIn from "./Components/JobseekerdsignIn";
import Employersignup from "./Components/Employersignup";
import Employersignin from "./Components/Employersignin";
import Emailverify from "./Components/JobseekerEmailverify";
import Employerlandingpage from "./Employerlandingpage";
import Jobseeker from "./JobSeeker-dashboard/Jobseeker";
import Employeremailverify from "./Components/Employeremailverify";
import JobseekerEmailverify from "./Components/JobseekerEmailverify";
import Companymodal from "./Components/Companymodal";
import "react-toastify/dist/ReactToastify.css";
import Applyjob from "./Components/Applyjob";
import Reviewapp from "./Components/Reviewapp";
import Myprofile from "./Components/Myprofile";
import Editprofile from "./Components/Editprofile";
import Company from "./Company";
import Companyinfo from "./Companyinfo";
import Editcompany from "./Components/Editcompany";
import Dashboard from "./Recruiter-dashboard/Dashboard";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route
            path="/Employerlandingpage"
            element={<Employerlandingpage />}
          ></Route>
          <Route path="/Jobseekersignup" element={<Jobseekersignup />}></Route>
          <Route
            path="/JobseekerdsignIn"
            element={<JobseekerdsignIn />}
          ></Route>
          <Route path="/Employersignup" element={<Employersignup />}></Route>
          <Route path="/Employersignin" element={<Employersignin />}></Route>
          <Route path="/Emailverify" element={<Emailverify />}></Route>
          <Route path="/JobseekerDashboard" element={<Jobseeker />}></Route>
          <Route
            path="/JobseekerEmailverify"
            element={<JobseekerEmailverify />}
          ></Route>
          <Route
            path="/Employeremailverify"
            element={<Employeremailverify />}
          ></Route>
          <Route path="/Companymodal" element={<Companymodal />}></Route>
          <Route path="/Recruiter/*" element={<Recruiter />}></Route>
          <Route path="/Jobseeker/*" element={<Jobseeker />}></Route>
          <Route
            path="Recruiter/job/Createjobmodal"
            element={<Createjobmodal />}
          ></Route>
          <Route path="/Browsejobs" element={<Browsejobs />}></Route>
          <Route path="/Applyjob" element={<Applyjob />}></Route>
          <Route path="/Reviewapp" element={<Reviewapp />}></Route>
          <Route path="/Myprofile" element={<Myprofile />}></Route>
          <Route path="/Editprofile" element={<Editprofile />}></Route>
          <Route path="/Company" element={<Company />}></Route>
          <Route path="/Companyinfo" element={<Companyinfo />}></Route>
          <Route path="/Editcompany" element={<Editcompany />}></Route>
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </div>
  );
}

export default App;
