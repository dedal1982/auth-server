const router = express.Router();

const {
  getUsers,
  getUserById,
  updateUserById,
  getCurrentUser,
} = require("../controllers/users");

const authMiddleware = require("../middlewares/auth");
const {
  validateUpdateUser,
  validateGetUserById,
} = require("../middlewares/requestValidation");
const checkAdmin = require("../middlewares/checkAdmin");

// Получить всех пользователей — только авторизация
router.get("/users", checkAdmin, getUsers);

// Получить текущего пользователя
router.get("/users/me", authMiddleware, getCurrentUser);

// Получить пользователя по ID
router.get("/users/:id", authMiddleware, getUserById);

// Обновить профиль текущего пользователя
router.patch("/users/me", authMiddleware, validateUpdateUser, updateUserById);

module.exports = router;
