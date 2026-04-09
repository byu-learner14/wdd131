// script.js - WDD 131 Final Project

// Array of trail objects
const trails = [
    {
        name: "Kīlauea Iki Trail",
        difficulty: "Moderate",
        length: "4.0",
        elevation: "400",
        region: "Volcanoes",
        description: "A fantastic loop through a volcanic crater with steaming vents and lush rainforest.",
        image: "images/kīlauea-iki-trail.jpg"
    },
    {
        name: "Pololū Valley Trail",
        difficulty: "Moderate",
        length: "2.5",
        elevation: "420",
        region: "Kohala",
        description: "Steep trail down to a beautiful black sand beach with dramatic valley views.",
        image: "images/pololū-valley-trail.jpg"
    },
    {
        name: "Papakōlea Green Sand Beach",
        difficulty: "Hard",
        length: "5.0",
        elevation: "300",
        region: "Kaū",
        description: "Unique hike to the only green sand beach in the United States.",
        image: "images/papakōlea-green-sand-beach.jpg"
    },
    {
        name: "ʻAkaka Falls State Park",
        difficulty: "Easy",
        length: "0.8",
        elevation: "100",
        region: "Hilo",
        description: "Short, paved loop trail with stunning views of two waterfalls.",
        image: "images/'akaka-falls-state-park.jpg"
    },
    {
        name: "Waipiʻo Valley Lookout Trail",
        difficulty: "Moderate",
        length: "2.0",
        elevation: "300",
        region: "Kohala",
        description: "Beautiful views into the sacred Waipiʻo Valley.",
        image: "images/waipiʻo-valley-lookout-trail.jpg"
    },
    {
        name: "Mauna Kea Summit Area",
        difficulty: "Hard",
        length: "6.0",
        elevation: "2000",
        region: "Kohala",
        description: "Challenging high-altitude hike with incredible views.",
        image: "images/mauna-kea-summit-trail.jpg"
    }
];

// Function to create HTML for one trail card
function createTrailCard(trail) {
    return `
        <div class="trail-card">
            <img src="${trail.image}" alt="${trail.name}" loading="lazy">
            <div class="trail-info">
                <span class="difficulty ${trail.difficulty.toLowerCase()}">${trail.difficulty}</span>
                <h3>${trail.name}</h3>
                <p>${trail.description}</p>
                <p><strong>Length:</strong> ${trail.length} miles | <strong>Elevation:</strong> ${trail.elevation} ft</p>
            </div>
        </div>
    `;
}

// Function to display trails (used on both home and trails page)
function displayTrails(filteredTrails) {
    const container = document.getElementById('featured-grid') || document.getElementById('trails-grid');
    if (!container) return;

    if (filteredTrails.length === 0) {
        container.innerHTML = "<p>No trails found matching your filter.</p>";
        return;
    }

    container.innerHTML = filteredTrails.map(trail => createTrailCard(trail)).join('');
}

// Filter trails by difficulty
function filterTrails(difficulty) {
    if (difficulty === "all") {
        return trails;
    }
    return trails.filter(trail => trail.difficulty === difficulty);
}

// Set up filter buttons (only runs on trails.html)
function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    if (buttons.length === 0) return;   // Exit if no filter buttons (like on home page)

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            const filteredTrails = filterTrails(filterValue);
            displayTrails(filteredTrails);
        });
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Show all trails by default on trails.html, or featured on home
    const allTrails = trails;
    displayTrails(allTrails);

    // Set up filters if they exist
    setupFilters();
});