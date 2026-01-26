const mongoose = require("mongoose");

// Коллекция для хранения счетчика
const counterSchema = new mongoose.Schema({
  model: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

// Функция для получения следующего номера
async function getNextSequence(modelName) {
  const counter = await Counter.findOneAndUpdate(
    { model: modelName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return counter.seq;
}

const storySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      validate: {
        validator: Number.isInteger,
        message: 'Поле "id" должно быть целым числом',
      },
    },
    title: {
      type: String,
      required: [true, 'Поле "title" обязательно'],
      minlength: [1, 'Минимальная длина "title" - 1'],
    },
    genre: {
      type: String,
      required: [true, 'Поле "genre" обязательно'],
      enum: ["Пристории", "Ужасы", "Фантастика", "Фэнтези"],
    },
    ageRating: {
      type: String,
      required: [true, 'Поле "ageRating" обязательно'],
      enum: ["6+", "12+", "16+", "18+"],
    },
    coverResId: {
      type: mongoose.Schema.Types.Mixed, // допускает любые типы
      required: [true, 'Поле "coverResId" обязательно'],
      validate: {
        validator: function (v) {
          return typeof v === "string" || typeof v === "number";
        },
        message: 'Поле "coverResId" должно быть строкой или числом',
      },
    },
    rawContent: {
      type: String,
      required: [true, 'Поле "rawContent" обязательно'],
      minlength: [1, 'Минимальная длина "rawContent" - 1'],
    },
    viewsCount: {
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: 'Поле "viewsCount" должно быть целым числом',
      },
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
  },
  { timestamps: true },
);

// Перед сохранением документа назначаем уникальный id
storySchema.pre("save", async function (next) {
  if (this.isNew && (this.id === undefined || this.id === null)) {
    this.id = await getNextSequence("Story");
  }
  next();
});

module.exports = mongoose.model("Story", storySchema);
