const winston = require("winston");
const expressWinston = require("express-winston");

const maxLogSize = 10 * 1024 * 1024;

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: "request.log",
      maxsize: maxLogSize, // Максимальный размер файла в байтах
      maxFiles: 1, // Количество файлов для ротации
      tailable: false, // Перезаписывать старый файл, а не переименовывать
    }),
  ],
  format: winston.format.json(),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
      maxsize: maxLogSize,
      maxFiles: 1,
      tailable: false,
    }),
  ],
  format: winston.format.json(),
  meta: true,
});

module.exports = {
  requestLogger,
  errorLogger,
};
