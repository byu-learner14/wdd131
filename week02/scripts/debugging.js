// Get the two <span> elements from the HTML so we can change their text
const radiusOutput = document.getElementById('radius');
const areaOutput   = document.getElementById('area');     // ← this is the important fix for the selector

// Define PI correctly (use = for assignment, not ==)
const PI = 3.14159;

// Start with radius = 10 (we'll change it later, so use let instead of const)
let radius = 10;

// Calculate area for radius 10
let area = PI * radius * radius;

// Put the numbers INSIDE the <span> tags on the page
radiusOutput.textContent = radius;
areaOutput.textContent   = area;      // ← this is the important fix for displaying values

// Now change to radius = 20 and update everything again
radius = 20;
area = PI * radius * radius;

radiusOutput.textContent = radius;
areaOutput.textContent   = area;