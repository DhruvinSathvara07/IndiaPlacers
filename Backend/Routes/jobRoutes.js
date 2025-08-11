const express = require("express");
const router = express.Router();
const isAuthenticated = require("../Middlewares/isAuthenciated");
const { postJob, getAllJobs, getAdminJobs, getJobById } = require("../Controllers/jobController");

router.post("/post", isAuthenticated, postJob);
router.get("/get", isAuthenticated, getAllJobs);
router.post("/getadminjobs", isAuthenticated, getAdminJobs);
router.post("/get/:id", isAuthenticated, getJobById);

module.exports = router;