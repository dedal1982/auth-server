function formatDateToMoscow(date) {
  if (!date) return "";
  const options = {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleString("ru-RU", options);
}

module.exports = { formatDateToMoscow };
