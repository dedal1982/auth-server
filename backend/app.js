require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const handleError = require("./middlewares/handleError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const { PORT = 3000, DB_URL } = process.env;

// Подключение к БД
mongoose
  .connect(DB_URL)
  .then(() => console.log("Подключен к БД"))
  .catch((err) => console.error("Ошибка подключения к БД:", err));

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true,
  }),
);
app.use(requestLogger);

// Маршрутизация
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// Обработка ошибок Celebrate
app.use(errors());

// Логирование ошибок
app.use(errorLogger);

// Общий обработчик ошибок
app.use(handleError);

// Порт
app.listen(PORT, () => {
  console.log(`Приложение запущено, порт: ${PORT}`);
});
