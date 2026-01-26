const express = require("express");
const router = express.Router();

const signupRouter = require("./signup");
const signinRouter = require("./signin");
const storyRouter = require("./story");
const adminRouter = require("./admin");

const authMiddleware = require("../middlewares/auth");
const { notFound } = require("../controllers/notFound");

// Регистрация и вход — без авторизации
router.use(signupRouter);
router.use(signinRouter);

// Защищённые маршруты
router.use(authMiddleware);
router.use("/", storyRouter);

//Администратор
router.use("/admin", adminRouter);

// Обработка несуществующих маршрутов
router.all("/*", notFound);

module.exports = router;
