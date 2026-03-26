// Footer information
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Wind Chill calculation

// Static values matching your weather section (Hawaii)
const temperature = 72;   // °F
const windSpeed   = 8;    // mph

// Calculates wind chill using the NWS formula (Fahrenheit + mph)
// One-line return as requested by the assignment
function calculateWindChill(temp, windSpeed) {
    return 35.74 + (0.6215 * temp) 
           - 35.75 * Math.pow(windSpeed, 0.16) 
           + (0.4275 * temp * Math.pow(windSpeed, 0.16));
}

//Displays wind chill only when conditions are met
function displayWindChill() {
    const windChillEl = document.getElementById("windChill");
    
    // Wind chill is only valid when temp <= 50°F AND wind > 3 mph
    if (temperature <= 50 && windSpeed > 3) {
        const chillValue = calculateWindChill(temperature, windSpeed);
        windChillEl.textContent = `${Math.round(chillValue)}°F`;
    } else {
        windChillEl.textContent = "N/A";
    }
}

// Run everything when the page loads
window.addEventListener("load", () => {
    displayWindChill();
});