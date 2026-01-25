const morgan = require("morgan");

const requestLogger = morgan("dev");

const errorLogger = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

module.exports = { requestLogger, errorLogger };
