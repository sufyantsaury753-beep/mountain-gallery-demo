/**
 * MOUNTAIN GALLERY DEMO - MAP LOGIC (100% Standalone)
 * Interactive Leaflet Map with 21 Mountains across West, Central, and East Java.
 */

let map;
let markers = [];
let activeLayer;
let currentFilterRegion = "all";
let currentFilterElevation = 0;
let cachedMountains = [];

// Tile layers configurations
const mapLayers = {
  street: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 18
  }),
  topo: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenTopoMap contributors, SRTM",
    maxZoom: 17
  }),
  satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles © Esri",
    maxZoom: 18
  })
};

// Custom luxury SVG icon
const luxuryIcon = L.divIcon({
  html: `
    <div class="lux-marker">
      <svg viewBox="0 0 64 82" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="igMarkerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#833AB4"/>
            <stop offset="35%" stop-color="#C13584"/>
            <stop offset="60%" stop-color="#E1306C"/>
            <stop offset="82%" stop-color="#F56040"/>
            <stop offset="100%" stop-color="#FCAF45"/>
          </linearGradient>
          <linearGradient id="igMtnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#833AB4"/>
            <stop offset="50%" stop-color="#E1306C"/>
            <stop offset="100%" stop-color="#F56040"/>
          </linearGradient>
        </defs>
        <path d="M32 2C18.2 2 7 13.2 7 27c0 18.8 25 53 25 53s25-34.2 25-53C57 13.2 45.8 2 32 2Z" 
              fill="url(#igMarkerGrad)" stroke="#ffffff" stroke-width="3.5"/>
        <circle cx="32" cy="28" r="19" fill="#ffffff"/>
        <path d="M16 42L29 20L36 32L41 25L50 42H16Z" fill="url(#igMtnGrad)"/>
        <path d="M29 20L33 27L26 27Z" fill="#ffffff"/>
        <path d="M41 25L44 31L38 31Z" fill="#ffffff"/>
      </svg>
    </div>
  `,
  className: "",
  iconSize: [46, 58],
  iconAnchor: [23, 58],
  popupAnchor: [0, -58]
});

function resolveAssetPath(src) {
  if (!src) return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  return src;
}

function initMap() {
  const mapBounds = [
    [-9.50, 104.50],
    [-5.00, 115.50]
  ];

  // View encompassing West, Central, and East Java
  map = L.map("map", {
    maxBounds: mapBounds,
    maxBoundsViscosity: 0.8,
    minZoom: 6,
    maxZoom: 16,
    zoomControl: true
  }).setView([-7.45, 110.15], 7);

  activeLayer = mapLayers.street.addTo(map);

  loadAndRenderMountains();
  setupFilters();

  setTimeout(() => {
    map.invalidateSize();
  }, 350);
}

function loadAndRenderMountains() {
  if (typeof DATA_GUNUNG !== "undefined") {
    cachedMountains = Object.values(DATA_GUNUNG);
  } else {
    cachedMountains = [];
  }

  renderMarkers();
  setupDrawerMenu();
}

function setBasemap(type) {
  if (!mapLayers[type]) return;
  if (activeLayer) map.removeLayer(activeLayer);
  activeLayer = mapLayers[type].addTo(map);

  document.querySelectorAll(".layer-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.layer === type);
  });
}

function buatPopupHtml(gunung) {
  const coverImg = resolveAssetPath(gunung.cover);
  const galleryUrl = `galeri/index.html?id=${gunung.id}`;

  return `
    <div class="lux-popup-card">
      <div class="lux-popup-thumb">
        <img src="${coverImg}" alt="${gunung.nama}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400'">
        <div class="lux-popup-badge">
          <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M3 19L9 8L14 15L17 11L21 19H3Z"/></svg></span>
          ${gunung.mdplText || (gunung.mdpl ? `${gunung.mdpl.toLocaleString()} Mdpl` : "")}
        </div>
      </div>
      <div class="lux-popup-body">
        <h4 class="lux-popup-title">${gunung.nama}</h4>
        <div class="lux-popup-loc">
          <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"/><circle cx="12" cy="10" r="3"/></svg></span>
          ${gunung.lokasi || gunung.region}
        </div>
        <a href="${galleryUrl}" class="popup-gallery-btn">
          <span>Buka Galeri &amp; Detail</span>
          <span class="svg-icon"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
        </a>
      </div>
    </div>
  `;
}

function renderMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const filtered = cachedMountains.filter(g => {
    const region = (g.region || g.lokasi || "").toLowerCase();
    let matchesRegion = true;
    if (currentFilterRegion === "jabar") matchesRegion = region.includes("jawa barat") || region.includes("jabar");
    else if (currentFilterRegion === "jateng") matchesRegion = region.includes("jawa tengah") || region.includes("jateng") || region.includes("diy") || region.includes("yogyakarta");
    else if (currentFilterRegion === "jatim") matchesRegion = region.includes("jawa timur") || region.includes("jatim");

    return matchesRegion;
  });

  filtered.forEach(gunung => {
    if (!gunung.lat || !gunung.lng) return;

    const marker = L.marker([gunung.lat, gunung.lng], { icon: luxuryIcon });
    marker.bindPopup(buatPopupHtml(gunung), {
      maxWidth: 270,
      className: "custom-lux-popup"
    });

    marker.addTo(map);
    markers.push(marker);
  });
}

function setupFilters() {
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentFilterRegion = chip.dataset.filter;
      renderMarkers();
    });
  });
}

function setupDrawerMenu() {
  const container = document.getElementById("dropdownMountainList");
  const subtitle = document.getElementById("dropdownMountainCountSubtitle");
  if (subtitle) {
    subtitle.textContent = `${cachedMountains.length} Destinasi Gunung Terdaftar`;
  }
  if (!container) return;

  container.innerHTML = cachedMountains.map(g => `
    <a class="dropdown-mountain-item" href="galeri/index.html?id=${g.id}">
      <img src="${resolveAssetPath(g.cover)}" alt="${g.nama}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100'">
      <div class="dropdown-mountain-item-info">
        <strong>${g.nama}</strong>
        <small>${g.region} · ${g.mdplText || (g.mdpl ? `${g.mdpl.toLocaleString()} Mdpl` : "")}</small>
      </div>
    </a>
  `).join("");
}

function toggleMenu(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById("siteDropdown");
  if (dropdown) {
    dropdown.classList.toggle("active");
    dropdown.classList.toggle("open");
  }
}

function toggleMountainList(e) {
  if (e) e.stopPropagation();
  const list = document.getElementById("dropdownMountainList");
  if (list) {
    list.classList.toggle("active");
    list.classList.toggle("open");
  }
}

function openAboutModal(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById("aboutModal");
  if (modal) {
    modal.classList.add("active");
    modal.classList.add("open");
  }
  const dropdown = document.getElementById("siteDropdown");
  if (dropdown) {
    dropdown.classList.remove("active");
    dropdown.classList.remove("open");
  }
}

function closeAboutModal() {
  const modal = document.getElementById("aboutModal");
  if (modal) {
    modal.classList.remove("active");
    modal.classList.remove("open");
  }
}

document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("siteDropdown");
  const trigger = document.querySelector(".menu-trigger-btn");
  if (dropdown && (dropdown.classList.contains("active") || dropdown.classList.contains("open"))) {
    if (!dropdown.contains(e.target) && (!trigger || !trigger.contains(e.target))) {
      dropdown.classList.remove("active");
      dropdown.classList.remove("open");
    }
  }
});

document.addEventListener("DOMContentLoaded", initMap);
