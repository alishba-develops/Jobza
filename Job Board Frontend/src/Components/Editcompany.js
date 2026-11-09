import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
function Editcompany() {
  const location = useLocation();
  const companyid = location.state.companyid;
  const [handleinput, sethandleinput] = useState({});
  const Handleinput = (e) => {
    const { name, value } = e.target;
    sethandleinput({ ...handleinput, [name]: value });
  };
  // Get company by id

  const [company, setcompany] = useState({});
  const fetchapi = async () => {
    await fetch(`http://localhost:5000/getcompanybyid/${companyid}`)
      .then((res) => res.json())
      .then((company) => {
        sethandleinput(company);
        console.log(company);
      });
  };

  useEffect(() => {
    fetchapi();
  }, []);

  // Logo
  const [logo, setlogo] = useState(null);

  const handleprofileimg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setlogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //  Edit
  const editcompany = async (e) => {
    e.preventDefault();
    try {
      const profiledata = {
        ...handleinput,
        logo,
      };
      const jobdatares = await fetch(
        `http://localhost:5000/editcompany/${companyid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profiledata),
        },
      );

      const jobdata = await jobdatares.json();
      console.log(jobdata);
      if (jobdatares.ok) {
        toast.success(jobdata.message);
      } else {
        toast.error(jobdata.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div id="ec-outer">
      <form id="ec-form" onSubmit={editcompany}>
        <h1 id="ec-title">Complete Your Company Profile</h1>

        <div id="ec-content">
          <div id="ec-company-1">
            <h3 id="ec-section-title">Company Information</h3>

            <div id="ec-logo-group">
              <img
                id="ec-logo-preview"
                width={100}
                alt="Company logo preview"
                src={logo || handleinput.logo}
              />

              <input
                type="file"
                className="form-control"
                onChange={handleprofileimg}
                id="ec-logo-add"
                name="logo"
              />
            </div>

            <div id="ec-name-group">
              <label for="name">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="ec-form-input"
                name="name"
                value={handleinput.name}
                onChange={Handleinput}
                placeholder="Enter company name"
                required
              />
            </div>

            <div id="ec-about-group">
              <label htmlFor="about">About Company</label>
              <textarea
                id="ec-form-textarea"
                name="about"
                value={handleinput.about}
                onChange={Handleinput}
                placeholder="Tell us about your company..."
                required
              />
            </div>
            <h3 id="ec-section-title">Location Information</h3>

            <div id="ec-country-group">
              <label htmlFor="location">Country</label>
              <input
                type="text"
                className="form-control"
                id="ec-form-input"
                name="location"
                value={handleinput.location}
                onChange={Handleinput}
                placeholder="Enter country"
                required
              />
            </div>

            <div id="ec-address-group">
              <label for="address" id="ec-section-title">
                Company Address
              </label>
              <input
                type="text"
                className="form-control"
                id="ec-form-input"
                name="address"
                value={handleinput.address}
                onChange={Handleinput}
                placeholder="Enter company address"
                required
              />
            </div>
          </div>
          <div id="ec-company-2">
            <h3 id="ec-section-title">Company Details</h3>

            <div id="ec-headquarters-group">
              <label htmlFor="headquarters">Headquarters</label>
              <input
                type="text"
                className="form-control"
                id="ec-form-input"
                name="headquarters"
                value={handleinput.headquarters}
                onChange={Handleinput}
                placeholder="Enter headquarters location"
              />
            </div>

            <div id="ec-industry-group">
              <label htmlFor="industry">Industry</label>
              <input
                type="text"
                className="form-control"
                id="ec-form-input"
                name="industry"
                value={handleinput.industry}
                onChange={Handleinput}
                placeholder="e.g. Information Technology"
                required
              />
            </div>

            <div id="ec-size-group">
              <label htmlFor="size">Company Size</label>
              <input
                type="text"
                className="form-control"
                id="ec-form-input"
                name="size"
                value={handleinput.size}
                onChange={Handleinput}
                placeholder="e.g. 11-50 employees"
                required
              />
            </div>
          </div>
        </div>

        <div id="ec-button-div">
          <button id="ec-save-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editcompany;
