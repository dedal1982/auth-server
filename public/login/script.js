document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Успешный вход — перенаправляем в админку
        window.location.href = "/admin/";
      } else {
        const errorData = await response.json();
        errorMessage.textContent = errorData.message || "Ошибка входа";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      errorMessage.textContent = "Произошла ошибка сети";
      errorMessage.style.display = "block";
    }
  });
});
