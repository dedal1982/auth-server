const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const { userData } = require("../utils/userData");
const { BadRequestError } = require("../errors/badRequestError"); // 400
const { NotFoundError } = require("../errors/notFoundError"); // 404
const { ConflictError } = require("../errors/conflictError"); // 409

const { NODE_ENV, SECRET_KEY } = process.env;

const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => {
      res.status(200).send({ data: users.map((user) => userData(user)) });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  userModel
    .findById(req.params.id)
    .orFail()
    .then((user) => {
      res.status(200).send({ data: userData(user) });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError("Переданы некорректные данные пользователя"));
        return;
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError("Пользователь не найден"));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  userModel
    .create({ name, about, avatar, email, password })
    .then((user) => {
      res.status(201).send({ data: userData(user) });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError("Переданы некорректные данные пользователя"));
        return;
      }
      if (err.code === 11000) {
        next(
          new ConflictError("Пользователь с таким email уже зарегистрирован"),
        );
        return;
      }
      next(err);
    });
};

const updateUserById = (req, res, next) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => {
      res.status(200).send({ data: userData(user) });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError("Переданы некорректные данные пользователя"));
        return;
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError("Пользователь не найден"));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const payload = { _id: user._id, isAdmin: user.role === "admin" };
      const token = jwt.sign(
        payload,
        NODE_ENV === "production" ? SECRET_KEY : "most-secret-key",
        {
          expiresIn: "7d",
        },
      );
      res.status(200).send({ token });
    })
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  userModel
    .findById(req.user._id)
    .orFail()
    .then((user) => {
      res.status(200).send({
        data: userData(user),
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError("Пользователь не найден"));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  login,
  getCurrentUser,
};
