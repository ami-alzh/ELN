
/* =====================================================
   SEARCH + FILTER
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const filters =
    document.querySelectorAll(".filter");

const cards =
    document.querySelectorAll(".opportunity-card");

const noResults =
    document.getElementById("noResults");


let currentCategory = "all";



/* =====================================================
   FILTER OPPORTUNITIES
===================================================== */

function filterOpportunities() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    let visibleCards = 0;


    cards.forEach(card => {

        const category =
            card.dataset.category
                .toLowerCase();


        const title =
            card.dataset.title
                .toLowerCase();


        /*
            Search ALL visible text inside the card.

            This means the search can find:
            - title
            - description
            - location
            - audience
            - deadline
            - category
        */

        const cardText =
            card.textContent
                .toLowerCase();


        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;


        const matchesSearch =
            searchTerm === "" ||
            title.includes(searchTerm) ||
            cardText.includes(searchTerm);


        if (
            matchesCategory &&
            matchesSearch
        ) {

            card.style.display = "flex";

            visibleCards++;


        } else {

            card.style.display = "none";

        }

    });


    /* NO RESULTS */

    if (visibleCards === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}



/* =====================================================
   CATEGORY BUTTONS
===================================================== */

filters.forEach(filter => {

    filter.addEventListener("click", () => {


        /*
            Remove active state
            from every button.
        */

        filters.forEach(button => {

            button.classList.remove("active");

        });


        /*
            Add active state
            to clicked button.
        */

        filter.classList.add("active");


        /*
            Get selected category.
        */

        currentCategory =
            filter.dataset.category;


        /*
            Run filtering.
        */

        filterOpportunities();

    });

});



/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    filterOpportunities
);



/* =====================================================
   BOOKMARKS / HEARTS
===================================================== */

const bookmarks =
    document.querySelectorAll(".bookmark");


bookmarks.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("saved");


        if (
            button.classList.contains("saved")
        ) {

            button.textContent = "♥";

        } else {

            button.textContent = "♡";

        }

    });

});



/* =====================================================
   MOBILE FILTER TOGGLE
===================================================== */

const filterButton =
    document.getElementById("filterButton");

const filtersContainer =
    document.getElementById("filters");


filterButton.addEventListener("click", () => {

    filtersContainer.classList.toggle("show");

});
