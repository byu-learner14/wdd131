// script.js - WDD 131 Final Project

// ==================== TRAIL DATA ====================
const trails = [
    {
        name: "Kīlauea Iki Trail",
        difficulty: "Moderate",
        length: "4.0",
        elevation: "400",
        region: "Volcanoes",
        description: "A fantastic loop through a volcanic crater with steaming vents and lush rainforest.",
        image: "images/kilauea-iki.jpg"
    },
    {
        name: "Pololū Valley Trail",
        difficulty: "Moderate",
        length: "2.5",
        elevation: "420",
        region: "Kohala",
        description: "Steep trail down to a beautiful black sand beach with dramatic valley views.",
        image: "images/pololu-valley.jpg"
    },
    {
        name: "Papakōlea Green Sand Beach",
        difficulty: "Hard",
        length: "5.0",
        elevation: "300",
        region: "Kaū",
        description: "Unique hike to the only green sand beach in the United States.",
        image: "images/green-sand-beach.jpg"
    },
    {
        name: "ʻAkaka Falls State Park",
        difficulty: "Easy",
        length: "0.8",
        elevation: "100",
        region: "Hilo",
        description: "Short, paved loop trail with stunning views of two waterfalls.",
        image: "images/akaka-falls.jpg"
    },
    {
        name: "Waipiʻo Valley Lookout Trail",
        difficulty: "Moderate",
        length: "2.0",
        elevation: "300",
        region: "Kohala",
        description: "Beautiful views into the sacred Waipiʻo Valley.",
        image: "images/waipio-valley.jpg"
    },
    {
        name: "Mauna Kea Summit Area",
        difficulty: "Hard",
        length: "6.0",
        elevation: "2000",
        region: "Kohala",
        description: "Challenging high-altitude hike with incredible views.",
        image: "images/mauna-kea.jpg"
    }
];

// ==================== TRAIL CARD FUNCTION ====================
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

// ==================== DISPLAY TRAILS ====================
function displayTrails(filteredTrails) {
    const container = document.getElementById('featured-grid') || document.getElementById('trails-grid');
    if (!container) return;

    if (filteredTrails.length === 0) {
        container.innerHTML = "<p>No trails found matching your filter.</p>";
        return;
    }

    container.innerHTML = filteredTrails.map(trail => createTrailCard(trail)).join('');
}

// ==================== FILTER FUNCTION ====================
function filterTrails(difficulty) {
    if (difficulty === "all") {
        return trails;
    }
    return trails.filter(trail => trail.difficulty === difficulty);
}

// ==================== SETUP FILTER BUTTONS ====================
function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    if (buttons.length === 0) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            const filteredTrails = filterTrails(filterValue);
            displayTrails(filteredTrails);
        });
    });
}

// ==================== PLAN YOUR HIKE FORM ====================
function setupHikePlanner() {
    const form = document.getElementById('hikeForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const trailName = document.getElementById('trail').value;
        const hours = parseInt(document.getElementById('hours').value);
        const groupSize = document.getElementById('group').value;

        if (!trailName) {
            alert("Please select a trail.");
            return;
        }

        const selectedTrail = trails.find(t => t.name === trailName);

        let estimatedTime = hours;
        if (selectedTrail.difficulty === "Hard") estimatedTime += 2;
        if (selectedTrail.difficulty === "Moderate") estimatedTime += 1;

        let packingList = [
            "Water (at least 2 liters per person)",
            "Snacks / lunch",
            "Sunscreen & hat",
            "Rain jacket",
            "Hiking boots or sturdy shoes"
        ];

        if (selectedTrail.difficulty === "Hard") {
            packingList.push("Headlamp or flashlight", "First aid kit", "Extra layers");
        }
        if (parseInt(groupSize) >= 3) {
            packingList.push("Group whistle", "Extra water");
        }

        const resultHTML = `
            <h3>Your Hike Plan</h3>
            <p><strong>Trail:</strong> ${trailName}</p>
            <p><strong>Planned Hiking Time:</strong> ${estimatedTime} hours</p>
            <p><strong>Group Size:</strong> ${groupSize === "1" ? "Solo" : groupSize + " people"}</p>
            
            <h4>Recommended Packing List:</h4>
            <ul>
                ${packingList.map(item => `<li>${item}</li>`).join('')}
            </ul>
            
            <p><em>Always check current weather and trail conditions before hiking!</em></p>
        `;

        document.getElementById('result').innerHTML = resultHTML;

        // Save to localStorage
        const planData = {
            trail: trailName,
            hours: estimatedTime,
            group: groupSize,
            date: new Date().toLocaleDateString()
        };
        localStorage.setItem('lastHikePlan', JSON.stringify(planData));
    });
}

// ==================== SAFETY CHECKLIST ====================
function setupSafetyChecklist() {
    const checkAllBtn = document.getElementById('checkAllBtn');
    if (!checkAllBtn) return;

    checkAllBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.safety-item');
        checkboxes.forEach(box => box.checked = true);
        
        const message = document.getElementById('checklistMessage');
        message.textContent = "✅ All safety items checked! You're ready to hike safely!";
        message.style.color = "green";
    });
}

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
    displayTrails(trails);
    setupFilters();
    setupHikePlanner();
    setupSafetyChecklist();
});