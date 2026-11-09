const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    fullname: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Shortlist", "Interview", "Offer", "Hired", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const model = mongoose.model("Application", applicationSchema);
module.exports = model;
