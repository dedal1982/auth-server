const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const checkAdmin = require("../middlewares/checkAdmin");

// Защищённый маршрут для админпанели
router.get("/admin", authMiddleware, checkAdmin, (req, res) => {
  res.send("Добро пожаловать в админпанель!");
});

module.exports = router;
