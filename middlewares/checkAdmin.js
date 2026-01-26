const { UnauthorizedError } = require("../errors/unauthorizedError");

module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  next(new UnauthorizedError("Доступ только для администраторов"));
};
