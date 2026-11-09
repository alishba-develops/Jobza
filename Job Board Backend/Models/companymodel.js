const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    headquarters: {
      type: String,
    },
    logo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    reviews:[
       { role: {
          type: String,
          required: true,
        },

        reviewerorganization: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },

        review: {
          type: String,
          required: true,
        },
      }
    ]
  },
  { timestamps: true },
);

const model = mongoose.model("Company", companySchema);
module.exports = model;
