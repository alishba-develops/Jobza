import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function JobseekerEmailverify() {
  const navigate = useNavigate();

  const [userotp, setuserotp] = useState("");

  const Handleotp = (e) => {
    const inputotp = e.target.value;

    setuserotp(inputotp);
  };

  const verify = async () => {
    const email = sessionStorage.getItem("verificationEmail");

    if (!email) {
      toast.error("Verification email not found");
      return;
    }

    if (!userotp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/verify", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          otp: userotp,
        }),
      });

      const data = await response.json();

      console.log("Verification response:", data);

      if (response.ok) {
        toast.success(
          "Login to access your dashboard",
        );

        sessionStorage.removeItem("verificationEmail");

        navigate("/JobseekerdsignIn");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Verification Error:", error);

      toast.error("Unable to connect with server");
    }
  };

  return (
    <div id="emp-emailverify-outer">
      <div id="emp-emailverify-inner">
        <h1 id="emp-emailverify-head" className="text-center">
          Enter OTP
        </h1>

        <p id="emp-emailverify-para">
          Enter the 6 digit code sent to your email.{" "}
        </p>

        <input
          id="emp-emailver-input"
          type="text"
          value={userotp}
          onChange={Handleotp}
          placeholder="Enter OTP"
          maxLength="6"
        />

        <button id="emp-emailver-button" type="button" onClick={verify}>
          Verify Email
        </button>
      </div>
    </div>
  );
}

export default JobseekerEmailverify;
