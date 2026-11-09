import React, { useState, useEffect } from "react";
import "./Components.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
function Viewjob(props) {
  const close = () => {
    props.setshowdrawer(false);
  };
  // Get job By ID

  const [jobbyid, setjobbyid] = useState({});
  const getjobbyid = async (req, res) => {
    try {
      const res = await fetch(
        `http://localhost:5000/searchjobbyid/${props.id}`,
      );

      const data = await res.json();

      if (res.ok) {
        setjobbyid(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getjobbyid();
  }, []);

  // Apply
  const navigate = useNavigate();
  const apply = async (jobid) => {
    try {
      const res = await fetch(`http://localhost:5000/apply/${jobid}`, {
        method: "POST",
        credentials: "include",
      });
      console.log("STATUS:", res.status);
      const data = await res.json();
      console.log("RESPONSE:", data);
      if (res.status === 401) {
        toast.error("To save jobs, create jobseeker account");
        navigate("/Jobseekersignup");
        return;
      }
      if (res.status === 403) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        toast.success(data.message);
        navigate("/Applyjob", {
          state: jobid,
        });
        return;
      }
    } catch (error) {
      console.log("APPLY ERROR:", error);
      toast.error(error.message);
    }
  };

  // Save job
  const savejob = async (jobid) => {
    try {
      const res = await fetch(`http://localhost:5000/save/${jobid}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 401) {
        toast.error("To save jobs, create jobseeker account");
        navigate("/Jobseekersignup");
        return;
      }
      if (res.status === 403) {
        toast.error("To save jobs, create jobseeker account");
        navigate("/Jobseekersignup");
        return;
      }
      if (res.ok) {
        toast.success(data.message);
        navigate("/Jobseeker/savedjobs", { state: jobid });
        return;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div id="drawer-outer">
      <div id="job-drawer">
        <button type="button" id="drawerclose-btn" onClick={() => close()}>
          <IoCloseOutline id="drawer-close" />
        </button>

        <div id="drawer-job-header">
          <h1 id="drawer-job-title">{jobbyid.title}</h1>

          <h4 id="drawer-job-company">{jobbyid.company}</h4>

          <p id="drawer-job-location">{jobbyid.location}</p>

          <p id="drawer-job-salary">{jobbyid.salary}</p>

          <div id="drawer-job-actions" className="d-flex gap-2">
            <button
              className="btn"
              id="drawer-apply-btn"
              onClick={() => apply(jobbyid._id)}
            >
              Apply
            </button>
          </div>
        </div>

        <div id="drawer-job-details">
          <h2 id="details-heading">Job Details</h2>

          <p id="details-pay-label">Pay</p>

          <p id="details-pay">
            {jobbyid.currency} {jobbyid.minsalary}-{jobbyid.maxsalary}
          </p>

          <p id="details-type-label">Job type</p>

          <p id="details-type">{jobbyid.workplace}</p>
        </div>

        <h4 id="view-h4">Intro</h4>
        <p>{jobbyid.intro}</p>
        <h4 id="view-h4">Responsibilities</h4>
        <p>{jobbyid.tasks}</p>
        <h4 id="view-h4">Requirements</h4>
        <p>{jobbyid.requirements}</p>
        <h4 id="view-h4">Benefits</h4>
        <p>{jobbyid.benefits}</p>
      </div>
    </div>
  );
}

export default Viewjob;
