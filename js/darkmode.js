const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("eln-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.textContent = "☀";
} else {
    themeIcon.textContent = "☾";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    if (isDark) {
        themeIcon.textContent = "☀";
        localStorage.setItem("eln-theme", "dark");
    } else {
        themeIcon.textContent = "☾";
        localStorage.setItem("eln-theme", "light");
    }

});
