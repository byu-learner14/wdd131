// Temple data array
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 143969,
    imageUrl: "file:///C:/Users/olivi/Downloads/st-george-temple-lds.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42100,
    imageUrl: "file:///C:/Users/olivi/Downloads/laie-temple-lds.jpg"
  },
  {
    templeName: "Colonia Juárez Chihuahua Mexico",
    location: "Colonia Juárez, Chihuahua, Mexico",
    dedicated: "1999, March, 6",
    area: 6800,
    imageUrl: "file:///C:/Users/olivi/Downloads/colonia-juarez-mexico-temple-lds.jpg"
  }
];

// Function to create a single temple card
function createTempleCard(temple) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} Temple`;
  img.width = 400;
  img.height = 250;
  img.loading = "lazy";   // Native lazy loading

  const figcaption = document.createElement("figcaption");
  figcaption.innerHTML = `
    <h2>${temple.templeName}</h2>
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
  `;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  return figure;
}

// Render temples to the gallery
function displayTemples(filteredTemples) {
  const gallery = document.getElementById("temple-gallery");
  gallery.innerHTML = "";   // Clear previous cards

  filteredTemples.forEach(temple => {
    const card = createTempleCard(temple);
    gallery.appendChild(card);
  });
}

// Filter functions
function filterTemples(filterType) {
  let filtered = temples;

  if (filterType === "old") {
    filtered = temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900);
  } else if (filterType === "new") {
    filtered = temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000);
  } else if (filterType === "large") {
    filtered = temples.filter(t => t.area > 90000);
  } else if (filterType === "small") {
    filtered = temples.filter(t => t.area < 10000);
  }
  // "home" shows all (already set above)

  displayTemples(filtered);
}

// Set up navigation click handlers
function setupFilters() {
  const links = document.querySelectorAll(".nav-menu a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const filterType = link.getAttribute("data-filter");
      filterTemples(filterType);
    });
  });
}

// Footer dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Hamburger menu (your existing code, improved a bit)
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("active");
    hamburger.textContent = isExpanded ? "☰" : "✕";
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  filterTemples("home");   // Show all temples on load
});