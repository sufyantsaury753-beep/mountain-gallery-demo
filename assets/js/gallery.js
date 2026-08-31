/**
 * MOUNTAIN GALLERY - DYNAMIC DETAIL & PRO LIGHTBOX LOGIC (Bulletproof Cloud Version)
 * Connected with Supabase CloudDB & local data.js fallback
 */

let currentMountain = null;
let currentMediaList = [];
let currentMediaIndex = 0;
let currentCategory = "all";

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) || urlParams.get("mountain");
}

async function initGalleryPage() {
  const requestedId = getUrlParameter("id") || "gunung-cikuray";
  
  if (typeof CloudDB !== "undefined") {
    try {
      currentMountain = await CloudDB.getMountainById(requestedId);
    } catch (e) {
      console.warn("CloudDB fetch error, falling back to local data:", e);
    }
  }
  
  if (!currentMountain && typeof getGunungById !== "undefined") {
    currentMountain = getGunungById(requestedId);
  }
  if (!currentMountain && typeof DATA_GUNUNG !== "undefined") {
    currentMountain = DATA_GUNUNG["gunung-cikuray"];
  }

  if (!currentMountain) return;

  document.title = `${currentMountain.nama} - Mountain Gallery`;

  renderHeroAndSpecs();
  renderRoutes();
  renderGalleryGrid();
  setupLightboxListeners();
  setupDropdownMenu();
}

function renderHeroAndSpecs() {
  const navName = document.getElementById("navMountainName");
  if (navName) navName.textContent = `${currentMountain.nama} · ${currentMountain.region}`;
  
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) heroTitle.textContent = currentMountain.nama;
  
  const infoTitle = document.getElementById("infoTitle");
  if (infoTitle) infoTitle.textContent = currentMountain.nama;
  
  const heroLoc = document.getElementById("heroLocationTag");
  if (heroLoc) {
    heroLoc.innerHTML = `
      <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"/><circle cx="12" cy="10" r="3"/></svg></span>
      ${currentMountain.region}
    `;
  }

  const infoLoc = document.getElementById("infoLocationTag");
  if (infoLoc) {
    infoLoc.innerHTML = `
      <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"/><circle cx="12" cy="10" r="3"/></svg></span>
      ${currentMountain.lokasi}
    `;
  }

  const coverImg = document.getElementById("heroCoverImg");
  if (coverImg) {
    const rawCover = currentMountain.cover || currentMountain.coverFallback || "assets/img/gunung-cikuray.jpg";
    coverImg.src = resolveAssetPath(rawCover);
    coverImg.alt = `Foto Cover ${currentMountain.nama}`;
    coverImg.onerror = function() {
      smartImageFallback(this, rawCover, currentMountain.coverFallback);
    };
  }

  const attrText = document.getElementById("heroAttributionText");
  if (attrText) attrText.textContent = currentMountain.atribusi || "Dokumentasi Pendakian Indonesia";
  
  const mDesc = document.getElementById("mountainDescription");
  if (mDesc) mDesc.textContent = currentMountain.deskripsi;
  
  const mDescExtra = document.getElementById("mountainDescriptionExtra");
  if (mDescExtra) mDescExtra.textContent = currentMountain.deskripsiTambahan || "";

  // Specs Matrix
  const specElev = document.getElementById("specElevation");
  if (specElev) specElev.textContent = currentMountain.mdplText || `${currentMountain.mdpl} Mdpl`;
  
  const specDiff = document.getElementById("specDifficulty");
  if (specDiff) specDiff.textContent = currentMountain.tingkatKesulitan || "Menengah";
  
  const specDur = document.getElementById("specDuration");
  if (specDur) specDur.textContent = currentMountain.estimasiWaktu || "4 - 6 Jam";

  // Tags
  const tagsContainer = document.getElementById("tagsContainer");
  if (tagsContainer) {
    const tags = currentMountain.tags || [currentMountain.region || "Indonesia"];
    tagsContainer.innerHTML = tags.map(t => `
      <div class="tag-chip">
        <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>
        ${t}
      </div>
    `).join("");
  }
}

