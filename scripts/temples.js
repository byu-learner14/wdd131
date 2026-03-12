// Footer dates (keep what you have)
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    
    // Toggle state
    hamburger.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("active");
    
    // Change icon: ☰ - ✕ (or X)
    hamburger.textContent = isExpanded ? "☰" : "✕";
  });
}