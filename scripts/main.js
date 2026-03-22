// Footer dates
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Wind Chill
function calculateWindChill(temp, windSpeed) {
  return 35.74 + 0.6215 * temp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temp * Math.pow(windSpeed, 0.16);
}

// Static Hawaii values
const temperature = 72;   // °F
const windSpeed   = 8;    // mph

let windChillValue = "N/A";

if (temperature <= 50 && windSpeed > 3) {
  windChillValue = calculateWindChill(temperature, windSpeed).toFixed(0) + "°F";
}

document.getElementById("windChill").textContent = windChillValue;