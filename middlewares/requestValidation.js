const { celebrate, Joi } = require("celebrate");

// Валидация для регистрации пользователя
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

// Валидация для входа
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

// Валидация для обновления профиля пользователя
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
});

// Валидация для создания новой истории
const validateCreateStory = celebrate({
  body: Joi.object().keys({
    id: Joi.number().integer().required(),
    title: Joi.string().min(1).required(),
    genre: Joi.string()
      .valid("Пристории", "Ужасы", "Фантастика", "Фэнтези")
      .required(),
    ageRating: Joi.string().valid("6+", "12+", "16+", "18+").required(),
    coverResId: Joi.alternatives()
      .try(Joi.number().integer(), Joi.string())
      .required(),
    rawContent: Joi.string().min(1).required(),
  }),
});

// Валидация для обновления истории
const validateUpdateStory = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(1),
    genre: Joi.string().valid("Пристории", "Ужасы", "Фантастика", "Фэнтези"),
    ageRating: Joi.string().valid("6+", "12+", "16+", "18+"),
    coverResId: Joi.alternatives()
      .try(Joi.number().integer(), Joi.string())
      .required(),
    rawContent: Joi.string().min(1),
  }),
});

// Валидация для параметра id истории
const validateStoryIdParam = celebrate({
  params: Joi.object().keys({
    storyId: Joi.string().hex().length(24), // предполагается ObjectId
  }),
});

// Валидация для id пользователя (если есть такие маршруты)
const validateUserIdParam = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

// Валидация для входа Админа
const validateAdminLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUser,
  validateCreateStory,
  validateUpdateStory,
  validateStoryIdParam,
  validateUserIdParam,
  validateAdminLogin,
};
