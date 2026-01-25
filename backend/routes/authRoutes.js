const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../middlewares/validate");

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

module.exports = router;
