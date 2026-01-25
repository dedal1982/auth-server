const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { UnauthorizedError } = require("../errors/unauthorizedError");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: "Жак-Ив Кусто",
    },
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Некорректный email",
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Поле "password" должно быть заполнено'],
    },
    role: {
      // добавляем поле role
      type: String,
      enum: ["user", "admin"],
      default: "user", // по умолчанию — обычный пользователь
    },
  },
  { versionKey: false },
);

// Хэширование пароля перед сохранением
userSchema.pre("save", function (next) {
  const user = this;

  // Если пароль не изменился, пропускаем хэширование
  if (!user.isModified("password")) return next();

  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch(next);
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError("Неверный логин или пароль"),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError("Неверный логин или пароль"),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("User", userSchema);
