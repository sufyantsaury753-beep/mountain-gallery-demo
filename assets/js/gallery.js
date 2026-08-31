/**
 * MOUNTAIN GALLERY DEMO - GALLERY LOGIC (100% Standalone)
 * Rich photo/video presentation for each of the 21 mountains.
 */

let currentMountain = null;
let currentMediaList = [];
let currentFilter = "all";
let activeLightboxIndex = 0;

function resolveAssetPath(src) {
  if (!src) return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  return `../${src}`;
}

function getMountainIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "gunung-gede";
}

function initGallery() {
  const mountainId = getMountainIdFromUrl();

  if (typeof DATA_GUNUNG !== "undefined" && DATA_GUNUNG[mountainId]) {
    currentMountain = DATA_GUNUNG[mountainId];
  } else if (typeof DATA_GUNUNG !== "undefined") {
    currentMountain = Object.values(DATA_GUNUNG)[0];
  }

  if (!currentMountain) {
    alert("Data gunung tidak ditemukan!");
    window.location.href = "../index.html";
    return;
  }

  currentMediaList = currentMountain.media || [];
  renderHero();
  renderTechnicalStats();
  renderRoutes();
  renderMediaGrid();
  setupFilterButtons();
  setupDropdownNav();
}

function renderHero() {
  const coverUrl = resolveAssetPath(currentMountain.cover);
  document.getElementById("heroBanner").style.backgroundImage = `linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.85) 100%), url('${coverUrl}')`;
  document.getElementById("mountainName").textContent = currentMountain.nama;
  document.getElementById("mountainLocation").innerHTML = `
    <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"/><circle cx="12" cy="10" r="3"/></svg></span>
    ${currentMountain.lokasi || currentMountain.region}
  `;
  document.getElementById("mountainMdplBadge").textContent = currentMountain.mdplText || (currentMountain.mdpl ? `${currentMountain.mdpl.toLocaleString()} Mdpl` : "");
  document.getElementById("mountainDesc").textContent = currentMountain.deskripsi;
}

function renderTechnicalStats() {
  const statsContainer = document.getElementById("techStatsContainer");
  if (!statsContainer) return;

  statsContainer.innerHTML = `
    <div class="tech-stat-card">
      <div class="tech-stat-icon tech-stat-purple">
        <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M3 19L9 8L14 15L17 11L21 19H3Z"/></svg></span>
      </div>
      <div>
        <span class="tech-stat-label">Ketinggian Puncak</span>
        <strong class="tech-stat-val">${currentMountain.mdplText || (currentMountain.mdpl ? `${currentMountain.mdpl.toLocaleString()} Mdpl` : "-")}</strong>
      </div>
    </div>

    <div class="tech-stat-card">
      <div class="tech-stat-icon tech-stat-rose">
        <span class="svg-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
      </div>
      <div>
        <span class="tech-stat-label">Tingkat Kesulitan</span>
        <strong class="tech-stat-val">${currentMountain.tingkatKesulitan || "Sedang"}</strong>
      </div>
    </div>

    <div class="tech-stat-card">
      <div class="tech-stat-icon tech-stat-emerald">
        <span class="svg-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
      </div>
      <div>
        <span class="tech-stat-label">Estimasi Pendakian</span>
        <strong class="tech-stat-val">${currentMountain.estimasiWaktu || "6 - 8 Jam"}</strong>
      </div>
    </div>

    <div class="tech-stat-card">
      <div class="tech-stat-icon tech-stat-amber">
        <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg></span>
      </div>
      <div>
        <span class="tech-stat-label">Suhu Puncak Rata-rata</span>
        <strong class="tech-stat-val">${currentMountain.suhuPuncak || "6°C - 14°C"}</strong>
      </div>
    </div>
  `;
}

function renderRoutes() {
  const routesContainer = document.getElementById("routesListContainer");
  if (!routesContainer) return;

  const routes = currentMountain.jalurPendakian || [];
  if (routes.length === 0) {
    routesContainer.innerHTML = `<p style="color:var(--text-muted); font-size:13px;">Informasi jalur pendakian belum ditambahkan.</p>`;
    return;
  }

  routesContainer.innerHTML = routes.map((r, i) => `
    <div class="route-card-item">
      <div class="route-badge-num">${i + 1}</div>
      <div class="route-details">
        <strong>${r.nama}</strong>
        <div class="route-meta">
          <span>⏱️ ${r.waktu}</span>
          ${r.status ? `<span>✨ ${r.status}</span>` : ""}
        </div>
      </div>
    </div>
  `).join("");
}

function renderMediaGrid() {
  const grid = document.getElementById("mediaGrid");
  if (!grid) return;

  const filtered = currentMediaList.filter(m => {
    if (currentFilter === "image") return m.type === "image" || !m.type;
    if (currentFilter === "video") return m.type === "video";
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px 20px; color:var(--text-muted);">
        <p style="font-size:15px; font-weight:700;">Belum ada media untuk kategori ini.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((m, idx) => {
    const isVideo = m.type === "video";
    const src = resolveAssetPath(m.src);
    return `
      <div class="media-card" onclick="openLightbox(${idx})">
        <div class="media-thumb-container">
          ${isVideo ? `
            <video src="${src}" preload="metadata"></video>
            <div class="video-play-badge">
              <span class="svg-icon"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
            </div>
          ` : `
            <img src="${src}" alt="${m.title || currentMountain.nama}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400'">
          `}
        </div>
        <div class="media-caption-box">
          <strong class="media-card-title">${m.title || currentMountain.nama}</strong>
          ${m.desc ? `<p class="media-card-desc">${m.desc}</p>` : ""}
        </div>
      </div>
    `;
  }).join("");
}

function setupFilterButtons() {
  document.querySelectorAll(".media-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".media-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderMediaGrid();
    });
  });
}

function setupDropdownNav() {
  const container = document.getElementById("dropdownMountainList");
  if (!container || typeof DATA_GUNUNG === "undefined") return;

  const mountains = Object.values(DATA_GUNUNG);
  container.innerHTML = mountains.map(g => `
    <a class="dropdown-mountain-item ${g.id === currentMountain.id ? 'active' : ''}" href="index.html?id=${g.id}">
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
  if (dropdown) dropdown.classList.toggle("open");
}

function toggleMountainList(e) {
  if (e) e.stopPropagation();
  const list = document.getElementById("dropdownMountainList");
  if (list) list.classList.toggle("open");
}

function openLightbox(index) {
  activeLightboxIndex = index;
  const item = currentMediaList[index];
  if (!item) return;

  const modal = document.getElementById("lightboxModal");
  const container = document.getElementById("lightboxContent");
  const title = document.getElementById("lightboxTitle");
  const desc = document.getElementById("lightboxDesc");

  const src = resolveAssetPath(item.src);
  if (item.type === "video") {
    container.innerHTML = `<video src="${src}" controls autoplay style="max-width:100%; max-height:75vh; border-radius:12px;"></video>`;
  } else {
    container.innerHTML = `<img src="${src}" alt="${item.title || ''}" style="max-width:100%; max-height:75vh; border-radius:12px; object-fit:contain;">`;
  }

  if (title) title.textContent = item.title || currentMountain.nama;
  if (desc) desc.textContent = item.desc || "";

  modal.classList.add("active");
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("active");
  const container = document.getElementById("lightboxContent");
  if (container) container.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", initGallery);
