import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
function Setting() {
  //   Get user
  const [handleinput, sethandleinput] = useState(false);
  const fetchuser = () => {
    fetch("http://localhost:5000/getuser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        sethandleinput(user);
      });
  };

  useEffect(() => {
    fetchuser();
  }, []);
 const edit = true;
  const navigate = useNavigate();
  const profile = () => {
    navigate("/Myprofile", {
      state:{ handleinput:handleinput, edit : edit}
    });
  };

  // Show

  const [show, setshow] = useState(false);

  // Password cahnge
  const [newpassword, setnewpassword] = useState("");
  const Handleinput = (e) => {
    const { name, value } = e.target;
    setnewpassword({ ...newpassword, [name]: value });
  };

  const changepassword = async () => {
    try {
      const res = await fetch("http://localhost:5000/changepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newpassword),
      });

      const response = await res.json();

      if (res.ok) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div id="settings-page" className="container-fluid">
      <div id="account-settings">
        <div id="account-header">
          <h4 id="account-title">Account Settings</h4>

          <div id="account-preview">
            <button id="preview-btn" onClick={() => profile()}>
              <IoEyeOutline />
            </button>
          </div>
        </div>

        <p id="prof-label">Your profile</p>

        <div id="profile-info">
          <img
            id="settings-profile-img"
            src={handleinput.profileimg}
            width={200}
          />

          <div id="prof-name">
            <h4 id="settings-profile-name">{handleinput.name}</h4>
            <p id="settings-profile-city">{handleinput.city}</p>
          </div>
        </div>
      </div>

      <div id="security-settings">
        <h4 id="security-title">Security Settings</h4>
        <p id="security-description">Manage your account security</p>
        <button
          id="security-btn"
          onClick={() => {
            setshow(true);
          }}
        >
          Change Security Settings
        </button>
      </div>

      {show && (
        <div id="password-settings-outer">
          <div id="password-settings">
            <button
              id="close-password-btn"
              onClick={() => {
                setshow(false);
              }}
            >
              <IoMdClose />
            </button>

            <label id="new-password-label">Change Password</label>

            <input
              id="new-password-input"
              placeholder="Enter new Password"
              name="password"
              onChange={Handleinput}
              required
            />

            <label id="confirm-password-label">Confirm Password</label>

            <input
              id="confirm-password-input"
              placeholder="Confirm Password"
              name="confirmpassword"
              onChange={Handleinput}
              required
            />
            <div id="change-pass-btndiv">
              <button
                type="submit"
                onClick={changepassword}
                id="change-pass-btn"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Setting;
