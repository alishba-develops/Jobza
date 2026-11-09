const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  company: {
    type: String,
  },
  profileimg: {
    type: String,
  },
  profile: {
    experience: [
      {
        explocation: String,
        explocationtype: String,
        exporganization: String,
        expjob: String,
        expemploymenttype: String,
        expstartmonth: String,
        expstartyear: String,
        expendmonth: String,
        expendyear: String,
      },
    ],

    education: [
      {
        school: String,
        degree: String,
        startmonth: String,
        startyear: String,
        endmonth: String,
        endyear: String,
      },
    ],

    skill: [
      {
        skill: String,
      },
    ],
  },

  savedjobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const model = mongoose.model("User", userSchema);
module.exports = model;
