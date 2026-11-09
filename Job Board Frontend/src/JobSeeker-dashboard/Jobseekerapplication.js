import React, { useState, useEffect } from "react";
import "./Jobseeker.css";
function Jobseekerapplication() {
  const [appdata, setappdata] = useState([]);
  const fetchapi = () => {
    fetch("http://localhost:5000/showapplication/", { credentials: "include" })
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        setappdata(user);
        console.log("applications:", appdata);
      });
  };

  useEffect(() => {
    fetchapi();
  }, []);

  const [getjob, setgetjob] = useState([]);
  const fetchjob = () => {
    appdata.forEach((item) => {
      fetch(`http://localhost:5000/searchjobbyid/${item.job}`, {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((user) => {
          setgetjob((previous) => [...previous, user]);
          console.log("jobs:", getjob);
        });
    });
  };
  useEffect(() => {
    if (appdata.length > 0) fetchjob();
  }, [appdata]);

  return (
    <div id="appliedjobs-container" className="container-fluid">
      <h1 id="appliedjobs-heading">Applied Jobs</h1>

      <div id="appliedjobs-table-wrapper" className="table-responsive">
        <table
          id="appliedjobs-table"
          className="table table-bordered align-middle"
        >
          <thead id="appliedjobs-thead">
            <tr>
              <th id="appliedjobs-title-header">Job Title</th>
              <th id="appliedjobs-category-header">Category</th>
              <th id="appliedjobs-status-header">Application Status</th>
              <th id="appliedjobs-status-header">Application Date</th>
            </tr>
          </thead>

          <tbody id="appliedjobs-tbody">
            {appdata.map((item, index) => (
              <tr key={item._id || index}>
                <td>
                  <p id="appliedjobs-job-title">{getjob[index]?.title}</p>
                </td>

                <td>
                  <p id="appliedjobs-category">{getjob[index]?.category}</p>
                </td>

                <td>
                  <p id="appliedjobs-status">{item.status}</p>
                </td>

                <td>
                  <p id="appliedjobs-category">
                     {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Jobseekerapplication;
