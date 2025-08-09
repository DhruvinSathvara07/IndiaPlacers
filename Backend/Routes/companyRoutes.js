const isAuthenciated = require("../Middlewares/isAuthenciated");
const { registerCompany, getCompany, getCompanyById, updateCompany } = require("../Controllers/companyController");

const express = require("express");
const router = express.Router();

router.post("/register", isAuthenciated, registerCompany);
router.get("/get", isAuthenciated, getCompany);
router.get("/get/:id", isAuthenciated, getCompanyById)
router.put("/update/:id", isAuthenciated, updateCompany)

module.exports = router;