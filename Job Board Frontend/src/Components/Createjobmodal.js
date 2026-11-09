import React, { useState, useEffect } from "react";
import "./Components.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
function Createjobmodal() {
  // Cities
  const [cities, setcities] = useState([]);
  const fetchcities = () => {
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "Pakistan",
      }),
    })
      .then((res) => res.json())
      .then((cities) => {
        console.log(cities.data);
        setcities(cities.data);
      })
      .catch((error) => {
        console.log("Api failed");
      });
  };

  useEffect(() => {
    fetchcities();
  }, []);

  const navigate = useNavigate();
  const openrecruiterjobpage = () => {
    navigate("/Recruiter/job");
  };
  const [handlejobinput, sethandlejobinput] = useState({});

  const Handlejobinput = (e) => {
    const { name, value } = e.target;

    sethandlejobinput((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  const createjob = async (e) => {
    e.preventDefault();
    try {
      const jobdatares = await fetch("http://localhost:5000/createjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(handlejobinput),
      });

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

  return (
    <div id="createjob-outer">
      <form
        className="col-6 form-group"
        id="createjob-form"
        onSubmit={createjob}
      >
        <div className="d-flex" id="cj-top">
          <h2 className="text-center" id="createjobform-h">
            <IoMdArrowBack
              onClick={() => openrecruiterjobpage()}
              id="craetejob-close"
            />
            Add Job Basics
          </h2>
        </div>

        <div className="form-group">
          <label for="exampleFormControlInput1">Job title *</label>
          <input
            type="text"
            className="form-control"
            placeholder="Job Title"
            id="cj-title"
            name="title"
            value={handlejobinput.title}
            onChange={Handlejobinput}
            required
          />
        </div>

        <label>Intro *</label>
        <textarea
          id="intro"
          name="intro"
          value={handlejobinput.intro}
          onChange={Handlejobinput}
          placeholder="Write a brief introduction to the job role and what makes this opportunity exciting..."
          required
        ></textarea>

        <label>Tasks *</label>
        <textarea
          id="tasks"
          name="tasks"
          value={handlejobinput.tasks}
          onChange={Handlejobinput}
          placeholder="Describe the main responsibilities of this role, one task per line..."
          required
        ></textarea>

        <label>Requirements *</label>
        <textarea
          id="requirements"
          name="requirements"
          value={handlejobinput.requirements}
          onChange={Handlejobinput}
          placeholder="List the required skills, qualifications, education, and experience..."
          required
        ></textarea>

        <label>Benifits *</label>
        <textarea
          id="benefits"
          name="benefits"
          value={handlejobinput.benefits}
          onChange={Handlejobinput}
          placeholder="Mention the benefits offered, such as salary, flexible hours, remote work..."
          required
        ></textarea>

        <div id="addinfo-form">
          <h3>Additional Information</h3>

          <div className="form-group" id="ad-row1">
            <label for="exampleFormControlSelect1">
              Workplace
              <select
                class="form-control"
                id="workplace"
                name="workplace"
                value={handlejobinput.workplace}
                onChange={Handlejobinput}
                required
              >
                <option>Workplace</option>
                <option>On-site</option>
                <option>Hybrid</option>
                <option>Remote</option>
              </select>
            </label>

            <label>
              Category
              <select
                className="form-control"
                id="category"
                name="category"
                value={handlejobinput.category}
                onChange={Handlejobinput}
                required
              >
                <option value="">Select Category</option>
                <option value="Software & Web Development">
                  Software & Web Development
                </option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Data Science & Analytics">
                  Data Science & Analytics
                </option>
                <option value="AI & Machine Learning">
                  AI & Machine Learning
                </option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="UI/UX & Graphic Design">
                  UI/UX & Graphic Design
                </option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="IT & Technical Support">
                  IT & Technical Support
                </option>
                <option value="Product & Project Management">
                  Product & Project Management
                </option>
                <option value="Business & Management">
                  Business & Management
                </option>
                <option value="Marketing & Digital Marketing">
                  Marketing & Digital Marketing
                </option>
                <option value="Sales & Business Development">
                  Sales & Business Development
                </option>
                <option value="Finance & Accounting">
                  Finance & Accounting
                </option>
                <option value="Human Resources">Human Resources</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Content Writing & Editing">
                  Content Writing & Editing
                </option>
                <option value="Education & Training">
                  Education & Training
                </option>
                <option value="Engineering">Engineering</option>
                <option value="Healthcare & Medical">
                  Healthcare & Medical
                </option>
                <option value="Legal">Legal</option>
                <option value="Architecture & Interior Design">
                  Architecture & Interior Design
                </option>
                <option value="Media & Communications">
                  Media & Communications
                </option>
                <option value="Operations & Administration">
                  Operations & Administration
                </option>
                <option value="Research">Research</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <label>Employment Type</label>
          <div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="employmenttype"
                name="employmenttype"
                value={"Internship"}
                onChange={Handlejobinput}
                required
              />
              <label class="form-check-label" for="inlineRadio1">
                Internship
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="employmenttype"
                name="employmenttype"
                value={"Full-Time"}
                onChange={Handlejobinput}
                required
              />
              <label class="form-check-label" for="inlineRadio2">
                Full-Time
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="employmenttype"
                name="employmenttype"
                value={"Part-Time"}
                onChange={Handlejobinput}
                required
              />
              <label class="form-check-label" for="inlineRadio3">
                Part-Time
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="employmenttype"
                name="employmenttype"
                value={"Contract"}
                onChange={Handlejobinput}
                required
              />
              <label class="form-check-label" for="inlineRadio3">
                Contract
              </label>
            </div>
          </div>
          <div id="ad-row2">
            <div id="location-group">
              <label for="location">Location</label>
              <select
                className="form-control"
                id="location"
                name="location"
                value={handlejobinput.location}
                onChange={Handlejobinput}
                required
              >
                {/* <option value="">Select Location</option> */}
                {cities.map((city, index) => (
                  <option key={index} value={city} id="cj-loc">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div id="experience-group">
              <label htmlFor="experience">Experience Level</label>
              <select
                className="form-control"
                id="experience"
                name="experience"
                value={handlejobinput.experience}
                onChange={Handlejobinput}
                required
              >
                <option value="">Select Experience Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advance">Advance</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="exampleFormControlSelect1">Select Company</label>
            <select
              class="form-control"
              id="company"
              name="company"
              value={handlejobinput.company}
              onChange={Handlejobinput}
              required
            >
              <option>Company</option>
              {company.map((item) => (
                <option>{item.name}</option>
              ))}
            </select>
          </div>
          <label>Salary</label>
          <div className="d-flex">
            <div className="d-flex" id="sal">
              <select
                id="sal-p"
                onChange={Handlejobinput}
                value={handlejobinput.currency}
                name="currency"
              >
                <option value={"PKR"}>PKR</option>
                <option value={"USD"}>USD</option>
                <option value={"EUR"}>EUR</option>
                <option value={"GBP"}>GBP</option>
              </select>
              <input
                placeholder="Min"
                id="salary"
                name="minsalary"
                value={handlejobinput.minsalary}
                onChange={Handlejobinput}
                required
              />
              <input
                placeholder="Max"
                id="salary-max"
                name="maxsalary"
                value={handlejobinput.maxsalary}
                onChange={Handlejobinput}
                required
              />
            </div>
          </div>
        </div>

        <label>Positions</label>
        <input
          type="number"
          placeholder="0"
          id="positions"
          name="positions"
          value={handlejobinput.positions}
          onChange={Handlejobinput}
          required
        />

        <div id="cj-button-wrapper-save">
          <button id="cj-edit-profile-save" className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Createjobmodal;
