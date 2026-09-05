/**
 * MOUNTAIN GALLERY DEMO - MAP LOGIC (100% Standalone)
 * Interactive Leaflet Map with 21 Mountains across West, Central, and East Java.
 * Features smooth flyTo zooming on click and region panning.
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
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }
  return src;
}

const INDONESIA_BOUNDS = [
  [-13.5, 94.0], // Barat Daya (South-West)
  [8.0, 142.5]   // Timur Laut (North-East)
];

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function initMap() {
  // Map mencakup seluruh kepulauan Indonesia
  map = L.map("map", {
    maxBounds: INDONESIA_BOUNDS,
    maxBoundsViscosity: 0.6,
    minZoom: 4,
    maxZoom: 18,
    zoomControl: true
  });

  activeLayer = mapLayers.street.addTo(map);

  loadAndRenderMountains();

  setTimeout(() => {
    map.invalidateSize();
  }, 350);
}

function fitMapToMarkers(mountainList, animated = true) {
  const valid = (mountainList || cachedMountains).filter(
    m => m && typeof m.lat === "number" && typeof m.lng === "number" && !isNaN(m.lat) && !isNaN(m.lng)
  );
  if (valid.length === 0) {
    if (animated) {
      map.flyTo([-2.5, 118.0], 5, { animate: true, duration: 1.0 });
    } else {
      map.setView([-2.5, 118.0], 5);
    }
    return;
  }

  if (valid.length === 1) {
    const single = valid[0];
    if (animated) {
      map.flyTo([single.lat, single.lng], 9.5, { animate: true, duration: 1.0 });
    } else {
      map.setView([single.lat, single.lng], 9.5);
    }
    return;
  }

  const bounds = L.latLngBounds(valid.map(m => [m.lat, m.lng]));
  map.fitBounds(bounds, {
    padding: [45, 45],
    maxZoom: 11,
    animate: animated,
    duration: 1.0
  });
}

function loadAndRenderMountains() {
  if (typeof DATA_GUNUNG !== "undefined") {
    cachedMountains = Object.values(DATA_GUNUNG);
  } else {
    cachedMountains = [];
  }

  renderRegionFilters();
  renderMarkers();
  setupDrawerMenu();

  // Tampilkan seluruh persebaran gunung pada tampilan awal
  fitMapToMarkers(cachedMountains, false);
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

function fokusGunung(gunung, targetMarker) {
  if (!gunung || !gunung.lat || !gunung.lng) return;

  map.flyTo([gunung.lat, gunung.lng], 11, {
    animate: true,
    duration: 1.0,
    easeLinearity: 0.25
  });

  setTimeout(() => {
    if (targetMarker) {
      targetMarker.openPopup();
    } else {
      const found = markers.find(m => m.gunungData && m.gunungData.id === gunung.id);
      if (found) found.openPopup();
    }
  }, 1050);
}

function selectMountainFromMenu(mountainId) {
  const dropdown = document.getElementById("siteDropdown");
  if (dropdown) {
    dropdown.classList.remove("active");
    dropdown.classList.remove("open");
  }

  const gunung = cachedMountains.find(m => m.id === mountainId || m.slug === mountainId);
  if (gunung) {
    if (currentFilterRegion !== "all" && (gunung.region || "").trim().toLowerCase() !== currentFilterRegion.trim().toLowerCase()) {
      currentFilterRegion = "all";
      document.querySelectorAll(".filter-chip").forEach(c => {
        c.classList.toggle("active", c.dataset.filter === "all");
      });
      renderMarkers();
    }

    const marker = markers.find(m => m.gunungData && m.gunungData.id === gunung.id);
    fokusGunung(gunung, marker);
  }
}

function renderMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const filtered = cachedMountains.filter(g => {
    if (currentFilterRegion === "all") return true;
    const mountainRegion = (g.region || "").trim().toLowerCase();
    const targetRegion = currentFilterRegion.trim().toLowerCase();
    return mountainRegion === targetRegion;
  });

  filtered.forEach(gunung => {
    if (!gunung.lat || !gunung.lng) return;

    const marker = L.marker([gunung.lat, gunung.lng], { icon: luxuryIcon });
    marker.gunungData = gunung;
    marker.bindPopup(buatPopupHtml(gunung), {
      maxWidth: 270,
      className: "custom-lux-popup",
      autoPan: false
    });

    // Zoom & Pan to marker on click
    marker.on("click", () => {
      fokusGunung(gunung, marker);
    });

    marker.addTo(map);
    markers.push(marker);
  });

  return filtered;
}

function renderRegionFilters() {
  const container = document.getElementById("filterChipsContainer") || document.querySelector(".filter-chips");
  if (!container) return;

  // Ekstrak semua region yang unik dari data gunung aktif
  const regionSet = new Set();
  cachedMountains.forEach(m => {
    const r = (m.region || "").trim();
    if (r) {
      regionSet.add(r);
    }
  });

  const regions = Array.from(regionSet).sort((a, b) => a.localeCompare(b, "id"));

  // Jika region yang sedang aktif ternyata sudah terhapus, reset ke "all"
  if (currentFilterRegion !== "all" && !regions.some(r => r.toLowerCase() === currentFilterRegion.toLowerCase())) {
    currentFilterRegion = "all";
  }

  let html = `
    <button type="button" class="filter-chip ${currentFilterRegion === 'all' ? 'active' : ''}" data-filter="all">
      <span class="svg-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></span>
      Semua
    </button>
  `;

  regions.forEach(region => {
    const isActive = currentFilterRegion.toLowerCase() === region.toLowerCase();
    html += `
      <button type="button" class="filter-chip ${isActive ? 'active' : ''}" data-filter="${escapeHtml(region)}">
        <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"/><circle cx="12" cy="10" r="3"/></svg></span>
        ${escapeHtml(region)}
      </button>
    `;
  });

  container.innerHTML = html;

  // Pasang event listener pada setiap chip filter
  container.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      container.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentFilterRegion = chip.dataset.filter;

      const filtered = renderMarkers();

      if (currentFilterRegion === "all") {
        fitMapToMarkers(cachedMountains, true);
      } else {
        fitMapToMarkers(filtered, true);
      }
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
    <button type="button" class="dropdown-mountain-item" onclick="selectMountainFromMenu('${g.id}')">
      <strong>
        <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M3 19L9 8L14 15L17 11L21 19H3Z"/></svg></span>
        ${g.nama}
      </strong>
      <span>${g.mdplText || (g.mdpl ? `${g.mdpl.toLocaleString()} Mdpl` : '')}</span>
    </button>
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

// Sinkronisasi otomatis jika data diubah/dihapus melalui Admin CMS di tab lain
window.addEventListener("storage", (e) => {
  if (e.key === "mountain_gallery_demo_db_v1") {
    if (typeof getStoredDemoData === "function") {
      cachedMountains = Object.values(getStoredDemoData());
      renderRegionFilters();
      renderMarkers();
      setupDrawerMenu();
    }
  }
});
