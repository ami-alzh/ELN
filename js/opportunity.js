/* ================================
   DARK MODE
================================ */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("eln-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.textContent = "☀";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    if (isDark) {
        themeIcon.textContent = "☀";
        localStorage.setItem("eln-theme", "dark");
    } else {
        themeIcon.textContent = "☾";
        localStorage.setItem("eln-theme", "light");
    }

});


/* ================================
   SEARCH + FILTER
================================ */

const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".opportunity-card");
const noResults = document.getElementById("noResults");

let currentCategory = "all";


function filterOpportunities() {

    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();

    let visibleCards = 0;

    cards.forEach(card => {

        const category = card.dataset.category;
        const title = card.dataset.title.toLowerCase();
        const text = card.textContent.toLowerCase();

        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;

        const matchesSearch =
            searchTerm === "" ||
            title.includes(searchTerm) ||
            text.includes(searchTerm);

        if (matchesCategory && matchesSearch) {

            card.style.display = "flex";

            // Small animation when cards appear
            card.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(8px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 220,
                    easing: "ease-out"
                }
            );

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleCards === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }

}


/* CATEGORY BUTTONS */

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        currentCategory = filter.dataset.category;

        filterOpportunities();

    });

});


/* SEARCH */

searchInput.addEventListener(
    "input",
    filterOpportunities
);


/* ================================
   BOOKMARKS
================================ */

const bookmarks = document.querySelectorAll(".bookmark");

bookmarks.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("saved");

        if (button.classList.contains("saved")) {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
        }

    });

});


/* ================================
   FILTER MOBILE TOGGLE
================================ */

const filterButton = document.getElementById("filterButton");
const filtersContainer = document.getElementById("filters");

filterButton.addEventListener("click", () => {

    filtersContainer.classList.toggle("show");

});
