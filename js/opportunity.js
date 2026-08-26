const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

async function loadOpportunity() {

    const response = await fetch("data/opportunities.json");
    const opportunities = await response.json();

    const opportunity = opportunities.find(item => item.id === id);

    if (!opportunity) {

        document.getElementById("opportunityContainer").innerHTML = `
            <h1>Opportunity Not Found</h1>
            <p>This opportunity does not exist.</p>
        `;
        return;

    }

    const deadline = new Date(opportunity.deadline);
    const today = new Date();

    let status = "Open";
    let statusClass = "open";

    if (deadline < today) {

        status = "Closed";
        statusClass = "closed";

    } else {

        const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

        if (daysLeft <= 7) {

            status = "Closing Soon";
            statusClass = "soon";

        }

    }

    document.title = opportunity.title + " | ELN";

    document.getElementById("opportunityContainer").innerHTML = `

<div class="opportunity-card">

<div class="category">

${opportunity.category}

</div>

<h1>

${opportunity.title}

</h1>

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

<h2>Description</h2>

<p>

${opportunity.description}

</p>

<h2>Official Website</h2>

<a href="${opportunity.website}" target="_blank" class="hero-button">

Visit Official Website →

</a>

</div>

`;

}

loadOpportunity();