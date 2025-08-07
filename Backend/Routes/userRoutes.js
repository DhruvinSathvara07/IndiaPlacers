const express = require("express");
const { register, login, updateProfile, logout } = require("../Controllers/userController");
const isAuthenciated = require("../Middlewares/isAuthenciated");
const router = express.Router();

// UserRoutes
router.post("/register", register)
router.post("/login", login)
router.put("/profile/update", isAuthenciated, updateProfile)
router.get("/logout", logout)

module.exports = router;