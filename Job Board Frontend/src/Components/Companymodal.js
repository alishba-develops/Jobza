import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Components.css";
function Companymodal() {
  const navigate = useNavigate();

  const [show, setshow] = useState(false);
  const [handleinput, sethandleinput] = useState({});

  const Handleinput = (e) => {
    const { name, value } = e.target;
    sethandleinput({ ...handleinput, [name]: value });
  };

  // Create Company

  const createcompany = async (e) => {
     e.preventDefault();
    const profiledata = {
      ...handleinput,
      logo: profileimg,
    };
    try {
      const jobdatares = await fetch("http://localhost:5000/createcompany", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profiledata),
      });

      const jobdata = await jobdatares.json();
      console.log(jobdata);
      if (jobdatares.ok) {
        toast.success(jobdata.message);
        navigate("/Recruiter/Recruiterdashboard");
      } else {
        toast.error(jobdata.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get Company

  const [company, setcompany] = useState([]);
  const fetchapi = () => {
    fetch("http://localhost:5000/getemployercompany/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((company) => {
        setcompany(company);
        console.log(company);
      });
  };

  useEffect(() => {
    fetchapi();
  }, []);

  // profile Image
  const [profileimg, setprofileimg] = useState(null);

  const handleprofileimg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setprofileimg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div id="company-modal-outer">
      <form id="company-form" className="col-4" onSubmit={createcompany}>
        <h3 id="companymodal-h" className="text-center">
          Complete Your Company Profile
        </h3>
        {!show && (
          <div>
            <div id="companyprof-1">
              <div id="logo-form-group">
                <img src={profileimg} width={150} id="comp-prof-img" />
                <input
                  type="file"
                  className="form-control"
                  id="add-comp-logo"
                  name="logo"
                  value={handleprofileimg.logo}
                  onChange={handleprofileimg}
                  required
                />
              </div>
              <div id="company-first-group2">
                <label
                  for="exampleInputEmail1"
                  className="lead"
                  id="employersignup-label"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Company Name"
                  aria-describedby="emailHelp"
                  name="name"
                  value={handleinput.name}
                  onChange={Handleinput}
                  required
                />
              </div>

              <div id="company-first-group3">
                <label id="employersignup-label">About</label>
                <textarea
                  id="comp-textarea"
                  placeholder="Write about company"
                  name="about"
                  value={handleinput.about}
                  onChange={Handleinput}
                  required
                ></textarea>
              </div>
            </div>

            <div id="companyprof-1-btn-div">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setshow(true);
                }}
                id="com-next-btn"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {show && (
          <div id="companyprof-2">
            <div className="form-group" id="company-country-group">
              <label htmlFor="company-country" id="companyprof2-label">
                Country
              </label>

              <input
                type="text"
                className="form-control"
                id="name"
                name="location"
                placeholder="Enter country"
                value={handleinput.location}
                onChange={Handleinput}
                required
              />
            </div>
            <div className="form-group" id="company-address-group">
              <label htmlFor="company-address" id="employersignup-label">
                Address
              </label>

              <input
                type="text"
                className="form-control"
                id="name"
                name="address"
                placeholder="Enter company address"
                value={handleinput.address}
                onChange={Handleinput}
                required
              />
            </div>
            <div id="compprof2-groups">
              <label>Headquarters</label>
              <input
                id="name"
                placeholder="Headquarters"
                name="headquarters"
                value={handleinput.headquarters}
                onChange={Handleinput}
              />
            </div>

            <div className="form-group" id="compprof2-groups">
              <label for="exampleInputEmail1" className="lead">
                Industry
              </label>
              <input
                placeholder="Industry"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                id="name"
                name="industry"
                value={handleinput.industry}
                onChange={Handleinput}
                required
              />
            </div>
            <div id="compprof2-groups">
              <label for="exampleInputPassword1" className="lead">
                Comapny Size
              </label>
              <input
                type="text"
                placeholder="0 - 10"
                className="form-control"
                id="name"
                name="size"
                value={handleinput.size}
                onChange={Handleinput}
                required
              />
            </div>
            <div id="companyprof-1-btn-div">
              <button
                type="submit"
                id="com-save-btn"
              >
                Create Company
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Companymodal;
