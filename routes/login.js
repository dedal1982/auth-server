const express = require("express");
const router = require("express").Router();
const { login } = require("../controllers/users");
const { validateLogin } = require("../middlewares/requestValidation");

// Выход из системы
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Выход выполнен" });
});

router.post("/login", validateLogin, login);

module.exports = router;
