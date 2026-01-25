require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const initAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    // Проверяем, есть ли уже админ
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      console.log("Админ уже существует");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10); // Смените пароль!
    const newAdmin = new User({
      email: "admin@example.com",
      password: hashedPassword,
      name: "Администратор",
      role: "admin",
    });

    await newAdmin.save();
    console.log("Админ создан:", newAdmin.email);
  } catch (err) {
    console.error("Ошибка при создании админа:", err);
  } finally {
    mongoose.disconnect();
  }
};

initAdmin();
