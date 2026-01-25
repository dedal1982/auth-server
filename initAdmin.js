const mongoose = require("mongoose");
const User = require("./models/User"); // путь к вашей модели пользователя

// Конфигурация подключения к базе данных
const mongoUrl = "mongodb://localhost:27017/mestodb"; // замените на ваш URL базы данных

// Данные администратора
const adminData = {
  name: "Админ",
  email: "admin@example.com", // укажите свой email для администратора
  password: "yourStrongPassword123", // укажите пароль
  role: "admin",
};

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Подключение к базе данных успешно");

    // Проверяем, есть ли уже пользователь с таким email
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Администратор уже существует");
    } else {
      // Создаем нового администратора
      const newAdmin = new User(adminData);
      await newAdmin.save();
      console.log("Администратор успешно создан");
    }

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Ошибка подключения к базе данных:", err);
  });
