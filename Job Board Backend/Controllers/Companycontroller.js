const model = require("../Models/companymodel");
const Job = require("../Models/jobmodel");

// createcompany
const createcompany = async (req, res) => {
  try {
    const employerId = req.id;
    const {
      name,
      address,
      location,
      size,
      industry,
      about,
      logo,
      headquarters,
    } = req.body;

    await model.create({
      name,
      address,
      location,
      size,
      industry,
      about,
      employerId,
      logo,
      headquarters,
    });

    res.status(200).json({
      message: "Company created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

// editcompany
const editcompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const oldCompany = await model.findById(companyId);
    const {
      name,
      address,
      location,
      size,
      industry,
      about,
      logo,
      headquarters,
    } = req.body;

    const company = await model.findByIdAndUpdate(
      companyId,
      {
        name,
        address,
        location,
        size,
        industry,
        about,

        logo,
        headquarters,
      },
      { new: true },
    );
    if (oldCompany.name !== name) {
      await Job.updateMany(
        { company: oldCompany.name },
        { $set: { company: name } },
      );
    }

    res.status(200).json({
      message: "Company edited Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

// get company
const getemployercompany = async (req, res) => {
  try {
    const employer = req.id;
    const company = await model.find({ employerId: employer });
    if (!company) {
      return res.status(404).send({ message: "Company not found" });
    }
    res.status(200).send(company);
  } catch (error) {
    res.status(500).send(error);
  }
};
// company exist
const companyexist = async (req, res) => {
  try {
    const employer = req.id;
    const company = await model.findOne({ employerId: employer });
    if (!company) {
      return res.status(404).send({ message: "Company not found" });
    }
    res.status(200).send(company);
  } catch (error) {
    res.status(500).send(error);
  }
};
// Get all companies
const getallcompany = async (req, res) => {
  await model
    .find()
    .then((company) => {
      res.status(200).send(company);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Get company by id

const getcompanybyid = async (req, res) => {
  const id = req.params.id;
  await model
    .findById(id)
    .then((company) => {
      res.status(200).send(company);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Get comapny job

const getcompanyjob = async (req, res) => {
  const employer = await req.params.employerid;
  const company = await req.params.companyname;

  const jobs = await Job.find({ employerId: employer, company: company })
    .then((jobs) => {
      res.status(200).send(jobs);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Get company by name

const getcompanybyname = async (req, res) => {
  const { name } = req.body;

  const jobs = await model
    .find({ name: name })
    .then((jobs) => {
      res.status(200).send(jobs);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Submit review

const submitreview = async (req, res) => {
  try {
    const { role, reviewerorganization, review, title } = req.body;
    const companyId = req.params.id;
    const company = await model.findById(companyId);
    company.reviews.push({
      role,
      reviewerorganization,
      title,
      review,
    });

    await company.save();

    res.status(201).json({
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get review

const fetchreview = async (req, res) => {
  try {
    const company = await model.findById(req.params.id);
    res.status(200).json(company.reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete company


const deletecompany = async (req, res) => {
  try {
    await model.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createcompany,
  getemployercompany,
  getallcompany,
  getcompanybyid,
  companyexist,
  getcompanyjob,
  editcompany,
  getcompanybyname,
  submitreview,
  fetchreview,
  deletecompany
};
