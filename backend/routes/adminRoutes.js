const express = require("express");
const router = express.Router();
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const { getAdminPanel } = require("../controllers/adminController");

router.get("/panel", authenticate, authorizeAdmin, getAdminPanel);

module.exports = router;
