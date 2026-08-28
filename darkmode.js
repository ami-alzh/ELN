/* =========================================
   ELN — CENTRALIZED THEME SYSTEM
========================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("eln-theme");

function updateThemeIcon() {

    if (!themeToggle) return;

    const isDark =
        document.body.classList.contains("dark");

    if (themeIcon) {

        themeIcon.textContent =
            isDark ? "☀" : "☾";

    } else {

        themeToggle.textContent =
            isDark ? "☀" : "☾";

    }

}


/* ==========================
   LOAD SAVED THEME
========================== */

if (savedTheme === "dark") {

    document.body.classList.add("dark");

}

updateThemeIcon();


/* ==========================
   TOGGLE THEME
========================== */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "eln-theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();

    });

}
