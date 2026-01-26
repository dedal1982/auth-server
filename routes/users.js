const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  getCurrentUser,
} = require("../controllers/users");

const auth = require("../middlewares/auth");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../middlewares/requestValidation");
const checkAdmin = require("../middlewares/checkAdmin");

// Регистрация — открытая
router.post("/signup", validateCreateUser, createUser);

// Вход — тоже открытый
router.post("/signin", validateLogin, login);

// Получить всех пользователей — только авторизация
router.get("/users", checkAdmin, getUsers);

// Получить текущего пользователя
router.get("/users/me", auth, getCurrentUser);

// Получить пользователя по ID
router.get("/users/:id", auth, getUserById);

// Обновить профиль текущего пользователя
router.patch("/users/me", auth, validateUpdateUser, updateUserById);

module.exports = router;
