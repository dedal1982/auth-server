const winston = require("winston");
const expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
});

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
  meta: true,
});

module.exports = {
  requestLogger,
  errorLogger,
};