function renderRoutes() {
  const routesContainer = document.getElementById("routesContainer");
  if (!routesContainer) return;

  if (!currentMountain.jalurPendakian || currentMountain.jalurPendakian.length === 0) {
    routesContainer.innerHTML = "<p style='color:#737373; font-size:13px;'>Informasi jalur pendakian segera diperbarui.</p>";
    return;
  }

  routesContainer.innerHTML = currentMountain.jalurPendakian.map(r => `
    <div class="route-card">
      <div class="route-card-title">
        <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M3 19L9 8L14 15L17 11L21 19H3Z"/></svg></span>
        ${r.nama}
      </div>
      <div class="route-card-meta">
        <span>
          <span class="svg-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
          Estimasi: ${r.waktu}
        </span>
        <span>
          <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>
          ${r.status}
        </span>
      </div>
    </div>
  `).join("");
}

function filterMedia(category) {
  currentCategory = category;
  document.querySelectorAll(".media-filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });

  renderGalleryGrid();
}

function renderGalleryGrid() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const mediaList = currentMountain.media || [];
  
  currentMediaList = mediaList.filter(m => {
    if (currentCategory === "all") return true;
    return m.type === currentCategory;
  });

  if (currentMediaList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #8a5a96; font-weight: 700;">
        Tidak ada media untuk kategori ini.
      </div>
    `;
    return;
  }

  grid.innerHTML = currentMediaList.map((media, index) => {
    const resolvedSrc = resolveAssetPath(media.src);

    if (media.type === "video") {
      return `
        <article class="gallery-card" data-index="${index}" role="button" tabindex="0" aria-label="Buka video ${media.title || ''}">
          <video muted preload="metadata">
            <source src="${resolvedSrc}" type="video/mp4">
          </video>
          <div class="video-badge-pill">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
            Video
          </div>
          <div class="video-play-center">
            <div class="play-bubble">
              <span class="svg-icon"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
            </div>
          </div>
          <div class="gallery-card-overlay">
            <div class="gallery-card-title">${media.title || "Dokumentasi Video"}</div>
          </div>
        </article>
      `;
    }

    return `
      <article class="gallery-card" data-index="${index}" role="button" tabindex="0" aria-label="Buka foto ${media.title || ''}">
        <img src="${resolvedSrc}" alt="${media.title || 'Foto'}" onerror="smartImageFallback(this, '${media.src}')">
        <div class="gallery-card-overlay">
          <div class="gallery-card-title">${media.title || "Dokumentasi Foto"}</div>
        </div>
      </article>
    `;
  }).join("");

  // Attach touch and click events directly to cards
  grid.querySelectorAll(".gallery-card").forEach(card => {
    const idx = parseInt(card.getAttribute("data-index"), 10);
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(idx);
    });
  });
}

function smartImageFallback(img, originalPath, secondaryFallback) {
  if (!originalPath || originalPath.startsWith("data:") || originalPath.startsWith("http://") || originalPath.startsWith("https://")) {
    img.onerror = null;
    img.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";
    return;
  }
  const extensions = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG", ".webp"];
  
  if (!img.dataset.extAttempt) {
    img.dataset.extAttempt = "0";
  }
  
  let attempt = parseInt(img.dataset.extAttempt);
  if (attempt < extensions.length) {
    img.dataset.extAttempt = (attempt + 1).toString();
    const lastDot = originalPath.lastIndexOf(".");
    if (lastDot > 0) {
      const base = originalPath.substring(0, lastDot);
      const tryExt = extensions[attempt];
      img.src = resolveAssetPath(base + tryExt);
      return;
    }
  }

  if (secondaryFallback && !img.dataset.secondaryTried) {
    img.dataset.secondaryTried = "true";
    img.src = resolveAssetPath(secondaryFallback);
    return;
  }

  img.onerror = null;
  img.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";
}

function toggleCoverAttribution() {
  const box = document.getElementById("heroAttributionBox");
  if (box) box.classList.toggle("show");
}

/* =========================================================
   PRO LIGHTBOX ENGINE (NEXT/PREV/KEYBOARD/TOUCH SWIPE)
   ========================================================= */
function openLightbox(index) {
  if (!currentMediaList || currentMediaList.length === 0) return;
  currentMediaIndex = index;
  updateLightboxContent();

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.add("active");
  }
  document.body.style.overflow = "hidden";
}

function updateLightboxContent() {
  const item = currentMediaList[currentMediaIndex];
  if (!item) return;

  const total = currentMediaList.length;
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxCaptionTitle = document.getElementById("lightboxCaptionTitle");
  const lightboxCaptionDesc = document.getElementById("lightboxCaptionDesc");
  const lightboxImg = document.getElementById("lightboxImage");
  const lightboxVid = document.getElementById("lightboxVideo");
  const lightboxVidSrc = document.getElementById("lightboxVideoSource");

  if (lightboxCounter) lightboxCounter.textContent = `${currentMediaIndex + 1} / ${total}`;
  if (lightboxCaptionTitle) lightboxCaptionTitle.textContent = item.title || "Dokumentasi Pendakian";
  if (lightboxCaptionDesc) lightboxCaptionDesc.textContent = item.desc || "";

  const resolved = resolveAssetPath(item.src);

  if (item.type === "video") {
    if (lightboxImg) lightboxImg.style.display = "none";
    if (lightboxVid && lightboxVidSrc) {
      lightboxVid.style.display = "block";
      lightboxVidSrc.src = resolved;
      lightboxVid.load();
      lightboxVid.play().catch(() => {});
    }
  } else {
    if (lightboxVid) {
      lightboxVid.pause();
      lightboxVid.style.display = "none";
    }
    if (lightboxImg) {
      lightboxImg.style.display = "block";
      lightboxImg.src = resolved;
      lightboxImg.alt = item.title || "Foto Detail";
      lightboxImg.onerror = function() {
        smartImageFallback(this, item.src);
      };
    }
  }
}

function nextLightboxSlide() {
  if (!currentMediaList || currentMediaList.length === 0) return;
  currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
  updateLightboxContent();
}

function prevLightboxSlide() {
  if (!currentMediaList || currentMediaList.length === 0) return;
  currentMediaIndex = (currentMediaIndex - 1 + currentMediaList.length) % currentMediaList.length;
  updateLightboxContent();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
  }
  document.body.style.overflow = "";

  const lightboxImg = document.getElementById("lightboxImage");
  if (lightboxImg) lightboxImg.src = "";

  const lightboxVid = document.getElementById("lightboxVideo");
  const lightboxVidSrc = document.getElementById("lightboxVideoSource");
  if (lightboxVid) lightboxVid.pause();
  if (lightboxVidSrc) lightboxVidSrc.src = "";
}

function setupLightboxListeners() {
  const closeBtn = document.getElementById("lightboxClose");
  if (closeBtn) closeBtn.onclick = closeLightbox;
  
  const nextBtn = document.getElementById("lightboxNext");
  if (nextBtn) nextBtn.onclick = nextLightboxSlide;
  
  const prevBtn = document.getElementById("lightboxPrev");
  if (prevBtn) prevBtn.onclick = prevLightboxSlide;

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.onclick = (e) => {
      if (e.target === lightbox) closeLightbox();
    };
  }

  document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("lightbox");
    if (!lb || !lb.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextLightboxSlide();
    if (e.key === "ArrowLeft") prevLightboxSlide();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (Math.abs(touchEndX - touchStartX) > 45) {
        if (touchEndX - touchStartX < 0) nextLightboxSlide();
        else prevLightboxSlide();
      }
    }, false);
  }
}

async function setupDropdownMenu() {
  const mountainDropdownList = document.getElementById("dropdownMountainList");
  if (!mountainDropdownList) return;

  let mountains = [];
  if (typeof CloudDB !== "undefined") {
    try {
      mountains = await CloudDB.getAllMountains();
    } catch (e) {
      console.warn("Dropdown CloudDB fallback:", e);
    }
  }
  if ((!mountains || mountains.length === 0) && typeof LIST_GUNUNG !== "undefined") {
    mountains = LIST_GUNUNG;
  }

  mountainDropdownList.innerHTML = mountains.map(g => `
    <a class="dropdown-mountain-item" href="index.html?id=${g.id}">
      <strong>
        <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M3 19L9 8L14 15L17 11L21 19H3Z"/></svg></span>
        ${g.nama}
      </strong>
      <span>${g.mdplText || (g.mdpl ? `${g.mdpl.toLocaleString()} Mdpl` : '')}</span>
    </a>
  `).join("");
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
  initGalleryPage();

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

// Window Exports
if (typeof window !== "undefined") {
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
  window.nextLightboxSlide = nextLightboxSlide;
  window.prevLightboxSlide = prevLightboxSlide;
  window.filterMedia = filterMedia;
  window.toggleMenu = toggleMenu;
  window.toggleMountainList = toggleMountainList;
  window.openAboutModal = openAboutModal;
  window.closeAboutModal = closeAboutModal;
}
