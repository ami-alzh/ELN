const container = document.getElementById("cardsContainer");

async function loadOpportunities() {

    try {

        const response = await fetch("data/opportunities.json");

        const opportunities = await response.json();

        container.innerHTML = "";

        opportunities.forEach(opportunity => {

            const deadline = new Date(opportunity.deadline);
            const today = new Date();

            let status = "Open";
            let statusClass = "open";

            if (deadline < today) {

                status = "Closed";
                statusClass = "closed";

            }

            else {

                const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

                if (daysLeft <= 7) {

                    status = "Closing Soon";
                    statusClass = "soon";

                }

            }

            container.innerHTML += `

<a href="opportunity.html?id=${opportunity.id}" class="opportunity-card">

    <div class="category">

        ${opportunity.category}

    </div>

    <h3>

        ${opportunity.title}

    </h3>

    <p>

        ${opportunity.description}

    </p>

    <div class="opportunity-meta">

        <div class="meta-item">

            <strong>Country</strong>

            <span>${opportunity.country}</span>

        </div>

        <div class="meta-item">

            <strong>Deadline</strong>

            <span>${deadline.toLocaleDateString()}</span>

        </div>

        <div class="meta-item">

            <strong>Status</strong>

            <span class="${statusClass}">${status}</span>

        </div>

    </div>

    <div class="read-more">

        Read More

        <span>→</span>

    </div>

</a>

`;

        });

    }

    catch(error){

        container.innerHTML = `
            <p style="text-align:center;padding:60px;">
                Unable to load opportunities.
            </p>
        `;

        console.error(error);

    }

}

loadOpportunities();