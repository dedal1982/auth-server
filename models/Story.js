const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'Поле "id" обязательно'],
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
      enum: ["Пристории", "Ужасы", "Фантастика", "Фэнтези"], // допустимые значения
    },
    ageRating: {
      type: String,
      required: [true, 'Поле "ageRating" обязательно'],
      enum: ["6+", "12+", "16+", "18+"], // допустимые значения
    },
    coverResId: {
      type: Number,
      required: [true, 'Поле "coverResId" обязательно'],
      validate: {
        validator: Number.isInteger,
        message: 'Поле "coverResId" должно быть целым числом',
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
      default: [], // дефолтный массив лайков
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Story", storySchema);
