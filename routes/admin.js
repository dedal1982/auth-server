const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/auth");
const checkAdmin = require("../middlewares/checkAdmin");

// Защищённый маршрут для админпанели
router.get("/admin", checkAuth, checkAdmin, (req, res) => {
  res.send("Добро пожаловать в админпанель!");
});

module.exports = router;
