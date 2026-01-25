const { NotFoundError } = require("../errors/notFoundError"); // 404

const notFound = (req, res, next) => {
  next(new NotFoundError("Запрашиваемая страница не существует"));
};

module.exports = { notFound };
