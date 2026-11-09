const model = require("../Models/jobmodel");
const User = require("../Models/user");
const createjob = async (req, res) => {
  try {
    const employer = req.id;
    const {
      title,
      intro,
      tasks,
      requirements,
      benefits,
      currency,
      minsalary,
      maxsalary,
      positions,
      workplace,
      employmenttype,
      category,
      location,
      experience,
      company,
    } = req.body;

    const job = await model.create({
      title,
      intro,
      tasks,
      requirements,
      benefits,
      employerId: employer,
      minsalary,
      maxsalary,
      currency,
      positions,
      workplace,
      employmenttype,
      category,
      location,
      experience,
      company,
    });

    res.status(200).json({
      message: "Job created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

// Get Jobseeker Job Data

const getjobdata = async (req, res) => {
  const user = await model
    .find()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Get Employer Job Data

const getemployerjobdata = async (req, res) => {
  const employer = req.id;
  const job = await model
    .find({ employerId: employer })

    .then((job) => {
      res.status(200).send(job);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Get  Job num

const getjobnum = async (req, res) => {
  try {
    const employer = req.id;

    const jobnum = await model.countDocuments({
      employerId: employer,
      status: "Open",
    });

    res.status(200).send(jobnum);
    console.log("Open jobs:", jobnum);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Search jobs

const searchjob = async (req, res) => {
  const {
    title,
    location,
    category,
    employmenttype,
    experience,
    workplace,
    company,
  } = req.body;
  const filter = {};
  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }
  if (location) {
    filter.location = location;
  }
  if (category) {
    filter.category = category;
  }
  if (employmenttype) {
    filter.employmenttype = employmenttype;
  }

  if (experience) {
    filter.experience = experience;
  }

  if (workplace) {
    filter.workplace = workplace;
  }

  const jobs = await model
    .find(filter)

    .then((jobs) => {
      res.status(200).send(jobs);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Search Employer jobs

const searchemployerjob = async (req, res) => {
  const {
    title,
    location,
    category,
    employmenttype,
    experience,
    workplace,
    status,
  } = req.body;
  const filter = {};

  filter.employerId = req.id;
  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }
  if (status) {
    filter.status = status;
  }
  if (location) {
    filter.location = location;
  }
  if (category) {
    filter.category = category;
  }
  if (employmenttype) {
    filter.employmenttype = employmenttype;
  }

  if (experience) {
    filter.experience = experience;
  }

  if (workplace) {
    filter.workplace = workplace;
  }
  const jobs = await model
    .find(filter)

    .then((jobs) => {
      res.status(200).send(jobs);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// search jobs by id
const searchjobbyid = async (req, res) => {
  const id = req.params.id;
  const selectedjob = await model
    .findById(id)
    .then((job) => {
      res.status(200).send(job);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Close job

const closejob = async (req, res) => {
  try {
    const job = await model.findByIdAndUpdate(
      req.params.id,
      { status: "Closed" },
      { new: true },
    );
    res.status(200).json({
      message: "Job Closed",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to close the job",
    });
  }
};

// Delete job

const deletejob = async (req, res) => {
  try {
    const job = await model.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Job Closed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the job",
    });
  }
};

// Get job num

module.exports = {
  createjob,
  getjobdata,
  searchjob,
  searchjobbyid,
  getemployerjobdata,
  closejob,
  getjobnum,
  searchemployerjob,
  deletejob,
};
