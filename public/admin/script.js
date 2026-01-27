document.addEventListener("DOMContentLoaded", () => {
  const totalStoriesEl = document.getElementById("totalStories");
  const totalLikesEl = document.getElementById("totalLikes");
  const storiesContainer = document.getElementById("storiesContainer");
  const logoutBtn = document.getElementById("logoutBtn");

  // Проверка авторизации и загрузка данных
  let currentPage = 1;
  async function loadDashboard(page = 1) {
    try {
      const response = await fetch(`/admin/dashboard?page=${page}`, {
        credentials: "include",
      });
      if (response.status === 401) {
        window.location.href = "/login.html"; // перенаправляем на страницу входа
        return;
      }

      const data = await response.json();

      // Обновляем статистику
      totalStoriesEl.textContent = data.totalStories;
      totalLikesEl.textContent = data.totalLikes;

      // Рендерим истории
      renderStories(data.stories);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      storiesContainer.innerHTML = `
      <p style="color: red;">
        Не удалось загрузить данные. Проверьте подключение к серверу.
      </p>
    `;
    }
  }

  // Рендеринг списка историй
  function renderStories(stories) {
    storiesContainer.innerHTML = "";

    if (stories.length === 0) {
      storiesContainer.innerHTML = "<p>Нет доступных историй</p>";
      return;
    }

    stories.forEach((story) => {
      const storyEl = document.createElement("div");
      storyEl.className = "story-item";

      storyEl.innerHTML = `
        <div class="story-title">${story.title || "Без названия"}</div>
        <div class="story-meta">
          ID: ${story._id} | 
          Лайки: ${story.likes.length} |
          Создано: ${new Date(story.createdAt).toLocaleDateString("ru-RU")}
        </div>
      `;

      storiesContainer.appendChild(storyEl);
    });
  }

  // Выход из админки
  logoutBtn.addEventListener("click", async () => {
    try {
      await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login.html";
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  });

  // Загружаем данные при открытии страницы
  loadDashboard();
});
