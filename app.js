require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const cors = require("cors");
const router = require("./routes/index");
const handleError = require("./middlewares/handleError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

// Подключение к базе данных
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Подключен к БД");
  })
  .catch((err) => {
    console.error("Ошибка подключения к БД:", err);
  });

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(requestLogger);

// Тест для падения сервера
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

// Подключение маршрутов
app.use(router);

// Лог ошибок
app.use(errorLogger);

// Обработка ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт: ${PORT}`);
});
