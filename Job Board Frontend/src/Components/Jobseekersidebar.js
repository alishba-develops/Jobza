import React from 'react'
import './Components.css'
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdOutlineFindInPage } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { MdBookmarkBorder } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
function Jobseekersidebar() {
const navigate = useNavigate();
   const logout = async()=>{

         try {
              const res = await fetch(`http://localhost:5000/logout`,{
                method: "POST",
    credentials: "include"
              });
              
              const data = await res.json();
               
            
              if (res.ok) {
                toast.success(data.message);
                navigate("/")
                return;
              }
            } catch (error) {
              console.log("APPLY ERROR:", error);
              toast.error(error.message);
            }
          };
   


  return (
   
<div id="dash-left" className="col-2 mt-1">

 
  <div id="logo-section" className="column">

    <div id="logo-container" className="container">

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



      <a id="job-findjobs-link" href="/Jobseeker/browsejob">
        <button
          className="btn"
          id="job-side-button"
        >
          <MdOutlineFindInPage  id='jobside-icon' />
          Find Jobs
         
        </button>
      </a>


      <a id="applications-link" href="/Jobseeker/application">
        <button
          href="#"
          className="btn"
          id="job-side-button"
        >
          <LuClipboardList id='jobside-icon'/>
          My Applications
        </button>
      </a>


      <a id="saved-jobs-link" href="/Jobseeker/savedjobs">
        <button
          href="#"
          className="btn"
          id="side-button"
        >
          <MdBookmarkBorder id='jobside-icon'  />  
          Saved Jobs
        </button>
      </a>

      <a id="interviews-link" href="/Jobseeker/company">
        <button
          href="#"
          className="btn"
          id="side-button"
        >
          <BsBuildings id='jobside-icon'  />
          Companies
        </button>
      </a>

    </div>
  
    <div id="sidedown-d">

      <a id="settings-link" href="/Jobseeker/setting">
        <button className="btn" id="settings-button">
           <IoSettingsOutline id='dash-icons' />
          Settings
        </button>
      </a>


      <button
        className="btn"
        id="logout-button"
        onClick={() => logout()}
      >
        <FiLogOut id='dash-icons' />
        Logout
      </button>

    </div>

  </div>

</div>
 
  )
}

export default Jobseekersidebar