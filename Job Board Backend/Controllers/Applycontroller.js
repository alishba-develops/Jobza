const User = require("../Models/user");
const application = require("../Models/applicationmodel");
const job = require("../Models/jobmodel");
const apply = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    console.log("user", user);
    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }

    if (user.role !== "Jobseeker") {
      res.status(403).json({
        message: "Create a jobseeker account,if want to apply",
      });
      return;
    }

    res.status(200).json({
      message: "Lets apply",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

// Submit application
const submitapp = async (req, res) => {
  try {
    const { fullname, email, city, phone, resume } = req.body;

    const job = req.params.jobid;
    const applicant = req.id;
    await application.create({
      job,
      applicant,
      fullname,
      email,
      city,
      phone,
      status: "Pending",
      resume,
    });

    res.status(200).json({
      message: "Applied successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Application Failed",
    });
  }
};

// Get application

const showapplication = async (req, res) => {
  await application
    .find({ applicant: req.id })
    .then((application) => {
      res.status(200).send(application);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Get recruiter application
const showrecruiterapplication = async (req, res) => {
  try {
    const employerjob = await job.find({ employerId: req.id });
    const jobid = employerjob.map((job) => job._id);
    const getapplication = await application
      .find({ job: { $in: jobid } })
      .populate("job")
      .populate("applicant", "name city profileimg profile");

    res.status(200).send(getapplication);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get recruiter application by id
const showrecruiterapplicationbyid = async (req, res) => {
  try {
    const id = await req.params.id;
    const app = await application.findById(id);

    res.status(200).send(app);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
};

// Status update

const statusupdate = async (req, res) => {
  try {
    const updatedapplication = await application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json({
      message: "Staus Updated",
      application: updatedapplication,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get APP  NUm

const appnum = async (req, res) => {
  try {
    const employer = req.id;
    const jobs = await job.find({ employerId: employer });
    const jobid = jobs.map((job) => job._id);
    const num = await application.countDocuments({ job: { $in: jobid } });
    const hirednum = await application.countDocuments({
      job: { $in: jobid },
      status: "Hired",
    });
    return res.status(200).send({ num: num, hirednum: hirednum });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  apply,
  submitapp,
  showapplication,
  showrecruiterapplication,
  showrecruiterapplicationbyid,
  statusupdate,
  appnum,
};
