const express = require("express");
const {
  handleLogin,
  handleRegistration,
} = require("../controllers/authController");
const router = express.Router();

//login route
router.post("/login", handleLogin);

router.post("/register", handleRegistration);

module.exports = router;
