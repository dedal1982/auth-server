const { verifyToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Неавторизован" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Неверный токен" });
  }

  req.user = decoded;
  next();
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Доступ только для админа" });
  }
  next();
};

module.exports = { authenticate, authorizeAdmin };
