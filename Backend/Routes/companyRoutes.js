import isAuthenciated from "../Middlewares/isAuthenciated";

const { registerCompany, getCompany, getCompanyById, updateCompany } = require("../Controllers/companyController");

const express = require("express");
const router = express.Router();

router.post("/registerCompany", isAuthenciated, registerCompany);
router.post("/get", isAuthenciated, getCompany);
router.get("/get/:id", isAuthenciated, getCompanyById)
router.put("/update/:id", isAuthenciated, updateCompany)

export default router;