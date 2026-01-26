const mongoose = require("mongoose");
const storyModel = require("../models/Story");
const { BadRequestError } = require("../errors/badRequestError");
const { ForbiddenError } = require("../errors/forbiddenError");
const { NotFoundError } = require("../errors/notFoundError");

// Получить все истории (открытый доступ)
const getStories = (req, res, next) => {
  storyModel
    .find({})
    .sort({ createdAt: -1 })
    .then((stories) => {
      res.status(200).send(stories);
    })
    .catch(next);
};

// Создать новую историю (только для администратора)
const createStory = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new ForbiddenError("Доступ запрещен"));
  }
  storyModel
    .create({ ...req.body })
    .then((story) => {
      res.status(201).send(story);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

// Удалить историю (только для администратора)
const deleteStory = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new ForbiddenError("Доступ запрещен"));
  }
  storyModel
    .findByIdAndDelete(req.params.storyId)
    .then((story) => {
      if (!story) {
        throw new NotFoundError("История не найдена");
      }
      res.status(200).send({ message: "История удалена" });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError("Некорректный id"));
      } else {
        next(err);
      }
    });
};

// Обновить историю (только для администратора)
const putStory = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new ForbiddenError("Доступ запрещен"));
  }
  storyModel
    .findByIdAndUpdate(req.params.storyId, req.body, {
      new: true,
      runValidators: true,
    })
    .then((story) => {
      if (!story) {
        throw new NotFoundError("История не найдена");
      }
      res.status(200).send(story);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError("Некорректный id"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

// Поставить лайк (для авторизованных пользователей)
const putLikeStory = (req, res, next) => {
  storyModel
    .findByIdAndUpdate(
      req.params.storyId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((story) => {
      if (!story) {
        throw new NotFoundError("История не найдена");
      }
      res.status(200).send(story);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError("Некорректный id"));
      } else {
        next(err);
      }
    });
};

// Удалить лайк
const deleteLikeStory = (req, res, next) => {
  storyModel
    .findById(req.params.storyId)
    .then((story) => {
      if (!story) {
        throw new NotFoundError("История не найдена");
      }
      // Проверка, поставил ли пользователь лайк
      if (!story.likes.includes(req.user._id)) {
        throw new ForbiddenError("Вы не поставили лайк этой истории");
      }
      // Удаляем лайк только если пользователь его поставил
      return storyModel.findByIdAndUpdate(
        req.params.storyId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
    })
    .then((story) => {
      res.status(200).send(story);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError("Некорректный id"));
      } else if (err instanceof ForbiddenError) {
        next(err);
      } else {
        next(err);
      }
    });
};

// Обновить историю частично (только для админов)
const patchStory = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new ForbiddenError("Доступ запрещен"));
  }
  storyModel
    .findByIdAndUpdate(req.params.storyId, req.body, {
      new: true,
      runValidators: true,
    })
    .then((story) => {
      if (!story) {
        throw new NotFoundError("История не найдена");
      }
      res.status(200).send(story);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError("Некорректный id"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getStories,
  createStory,
  deleteStory,
  putStory,
  putLikeStory,
  deleteLikeStory,
  patchStory,
};
