const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    tasks: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    benefits: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    minsalary: {
      type: Number,
      required: true,
    },
    maxsalary: {
      type: Number,
      required: true,
    },
    positions: {
      type: Number,
      required: true,
    },
    workplace: {
      type: String,
      required: true,
    },
    employmenttype: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      // required:true,
    },
    employerId: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "Easily apply",
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications",
      },
    ],
  },
  { timestamps: true },
);

const model = mongoose.model("Job", jobSchema);
module.exports = model;
