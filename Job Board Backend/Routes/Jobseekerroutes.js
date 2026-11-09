const {
  sendingotp,
  verification,
  getuser,
  saveprofile,
  deleteexp,
  deleteeducation,
  deleteskill,
  changepassword,
} = require("../Controllers/Jobseekersignupcontroller");
const {
  employersendingotp,
  employerverification,
} = require("../Controllers/Employersignupcontroller");
const {
  createjob,
  getjobdata,
  searchjob,
  searchjobbyid,
  getemployerjobdata,
  closejob,
  getjobnum,
  searchemployerjob,
  deletejob,
} = require("../Controllers/createjobcontroller");
const { login } = require("../Controllers/Jobseekersignincontroller");
const {
  apply,
  submitapp,
  showapplication,
  showrecruiterapplication,
  showrecruiterapplicationbyid,
  statusupdate,
  appnum,
} = require("../Controllers/Applycontroller");
const express = require("express");
const { authentication } = require("../Middlewares/Authenticated");
const router = express.Router();
const {
  savejobuser,
  getjobs,
  getalljobs,
} = require("../Controllers/Savejobcontroller");

const { logout } = require("../Controllers/Logoutcontroller");

const {
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
} = require("../Controllers/Companycontroller");

router.post("/signup", sendingotp);
router.post("/verify", verification);
router.post("/employersignup", employersendingotp);
router.post("/employerverify", employerverification);
router.post("/createjob", authentication, createjob);
router.post("/login", login);
router.get("/getjobdata", getjobdata);
router.get("/getemployerjobdata", authentication, getemployerjobdata);
router.get("/getjobnum", authentication, getjobnum);
router.get("/searchjobbyid/:id", searchjobbyid);
router.post("/searchjob", searchjob);
router.post("/searchemployerjob", authentication, searchemployerjob);
router.post("/apply/:jobid", authentication, apply);
router.post("/submitapp/:jobid", authentication, submitapp);
router.post("/save/:jobid", authentication, savejobuser);
router.post("/changepassword", authentication, changepassword);
router.get("/showapplication", authentication, showapplication);
router.get(
  "/showrecruiterapplication",
  authentication,
  showrecruiterapplication,
);
router.get(
  "/showrecruiterapplicationbyid/:id",
  authentication,
  showrecruiterapplicationbyid,
);
router.get("/getsavedjobs", authentication, getjobs);
router.get("/getalljobs", getalljobs);
router.get("/getallcompany", getallcompany);
router.post("/logout", logout);
router.post("/createcompany", authentication, createcompany);
router.post("/submitreview/:id", submitreview);
router.put("/status/:id", statusupdate);
router.get("/getemployercompany", authentication, getemployercompany);
router.get("/companyexist", authentication, companyexist);
router.get("/getuser", authentication, getuser);
router.get("/getcompanybyid/:id", getcompanybyid);
router.put("/saveprofile", authentication, saveprofile);
router.put("/closejob/:id", closejob);
router.put("/editcompany/:id", editcompany);
router.get("/appnum", authentication, appnum);
router.get("/getcompanyjob/:employerid/:companyname", getcompanyjob);
router.delete("/deletejob/:id", deletejob);
router.delete("/deleteexp/:id", authentication, deleteexp);
router.delete("/deleteeducation/:id", authentication, deleteeducation);
router.delete("/deleteskill/:id", authentication, deleteskill);
router.get("/getcompanybyname/:name", getcompanybyname);
router.get("/fetchreview/:id", fetchreview);
router.delete("/deletecompany/:id", deletecompany);
module.exports = router;
