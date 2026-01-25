exports.getAdminPanel = (req, res) => {
  res.send(`
    <h1>Админ-панель</h1>
    <p>Добро пожаловать, админ!</p>
    <a href="/logout">Выход</a>
  `);
};
