import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Components.css";
function Editprofile() {
  const location = useLocation();
  const user = location.state;
  const [experience, setexperience] = useState(false);
  const [education, seteducation] = useState(false);
  const [skill, setskill] = useState(false);

  const handleexperience = () => {
    setexperience(true);
  };
  const handleeducation = () => {
    seteducation(true);
  };
  const handleskill = () => {
    setskill(true);
  };

  // Create profile

  const [handleinput, sethandleinput] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    city: "",
    address: "",
    profile: {
      experience: [],
      education: [],
      skill: [],
    },
  });
  const Handleinput = (e) => {
    const { name, value } = e.target;

    sethandleinput({ ...handleinput, [name]: value });
  };

  // handling experience

  const [handlecurrexperience, sethandlecurrexperience] = useState({});
  const Handlecurrexperience = (e) => {
    const { name, value } = e.target;

    sethandlecurrexperience({ ...handlecurrexperience, [name]: value });
  };

  const addexperience = () => {
    sethandleinput((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        experience: [...prev.profile.experience, { ...handlecurrexperience }],
      },
    }));

    sethandlecurrexperience({});
    setexperience(false);
  };

  // handling education

  const [handleedu, sethandleedu] = useState({});
  const Handleedu = (e) => {
    const { name, value } = e.target;

    sethandleedu({ ...handleedu, [name]: value });
  };

  const addeducation = () => {
    sethandleinput((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        education: [...prev.profile.education, { ...handleedu }],
      },
    }));

    sethandleedu({});
    seteducation(false);
  };

  // Delte experience

  const deleteexp = async (id, index) => {
    if (!id) {
      let exp = handleinput.profile.experience;
      exp = exp.filter((item, i) => i !== index);

      sethandleinput({
        ...handleinput,
        profile: {
          ...handleinput.profile,
          experience: exp,
        },
      });

      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/deleteexp/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        await fetchuser();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete Education
  const deleteeducation = async (id, index) => {
    sethandleinput((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        education: prev.profile.education.filter((_, i) => i !== index),
      },
    }));

    try {
      const response = await fetch(
        `http://localhost:5000/deleteeducation/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        await fetchuser();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete Skill

  const deleteskill = async (id, index) => {
    sethandleinput((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        skill: prev.profile.skill.filter((_, i) => i !== index),
      },
    }));

    try {
      const response = await fetch(`http://localhost:5000/deleteskill/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        await fetchuser();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // handling skill

  const [handlecurrskill, sethandlecurrskill] = useState({});
  const Handlecurrskill = (e) => {
    const { name, value } = e.target;

    sethandlecurrskill({ ...handlecurrskill, [name]: value });
  };

  const addskill = () => {
    sethandleinput((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        skill: [...prev.profile.skill, { ...handlecurrskill }],
      },
    }));

    sethandlecurrskill({});
    setskill(false);
  };

  //   Get user

  const fetchuser = async () => {
    try {
      const response = await fetch("http://localhost:5000/getuser", {
        credentials: "include",
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      sethandleinput({
        ...data,
        profile: {
          experience: data.profile?.experience || [],
          education: data.profile?.education || [],
          skill: data.profile?.skill || [],
        },
      });

      setprofileimg(data.profileimg || null);
    } catch (error) {
      console.log("Get user error:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      sethandleinput({
        ...user,
        profile: {
          experience: user.profile?.experience || [],
          education: user.profile?.education || [],
          skill: user.profile?.skill || [],
        },
      });
    }

    fetchuser();
  }, []);

  // Save Profile
  const saveprofile = async (e) => {
    e.preventDefault();
    try {
      const profiledata = {
        ...handleinput,
        profileimg,
      };
      const response = await fetch("http://localhost:5000/saveprofile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profiledata),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
    <div id="edit-profile-page">
      <form
        className="col-6 d-flex flex-column"
        onSubmit={saveprofile}
        id="edit-profile-form"
      >
        <h1 id="edit-profile-title" className="text-center lead">
          Complete your profile
        </h1>

        {(profileimg || handleinput.profileimg) && (
          <img
            src={profileimg || handleinput.profileimg}
            width={150}
            id="edit-profile-image"
            alt="Profile"
          />
        )}
        <input type="file" onChange={handleprofileimg} id="upload" />
        <h4 id="basic-info-heading">Basic Info</h4>
        <p>Add your location Fields marked with an asterisk(*) are required.</p>
        <label id="edit-profile-form-label">Name</label>
        <input
          type="text"
          id="edit-profile-form-input"
          name="name"
          value={handleinput.name}
          onChange={Handleinput}
          required
        />
        <label id="edit-profile-form-label">Email</label>
        <input
          type="email"
          id="edit-profile-form-input"
          name="email"
          onChange={Handleinput}
          value={handleinput.email}
          required
        />
        <label id="edit-profile-form-label">Phone Number</label>
        <input
          id="edit-profile-form-input"
          name="phone"
          value={handleinput.phone}
          onChange={Handleinput}
          required
        />

        <label id="edit-profile-form-label">Country</label>
        <input
          id="edit-profile-form-input"
          name="location"
          value={handleinput.location}
          onChange={Handleinput}
          required
        />

        <label id="edit-profile-form-label">City, Province</label>
        <input
          id="edit-profile-form-input"
          name="city"
          value={handleinput.city}
          onChange={Handleinput}
          required
        />

        <label id="edit-profile-form-label">Street Address</label>
        <input
          id="edit-profile-form-input"
          name="address"
          value={handleinput.address}
          onChange={Handleinput}
          required
        />

        {/*  Experience  */}
        <div id="editprof-sec-top" className="col-12">
          <h4 id="experience-heading">Experience</h4>
          <button
            id="sn11"
            onClick={handleexperience}
            className="col-1 btn"
            type="button"
          >
            +
          </button>
        </div>

        {handleinput.profile.experience.map((item, index) => (
          <div className="card" key={item._id || index}>
            <div id="editprof-sec-top">
              <h4>{item.expjob}</h4>
              <button
                type="button"
                onClick={() => deleteexp(item._id, index)}
                id="edit-del-btn"
              >
                <RiDeleteBin6Line />
              </button>
            </div>

            <p>{item.exporganization}</p>

            <p>{item.expemploymenttype}</p>
          </div>
        ))}

        {experience && (
          <div id="exp-password-settings-outer">
            <div id="exp-password-settings">
              <button className="btn" onClick={() => setexperience(false)}>
                <IoMdClose id="viewapp-drawer-close-btn" />
              </button>
              <label id="edit-profile-form-label">Job title*</label>

              <input
                placeholder="Example: Senior Product Manager"
                id="edit-profile-form-input"
                name="expjob"
                value={handlecurrexperience.expjob}
                onChange={Handlecurrexperience}
              />

              <label id="edit-profile-form-label">Organization*</label>
              <input
                placeholder="Example: Microsoft"
                id="edit-profile-form-input"
                name="exporganization"
                value={handlecurrexperience.exporganization}
                onChange={Handlecurrexperience}
              />

              <label id="edit-profile-form-label">Location*</label>
              <input
                placeholder="City or region"
                id="edit-profile-form-input"
                name="explocation"
                value={handlecurrexperience.explocation}
                onChange={Handlecurrexperience}
              />

              <label id="edit-profile-form-label">Location type*</label>
              <select
                id="explocationtype"
                name="explocationtype"
                value={handlecurrexperience.explocationtype}
                onChange={Handlecurrexperience}
              >
                <option>Please select</option>
                <option value={"On-site"}>On-site</option>
                <option value={"Hybrid"}>Hybrid</option>
                <option value={"Remote"}>Remote</option>
              </select>

              <label id="edit-profile-form-label">Employment type*</label>
              <select
                id="expemploymenttype"
                name="expemploymenttype"
                value={handlecurrexperience.expemploymenttype}
                onChange={Handlecurrexperience}
              >
                <option>Please select</option>

                <option value={"Full-time"}>Full-time</option>
                <option value={"Part-time"}>Part-time</option>
                <option value={"Internship"}>Internship</option>
                <option value={"Contract"}>Contract</option>
              </select>

              <div className="d-flex">
                <label id="edit-profile-form-label">Start month*</label>
                <select
                  id="expstartmonth"
                  name="expstartmonth"
                  value={handlecurrexperience.startmonth}
                  onChange={Handlecurrexperience}
                >
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
                <label id="edit-profile-form-label">Start year*</label>
                <select
                  id="expstartyear"
                  name="expstartyear"
                  value={handlecurrexperience.startyear}
                  onChange={Handlecurrexperience}
                >
                  {Array.from({ length: 101 }, (_, i) => 2026 - i).map(
                    (year) => (
                      <option>{year}</option>
                    ),
                  )}
                </select>
              </div>
              <div className="d-flex">
                <label id="edit-profile-form-label">End Month*</label>
                <select
                  id="expendmonth"
                  name="expendmonth"
                  value={handlecurrexperience.endmonth}
                  onChange={Handlecurrexperience}
                >
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>

                <label id="edit-profile-form-label">End Year*</label>
                <select
                  id="expendyear"
                  name="expendyear"
                  value={handlecurrexperience.endyear}
                  onChange={Handlecurrexperience}
                >
                  {Array.from({ length: 101 }, (_, i) => 2026 - i).map(
                    (year) => (
                      <option>{year}</option>
                    ),
                  )}
                </select>
              </div>
              <div id="button-wrapper">
                <button
                  type="button"
                  onClick={() => addexperience()}
                  id="edit-prof-add-btn"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/*  Education  */}
        <div id="editprof-sec-top" className="col-12">
          <h4 id="experience-heading">Education</h4>
          <button
            id="sn11"
            onClick={handleeducation}
            className="col-1 btn"
            type="button"
          >
            +
          </button>
        </div>
        {handleinput.profile.education.map((item, index) => (
          <div className="card" key={item._id || index}>
            <div id="editprof-sec-top">
              <h4>{item.school}</h4>
              <button
                id="edit-del-btn"
                type="button"
                onClick={() => {
                  deleteeducation(item._id, index);
                }}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
            <p>{item.degree}</p>
            <p>
              {item.startmonth} {item.startyear}
            </p>
            <p>
              {item.endmonth} {item.endyear}
            </p>
          </div>
        ))}
        {education && (
          <div id="password-settings-outer">
            <div id="password-settings">
              <button className="btn" onClick={() => seteducation(false)}>
                <IoMdClose id="viewapp-drawer-close-btn" />
              </button>
              <label id="edit-profile-form-label">School*</label>
              <input
                placeholder="Example: Senior Product Manager"
                id="edit-profile-form-input"
                name="school"
                value={handleedu.school}
                onChange={Handleedu}
                required
              />

              <label id="edit-profile-form-label">Degree*</label>
              <input
                placeholder="Example: Microsoft"
                id="edit-profile-form-input"
                name="degree"
                value={handleedu.degree}
                onChange={Handleedu}
                required
              />

              <div className="d-flex">
                <label id="edit-profile-form-label">Start month*</label>
                <select
                  id="startmonth"
                  name="startmonth"
                  value={handleedu.startmonth}
                  onChange={Handleedu}
                >
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
                <label id="edit-profile-form-label">Start year*</label>
                <select
                  id="startyear"
                  name="startyear"
                  value={handleedu.startyear}
                  onChange={Handleedu}
                >
                  {Array.from({ length: 101 }, (_, i) => 2026 - i).map(
                    (year) => (
                      <option>{year}</option>
                    ),
                  )}
                </select>
                <label id="edit-profile-form-label">End Month</label>
                <select
                  id="endmonth"
                  name="endmonth"
                  value={handleedu.endmonth}
                  onChange={Handleedu}
                >
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>

                <label id="edit-profile-form-label">End Year</label>
                <select
                  id="endyear"
                  name="endyear"
                  value={handleedu.endyear}
                  onChange={Handleedu}
                >
                  {Array.from({ length: 101 }, (_, i) => 2026 - i).map(
                    (year) => (
                      <option>{year}</option>
                    ),
                  )}
                </select>
              </div>
              <div id="button-wrapper">
                <button
                  type="button"
                  onClick={addeducation}
                  id="edit-prof-add-btn"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/*  Skills  */}

        <div id="editprof-sec-top" className="col-12">
          <h4 id="experience-heading">Skills</h4>
          <button
            id="sn11"
            onClick={handleskill}
            className="col-1 btn"
            type="button"
          >
            +
          </button>
        </div>
        {handleinput.profile.skill.map((item, index) => (
          <div className="card" key={item._id || index}>
            <div id="editprof-sec-top">
              <h4>{item.skill}</h4>
              <button
                id="edit-del-btn"
                type="button"
                onClick={() => deleteskill(item._id, index)}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        ))}
        {skill && (
          <div id="password-settings-outer">
            <div id="password-settings">
              <button className="btn" onClick={() => setskill(false)}>
                <IoMdClose id="viewapp-drawer-close-btn" />
              </button>
              <label id="edit-profile-form-label">Add skill</label>
              <input
                placeholder="Skill(ex: Project Management)"
                id="edit-profile-form-input"
                name="skill"
                value={handlecurrskill.skill}
                onChange={Handlecurrskill}
              />
              <div id="button-wrapper">
                <button type="button" onClick={addskill} id="edit-prof-add-btn">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div id="button-wrapper-save">
          <button id="edit-profile-save" className="btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editprofile;
