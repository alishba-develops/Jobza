const model = require("../Models/user");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

// Signup

const sendingotp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }
    const emailexist = await model.findOne({ email });

    if (emailexist) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashpassword = await bcrypt.hash(password, 10);

    await model.create({
      name,
      email,
      password: hashpassword,
      otp,
      isverified: false,
      role: "Jobseeker",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send OTP email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Jobza Email Verification",
      text: `Your Jobza verification code is ${otp}`,
    });

    console.log("Email sent:", info.messageId);

    res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("Signup Error:", error);

    res.status(500).json({
      message: "JobseekerSignup failed",
      error: error.message,
    });
  }
};

// verify otp

const verification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }
    const user = await model.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.otp !== otp.toString()) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    user.isverified = true;
    user.otp = undefined;

    await user.save();

    console.log("Email verified:", email);

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verification Error:", error);

    res.status(500).json({
      message: "Verification failed",
      error: error.message,
    });
  }
};

// Get user

const getuser = async (req, res) => {
  try {
    const user = await model.findById(req.id);
    if (!user) {
      return res.status(401).send({
        message: "User not found",
      });
    }
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Save
const saveprofile = async (req, res) => {
  try {
    const user = await model.findByIdAndUpdate(
      req.id,
      { $set: req.body },
      { new: true },
    );

    res.status(200).json({
      message: "Profile saved",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save profile",
    });
  }
};

// Delete profile
const deleteexp = async (req, res) => {
  try {
    const userId = req.id;
    const exp = req.params.id;
    const founduser = await model.findById(userId);
    if (founduser) {
      founduser.profile.experience = await founduser.profile.experience.filter(
        (item) => item._id.toString() !== exp,
      );
      await founduser.save();

      res.status(200).json({
        message: "Data Deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to Delete Data",
    });
  }
};

// Delete education

const deleteeducation = async (req, res) => {
  try {
    const user = await model.findById(req.id);
    const id = req.params.id;

    user.profile.education = user.profile.education.filter(
      (item) => item._id.toString() !== id,
    );

    await user.save();

    res.status(200).json({ message: "Education Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Delete Education" });
  }
};

// Delete skill
const deleteskill = async (req, res) => {
  try {
    const user = await model.findById(req.id);
    const id = req.params.id;

    user.profile.skill = user.profile.skill.filter(
      (item) => item._id.toString() !== id,
    );

    await user.save();

    res.status(200).json({ message: "Skill Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Delete Skill" });
  }
};

// Change Password
const changepassword = async (req, res) => {
  try {
    const { password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "Both fields should be same",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await model.findByIdAndUpdate(
      req.id,
      { password: hashpassword },
      { new: true },
    );
    user.save();
    res.status(200).json({
      message: "Password changed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to change password",
    });
  }
};

module.exports = {
  sendingotp,
  verification,
  getuser,
  saveprofile,
  deleteexp,
  deleteeducation,
  deleteskill,
  changepassword,
};
