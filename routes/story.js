const express = require("express");
const router = express.Router();
const story = require("../controllers/story");
const authMiddleware = require("../middlewares/auth"); // путь к вашему middleware

// Получить все истории (открытый доступ)
router.get("/stories", story.getStories);

// Создать новую историю (только для авторизованных)
router.post("/stories", authMiddleware, story.createStory);

// Удалить историю (только для админов)
router.delete("/stories/:storyId", authMiddleware, (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new ForbiddenError("Доступ запрещен"));
  }
  story.deleteStory(req, res, next);
});

// Обновить историю (только для админов)
router.put("/stories/:storyId", authMiddleware, (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new ForbiddenError("Доступ запрещен"));
  }
  story.putStory(req, res, next);
});

// Поставить лайк (авторизованный пользователь)
router.put("/stories/:storyId/like", authMiddleware, story.putLikeStory);

// Удалить лайк (авторизованный пользователь)
router.delete("/stories/:storyId/like", authMiddleware, story.deleteLikeStory);

module.exports = router;
