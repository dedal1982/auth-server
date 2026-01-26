const express = require("express");
const router = express.Router();
const story = require("../controllers/story");
const authMiddleware = require("../middlewares/auth");
const checkAdmin = require("../middlewares/checkAdmin"); // импортируем middleware проверки админа

// Получить все истории (открытый доступ)
router.get("/stories", story.getStories);

// Создать новую историю (только для админов)
router.post("/stories", authMiddleware, checkAdmin, story.createStory);

// Удалить историю (только для админов)
router.delete(
  "/stories/:storyId",
  authMiddleware,
  checkAdmin,
  (req, res, next) => {
    story.deleteStory(req, res, next);
  },
);

// Обновить историю (только для админов)
router.put(
  "/stories/:storyId",
  authMiddleware,
  checkAdmin,
  (req, res, next) => {
    story.putStory(req, res, next);
  },
);

// Обновить историю частично (только для админов)
router.patch(
  "/stories/:storyId",
  authMiddleware,
  checkAdmin,
  (req, res, next) => {
    story.patchStory(req, res, next);
  },
);

// Поставить лайк (авторизованный пользователь)
router.put("/stories/:storyId/like", authMiddleware, story.putLikeStory);

// Удалить лайк (авторизованный пользователь)
router.delete("/stories/:storyId/like", authMiddleware, story.deleteLikeStory);

module.exports = router;
