const User = require("../Models/user");
const Job = require("../Models/jobmodel");
const savejobuser = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const jobid = req.params.jobid;

    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }

    if (user.role !== "Jobseeker") {
      res.status(403).json({
        message: "Create a jobseeker account",
      });
      return;
    }

    const contain = user.savedjobs.includes(jobid);
    if (contain) {
      res.status(200).json({
        message: "Already Saved",
      });
      return;
    }

    user.savedjobs.push(jobid);
    await user.save();
    res.status(200).json({
      message: "Saved Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

const getjobs = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate("savedjobs");
    res.status(200).json(user.savedjobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

// Getalljobs
const getalljobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = { savejobuser, getjobs, getalljobs };
