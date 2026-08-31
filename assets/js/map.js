/**
 * MOUNTAIN GALLERY - MAP LOGIC (Cloud-Synced with Fallback)
 * Interactive Leaflet Map connected with Supabase CloudDB & local data.js
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
  iconSize: [48, 60],
  iconAnchor: [24, 60],
  popupAnchor: [0, -60]
});

async function initMap() {
  const mapBounds = [
    [-8.80, 105.00],
    [-5.00, 115.00]
  ];

  map = L.map("map", {
    maxBounds: mapBounds,
    maxBoundsViscosity: 0.8,
    minZoom: 6,
    maxZoom: 16,
    zoomControl: true
  }).setView([-7.12, 108.35], 8);

  activeLayer = mapLayers.street.addTo(map);

  await loadAndRenderMountains();
  setupFilters();

  setTimeout(() => {
    map.invalidateSize();
  }, 350);
}

async function loadAndRenderMountains() {
  if (typeof CloudDB !== "undefined") {
    cachedMountains = await CloudDB.getAllMountains();
  } else if (typeof LIST_GUNUNG !== "undefined") {
    cachedMountains = LIST_GUNUNG;
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
  const rawCover = gunung.cover || gunung.coverFallback || "assets/img/gunung-cikuray.jpg";
  const coverImg = resolveAssetPath(rawCover);
  const galleryUrl = `galeri/index.html?id=${gunung.id}`;

  return `
    <div class="lux-popup-card">
      <div class="lux-popup-thumb" onclick="togglePopupAtribusi(this)">
        <img src="${coverImg}" alt="${gunung.nama}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'">
        <div class="lux-popup-badge">
          <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M3 19L9 8L14 15L17 11L21 19H3Z"/></svg></span>
          ${gunung.mdplText}
        </div>
      </div>
      <div class="lux-popup-attribution">
        <strong>Atribusi:</strong> ${gunung.atribusi}
      </div>
      <div class="lux-popup-body">
        <div class="lux-popup-title">${gunung.nama}</div>
        <div class="lux-popup-loc">
          <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"/><circle cx="12" cy="10" r="3"/></svg></span>
          ${gunung.lokasi}
        </div>
        <a class="popup-gallery-btn" href="${galleryUrl}">
          Buka Galeri
          <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg></span>
        </a>
      </div>
    </div>
  `;
}

function togglePopupAtribusi(el) {
  const card = el.closest(".lux-popup-card");
  const attr = card.querySelector(".lux-popup-attribution");
  if (attr) attr.classList.toggle("show");
}

function renderMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  cachedMountains.forEach((gunung) => {
    if (currentFilterRegion !== "all" && !gunung.region.toLowerCase().includes(currentFilterRegion.toLowerCase())) {
      return;
    }
    if (currentFilterElevation > 0 && gunung.mdpl < currentFilterElevation) {
      return;
    }

    const popupContent = buatPopupHtml(gunung);
    const marker = L.marker([gunung.lat, gunung.lng], { icon: luxuryIcon })
      .addTo(map)
      .bindPopup(popupContent, {
        closeButton: true,
        autoClose: true,
        closeOnClick: false,
        maxWidth: 260
      });

    marker.on("click", () => {
      fokusGunung(gunung, marker);
    });

    marker.gunungData = gunung;
    markers.push(marker);
  });
}

function fokusGunung(gunung, targetMarker) {
  map.closePopup();
  map.flyTo([gunung.lat, gunung.lng], 11, {
    duration: 1.2,
    easeLinearity: 0.25
  });

  setTimeout(() => {
    if (targetMarker) {
      targetMarker.openPopup();
    } else {
      const found = markers.find(m => m.gunungData && m.gunungData.id === gunung.id);
      if (found) found.openPopup();
    }
  }, 1250);
}

function selectMountainFromMenu(mountainId) {
  const dropdown = document.getElementById("siteDropdown");
  if (dropdown) dropdown.classList.remove("active");

  const gunung = cachedMountains.find(m => m.id === mountainId || m.slug === mountainId);
  if (gunung) {
    if (currentFilterRegion !== "all" || currentFilterElevation > 0) {
      currentFilterRegion = "all";
      currentFilterElevation = 0;
      document.querySelectorAll(".filter-chip").forEach(c => {
        c.classList.toggle("active", c.dataset.filter === "all");
      });
      renderMarkers();
    }

    const mapSection = document.querySelector(".map-section");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const marker = markers.find(m => m.gunungData && (m.gunungData.id === gunung.id || m.gunungData.slug === gunung.slug));
    fokusGunung(gunung, marker);
  }
}

function setupFilters() {
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const filterType = chip.dataset.filter;
      if (filterType === "all") {
        currentFilterRegion = "all";
        currentFilterElevation = 0;
      } else if (filterType === "jabar") {
        currentFilterRegion = "Jawa Barat";
        currentFilterElevation = 0;
      } else if (filterType === "jateng") {
        currentFilterRegion = "Jawa Tengah";
        currentFilterElevation = 0;
      }

      renderMarkers();
    });
  });
}

function setupDrawerMenu() {
  const mountainDropdownList = document.getElementById("dropdownMountainList");
  const countSub = document.getElementById("dropdownMountainCountSubtitle");
  if (countSub && cachedMountains) {
    countSub.textContent = `${cachedMountains.length} Destinasi Gunung Terdaftar`;
  }

  if (mountainDropdownList) {
    mountainDropdownList.innerHTML = cachedMountains.map(g => `
      <button type="button" class="dropdown-mountain-item" onclick="selectMountainFromMenu('${g.id}')">
        <strong>
          <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M3 19L9 8L14 15L17 11L21 19H3Z"/></svg></span>
          ${g.nama}
        </strong>
        <span>${g.mdplText || (g.mdpl ? `${g.mdpl.toLocaleString()} Mdpl` : '')}</span>
      </button>
    `).join("");
  }
}

function toggleMenu(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("siteDropdown");
  if (dropdown) dropdown.classList.toggle("active");
}

function toggleMountainList(event) {
  if (event) event.stopPropagation();
  const list = document.getElementById("dropdownMountainList");
  if (list) list.classList.toggle("active");
}

function openAboutModal(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("siteDropdown");
  if (dropdown) dropdown.classList.remove("active");
  const modal = document.getElementById("aboutModal");
  if (modal) modal.classList.add("active");
}

function closeAboutModal() {
  const modal = document.getElementById("aboutModal");
  if (modal) modal.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  initMap();

  document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("siteDropdown");
    const menuBtn = document.querySelector(".menu-trigger-btn");
    if (dropdown && !dropdown.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });

  const aboutModal = document.getElementById("aboutModal");
  if (aboutModal) {
    aboutModal.addEventListener("click", (e) => {
      if (e.target === aboutModal) closeAboutModal();
    });
  }
});
