const { NODE_ENV, SECRET_KEY } = process.env;

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/unauthorizedError");

module.exports = (req, res, next) => {
  const token = req.cookies.token; // получаем из cookies

  if (!token) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? SECRET_KEY : "most-secret-key",
    );
  } catch (err) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }

  req.user = payload;

  return next();
};
