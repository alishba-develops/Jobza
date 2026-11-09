import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"
import "./Recruitercompany.css";
function Recruitercompany() {
  const [company, setcompany] = useState([]);
  const fetchmycompany = async (req, res) => {
    try {
      const response = await fetch("http://localhost:5000/getemployercompany", {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setcompany(data);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchmycompany();
  }, []);

  // Preview
  const navigate = useNavigate();
  const edit = true;

  // Delete Company

  
const deletecompany = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/deletecompany/${id}`,{
        method:"DELETE"
      }

    );

    const data = await response.json();

    if (response.ok) {
      fetchmycompany();
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  return (
    <div id="reccompany-profile-page">
      <div id="company-employers-heading">
        <h2>Companies</h2>
        <a href="/Companymodal">
          <button>Add a Company</button>
        </a>
      </div>
      {company.map((item) => (
        <div className="card" id="reccompany-profile-card" key={item._id}>
          <div id="rec-comapny-top-space">
            <img src={item.logo} />
            <h4>{item.name}</h4>
          </div>
          <p>{item.address}</p>
          <p>{item.location}</p>

          <p>{item.industry}</p>

          <div id="rec-company-prev-btn-div">
            <button
            id="rec-company-prev-btn-div-preview-btn"
              className="btn"
              onClick={() =>
                navigate("/Companyinfo", {
                  state: { id: item._id, edit: edit },
                })
              }
            >
              Preview
            </button>
            <button onClick={()=>deletecompany(item._id)} id="rec-company-prev-btn-div-del-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recruitercompany;
