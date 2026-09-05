/**
 * MOUNTAIN GALLERY DEMO - ADMIN CMS LOGIC (100% Standalone Interactive)
 * Allows adding mountains, uploading photos/videos via FileReader into LocalStorage,
 * editing technical routes, and managing media without external database.
 */

let currentSelectedMountainId = null;
let currentEditingMountainId = null;
let selectedCoverBase64 = null;
let selectedMediaFilesData = [];

const DEMO_AUTH_KEY = "mountain_gallery_demo_auth_v1";

function isLoggedIn() {
  return localStorage.getItem(DEMO_AUTH_KEY) === "true";
}

function loginDemo(username, password) {
  if (username && password) {
    localStorage.setItem(DEMO_AUTH_KEY, "true");
    localStorage.setItem("mountain_gallery_demo_user", username);
    return true;
  }
  return false;
}

function logoutDemo() {
  localStorage.removeItem(DEMO_AUTH_KEY);
  localStorage.removeItem("mountain_gallery_demo_user");
}

function resolveAssetPath(src) {
  if (!src) return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }
  return `../${src}`;
}

function showToast(msg, type = "info") {
  const toast = document.getElementById("toastBox");
  if (!toast) return;
  toast.textContent = msg;
  toast.className = "toast-box show";
  if (type === "error") toast.style.background = "#dc2626";
  else if (type === "success") toast.style.background = "#16a34a";
  else toast.style.background = "#1e102d";

  setTimeout(() => {
    toast.className = "toast-box";
  }, 3000);
}

// 1. AUTHENTICATION & INITIALIZATION
function checkAuthAndRender() {
  const loginScreen = document.getElementById("loginScreen");
  const adminContainer = document.getElementById("adminContainer");

  if (isLoggedIn()) {
    if (loginScreen) loginScreen.style.display = "none";
    if (adminContainer) adminContainer.classList.add("active");
    
    renderDashboardOverview();
    renderMountainTable();
    populateMediaMountainSelect();
  } else {
    if (loginScreen) loginScreen.style.display = "flex";
    if (adminContainer) adminContainer.classList.remove("active");
  }
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const user = document.getElementById("loginUser").value.trim() || "admin";
  const pass = document.getElementById("loginPass").value.trim() || "admin";

  if (loginDemo(user, pass)) {
    showToast(`Selamat datang di Demo Admin, ${user}!`, "success");
    checkAuthAndRender();
  } else {
    showToast("Masukkan username dan password!", "error");
  }
}

function handleLogout() {
  logoutDemo();
  showToast("Anda telah logout dari demo.", "info");
  checkAuthAndRender();
}

function switchTab(tabId, el) {
  document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
  if (el) el.classList.add("active");

  document.querySelectorAll(".tab-content-pane").forEach(p => p.style.display = "none");
  const target = document.getElementById(`tabPane-${tabId}`);
  if (target) target.style.display = "block";

  if (tabId === "overview") renderDashboardOverview();
  if (tabId === "mountains") renderMountainTable();
  if (tabId === "media") renderMediaManager();
}

// 2. DASHBOARD OVERVIEW & MOUNTAINS TABLE
function renderDashboardOverview() {
  const mountains = Object.values(DATA_GUNUNG);
  const totalMtnEl = document.getElementById("kpiTotalMountains");
  if (totalMtnEl) totalMtnEl.textContent = mountains.length;

  let totalMedia = 0;
  let totalRoutes = 0;
  mountains.forEach(m => {
    totalMedia += (m.media || []).length;
    totalRoutes += (m.jalurPendakian || []).length;
  });

  const totalMedEl = document.getElementById("kpiTotalMedia");
  if (totalMedEl) totalMedEl.textContent = totalMedia;
  const totalRtEl = document.getElementById("kpiTotalRoutes");
  if (totalRtEl) totalRtEl.textContent = totalRoutes;

  const recentContainer = document.getElementById("recentMountainsList");
  if (recentContainer) {
    recentContainer.innerHTML = mountains.map(m => `
      <div class="recent-mountain-row">
        <div class="recent-mountain-info">
          <img src="${resolveAssetPath(m.cover)}" class="recent-mountain-thumb" alt="${m.nama}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100'">
          <div>
            <strong class="recent-mountain-name">${m.nama}</strong>
            <div class="recent-mountain-meta">${m.region} · ${m.mdplText || (m.mdpl ? `${m.mdpl.toLocaleString()} Mdpl` : "")}</div>
          </div>
        </div>
        <div class="recent-mountain-actions">
          <button class="btn-admin btn-admin-outline" onclick="openEditMountainModal('${m.id}')">Edit</button>
          <button class="btn-admin btn-admin-outline" onclick="selectMountainForMedia('${m.id}')">Kelola Dokumen</button>
        </div>
      </div>
    `).join("");
  }
}

function renderMountainTable(searchQuery = "") {
  const tbody = document.getElementById("mountainTableBody");
  if (!tbody) return;

  let list = Object.values(DATA_GUNUNG);
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(m => (m.nama || "").toLowerCase().includes(q) || (m.region || "").toLowerCase().includes(q) || (m.lokasi || "").toLowerCase().includes(q));
  }

  tbody.innerHTML = list.map(m => `
    <tr>
      <td>
        <div class="mountain-cell">
          <img src="${resolveAssetPath(m.cover)}" class="mountain-thumb-mini" alt="${m.nama}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100'">
          <div class="mountain-cell-info">
            <strong>${m.nama}</strong>
            <small>${m.lokasi || m.region}</small>
          </div>
        </div>
      </td>
      <td><strong>${m.mdplText || (m.mdpl ? `${m.mdpl.toLocaleString()} Mdpl` : "-")}</strong></td>
      <td><span class="badge-admin">${m.region}</span></td>
      <td>${m.tingkatKesulitan || "Sedang"}</td>
      <td>${(m.media || []).length} Foto/Video</td>
      <td>
        <div class="action-btns-group">
          <button class="btn-icon" title="Kelola Media" onclick="selectMountainForMedia('${m.id}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span>
          </button>
          <button class="btn-icon" title="Edit Data" onclick="openEditMountainModal('${m.id}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>
          </button>
          <button class="btn-icon btn-icon-danger" title="Hapus Gunung" onclick="confirmDeleteMountain('${m.id}', '${m.nama}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></span>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

// 3. MOUNTAIN MODAL & CRUD
function openAddMountainModal() {
  currentEditingMountainId = null;
  selectedCoverBase64 = null;
  document.getElementById("modalMountainTitle").textContent = "Tambah Destinasi Gunung Baru";
  document.getElementById("formMountain").reset();
  
  const idInput = document.getElementById("mountainIdInput");
  if (idInput) idInput.value = "";
  
  const previewBox = document.getElementById("mCoverPreviewBox");
  if (previewBox) previewBox.style.display = "none";
  const coverFileInput = document.getElementById("mCoverFileInput");
  if (coverFileInput) coverFileInput.value = "";

  const container = document.getElementById("routesRepeaterContainer");
  if (container) {
    container.innerHTML = "";
    addRouteRow();
  }

  const modal = document.getElementById("modalMountain");
  if (modal) modal.classList.add("active");
}

function openEditMountainModal(id) {
  const m = DATA_GUNUNG[id];
  if (!m) return;

  currentEditingMountainId = id;
  selectedCoverBase64 = null;
  document.getElementById("modalMountainTitle").textContent = `Edit Data ${m.nama}`;
  
  const idInput = document.getElementById("mountainIdInput");
  if (idInput) idInput.value = m.id;

  document.getElementById("mNama").value = m.nama || "";
  document.getElementById("mMdpl").value = m.mdpl || "";
  document.getElementById("mLokasi").value = m.lokasi || "";
  document.getElementById("mRegion").value = m.region || "Jawa Barat";
  document.getElementById("mLat").value = m.lat || "";
  document.getElementById("mLng").value = m.lng || "";
  document.getElementById("mKesulitan").value = m.tingkatKesulitan || "Sedang";
  document.getElementById("mEstimasi").value = m.estimasiWaktu || "";
  document.getElementById("mSuhu").value = m.suhuPuncak || "";
  document.getElementById("mCover").value = m.cover || "";
  document.getElementById("mAtribusi").value = m.atribusi || "";
  document.getElementById("mDeskripsi").value = m.deskripsi || "";
  document.getElementById("mDeskripsiTambahan").value = m.deskripsiTambahan || "";
  document.getElementById("mTags").value = (m.tags || []).join(", ");

  const previewBox = document.getElementById("mCoverPreviewBox");
  const previewImg = document.getElementById("mCoverPreviewImg");
  if (m.cover && previewBox && previewImg) {
    previewImg.src = resolveAssetPath(m.cover);
    previewBox.style.display = "block";
  } else if (previewBox) {
    previewBox.style.display = "none";
  }

  const container = document.getElementById("routesRepeaterContainer");
  if (container) {
    container.innerHTML = "";
    if (m.jalurPendakian && m.jalurPendakian.length > 0) {
      m.jalurPendakian.forEach(r => addRouteRow(r.nama, r.waktu, r.status));
    } else {
      addRouteRow();
    }
  }

  const modal = document.getElementById("modalMountain");
  if (modal) modal.classList.add("active");
}

function closeMountainModal() {
  const modal = document.getElementById("modalMountain");
  if (modal) modal.classList.remove("active");
}

function addRouteRow(nama = "", waktu = "", status = "") {
  const container = document.getElementById("routesRepeaterContainer");
  if (!container) return;
  const div = document.createElement("div");
  div.className = "route-item-row";
  div.innerHTML = `
    <input type="text" class="form-control" placeholder="Nama Jalur (cth: Jalur Pemancar)" value="${nama}" style="flex:2;">
    <input type="text" class="form-control" placeholder="Estimasi (cth: 6-7 Jam)" value="${waktu}" style="flex:1.5;">
    <input type="text" class="form-control" placeholder="Keterangan" value="${status}" style="flex:1.5;">
    <button type="button" class="btn-icon btn-icon-danger" onclick="this.parentElement.remove()" title="Hapus Baris">
      <span class="svg-icon"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
    </button>
  `;
  container.appendChild(div);
}

function handleCoverFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    selectedCoverBase64 = event.target.result;
    const previewBox = document.getElementById("mCoverPreviewBox");
    const previewImg = document.getElementById("mCoverPreviewImg");
    if (previewBox && previewImg) {
      previewImg.src = selectedCoverBase64;
      previewBox.style.display = "block";
    }
  };
  reader.readAsDataURL(file);
}

function handleSaveMountain(e) {
  e.preventDefault();

  const nama = document.getElementById("mNama").value.trim();
  const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const id = currentEditingMountainId || `gunung-${slug}`;
  const mdplNum = parseInt(document.getElementById("mMdpl").value) || 0;

  const routeRows = document.querySelectorAll("#routesRepeaterContainer .route-item-row");
  const routes = [];
  routeRows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    const rNama = inputs[0] ? inputs[0].value.trim() : "";
    const rWaktu = inputs[1] ? inputs[1].value.trim() : "";
    const rStatus = inputs[2] ? inputs[2].value.trim() : "";
    if (rNama) {
      routes.push({ nama: rNama, waktu: rWaktu, status: rStatus });
    }
  });

  const existing = DATA_GUNUNG[id] || {};
  const coverVal = selectedCoverBase64 || document.getElementById("mCover").value.trim() || existing.cover || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200";

  DATA_GUNUNG[id] = {
    ...existing,
    id: id,
    slug: slug,
    nama: nama,
    region: document.getElementById("mRegion").value,
    mdpl: mdplNum,
    mdplText: `${mdplNum.toLocaleString()} Mdpl`,
    lokasi: document.getElementById("mLokasi").value.trim(),
    lat: parseFloat(String(document.getElementById("mLat").value).replace(",", ".")) || 0,
    lng: parseFloat(String(document.getElementById("mLng").value).replace(",", ".")) || 0,
    tingkatKesulitan: document.getElementById("mKesulitan").value,
    estimasiWaktu: document.getElementById("mEstimasi").value.trim() || "6 - 8 Jam",
    suhuPuncak: document.getElementById("mSuhu").value.trim() || "6°C - 14°C",
    cover: coverVal,
    atribusi: document.getElementById("mAtribusi").value.trim(),
    deskripsi: document.getElementById("mDeskripsi").value.trim(),
    deskripsiTambahan: document.getElementById("mDeskripsiTambahan").value.trim(),
    tags: document.getElementById("mTags").value.split(",").map(t => t.trim()).filter(Boolean),
    media: existing.media || [],
    jalurPendakian: routes
  };

  saveStoredDemoData(DATA_GUNUNG);
  closeMountainModal();
  showToast(`✅ ${nama} berhasil disimpan ke Demo!`, "success");
  renderDashboardOverview();
  renderMountainTable();
  populateMediaMountainSelect();
}

function confirmDeleteMountain(id, nama) {
  if (confirm(`Yakin ingin menghapus ${nama}?`)) {
    if (id === "gunung-rinjani") {
      localStorage.setItem("rinjani_explicitly_deleted", "true");
    }
    delete DATA_GUNUNG[id];
    saveStoredDemoData(DATA_GUNUNG);
    showToast(`🗑️ ${nama} telah dihapus.`, "info");
    renderDashboardOverview();
    renderMountainTable();
    populateMediaMountainSelect();
  }
}

// 4. MEDIA MANAGER & UPLOAD
function selectMountainForMedia(id) {
  currentSelectedMountainId = id;
  const select = document.getElementById("mediaMountainSelect");
  if (select) select.value = id;
  const mediaTabBtn = document.querySelector('[data-tab="media"]');
  switchTab("media", mediaTabBtn);
}

function populateMediaMountainSelect() {
  const select = document.getElementById("mediaMountainSelect");
  const mountains = Object.values(DATA_GUNUNG);

  if (select && mountains.length > 0) {
    if (!currentSelectedMountainId || !DATA_GUNUNG[currentSelectedMountainId]) {
      currentSelectedMountainId = mountains[0].id;
    }
    select.innerHTML = mountains.map(m => `<option value="${m.id}" ${m.id === currentSelectedMountainId ? 'selected' : ''}>${m.nama} (${m.region})</option>`).join("");
  }
}

function renderMediaManager() {
  populateMediaMountainSelect();
  const container = document.getElementById("mediaGridContainer");
  if (!container || !currentSelectedMountainId) return;

  const mountain = DATA_GUNUNG[currentSelectedMountainId];
  if (!mountain) return;

  const titleEl = document.getElementById("currentMountainMediaTitle");
  if (titleEl) titleEl.textContent = `Galeri Media: ${mountain.nama}`;

  const mediaList = mountain.media || [];
  if (mediaList.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--admin-muted);">Belum ada foto/video untuk gunung ini. Silakan upload via tombol di atas!</div>`;
    return;
  }

  container.innerHTML = mediaList.map((m, idx) => {
    const isVideo = m.type === "video";
    const src = resolveAssetPath(m.src);
    const isCover = (mountain.cover === m.src);

    return `
      <div class="media-card-item">
        <div class="media-thumb-box">
          ${isVideo ? `<video src="${src}" muted></video>` : `<img src="${src}" alt="${m.title || ''}">`}
          ${isCover ? `<span class="media-badge-cover">Cover Utama</span>` : ""}
        </div>
        <div class="media-card-body">
          <div class="media-card-title">${m.title || `Media #${idx + 1}`}</div>
          <div class="media-card-desc">${m.desc || '-'}</div>
          <div class="media-card-actions">
            ${isCover ? `<span style="font-size:10.5px; color:var(--admin-emerald); font-weight:800;">✓ Foto Cover</span>` : `
              <button class="btn-admin btn-admin-outline" style="padding:4px 8px; font-size:10.5px;" onclick="setMediaAsCover('${m.src}')">
                Set Cover
              </button>
            `}
            <button class="btn-icon btn-icon-danger" style="width:26px; height:26px;" title="Hapus" onclick="handleDeleteMedia(${idx})">
              <span class="svg-icon"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function handleMediaMountainChange(e) {
  currentSelectedMountainId = e.target.value;
  renderMediaManager();
}

function setMediaAsCover(src) {
  const m = DATA_GUNUNG[currentSelectedMountainId];
  if (!m) return;
  m.cover = src;
  saveStoredDemoData(DATA_GUNUNG);
  showToast("✅ Foto cover berhasil diubah!", "success");
  renderMediaManager();
}

function openAddMediaModal() {
  selectedMediaFilesData = [];
  document.getElementById("formAddMedia").reset();

  const multiGrid = document.getElementById("mediaMultiPreviewGrid");
  if (multiGrid) {
    multiGrid.style.display = "none";
    multiGrid.innerHTML = "";
  }

  const modal = document.getElementById("modalAddMedia");
  if (modal) modal.classList.add("active");
}

function closeAddMediaModal() {
  const modal = document.getElementById("modalAddMedia");
  if (modal) modal.classList.remove("active");
}

function handleImageFileSelected(e) {
  const files = Array.from(e.target.files || []);
  if (!files || files.length === 0) return;
  selectedMediaFilesData = [];

  const multiGrid = document.getElementById("mediaMultiPreviewGrid");
  if (multiGrid) {
    multiGrid.innerHTML = "";
    multiGrid.style.display = "grid";
  }

  files.forEach(file => {
    const reader = new FileReader();
    const isVideo = file.type.startsWith("video/") || file.name.match(/\.(mp4|webm|mov|mkv|avi)$/i);
    
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      selectedMediaFilesData.push({
        type: isVideo ? "video" : "image",
        src: dataUrl,
        name: file.name
      });

      if (multiGrid) {
        const itemEl = document.createElement("div");
        itemEl.style.width = "100%";
        itemEl.style.aspectRatio = "1/1";
        itemEl.style.borderRadius = "6px";
        itemEl.style.overflow = "hidden";
        itemEl.style.background = "#0f172a";

        if (isVideo) {
          itemEl.innerHTML = `<video src="${dataUrl}" style="width:100%; height:100%; object-fit:cover;" muted></video>`;
        } else {
          itemEl.innerHTML = `<img src="${dataUrl}" style="width:100%; height:100%; object-fit:cover;">`;
        }
        multiGrid.appendChild(itemEl);
      }
    };
    reader.readAsDataURL(file);
  });
}

function handleUploadMedia(e) {
  e.preventDefault();
  const mountain = DATA_GUNUNG[currentSelectedMountainId];
  if (!mountain) {
    showToast("Pilih destinasi gunung terlebih dahulu!", "error");
    return;
  }

  if (!mountain.media) mountain.media = [];

  const manualUrl = document.getElementById("mediaSrcUrlInput").value.trim();
  const customTitle = document.getElementById("mediaTitleInput").value.trim();
  const customDesc = document.getElementById("mediaDescInput").value.trim();
  const isCover = document.getElementById("mediaIsCoverCheckbox").checked;

  if (selectedMediaFilesData.length > 0) {
    selectedMediaFilesData.forEach((item, index) => {
      const title = customTitle || mountain.nama;
      const desc = customDesc || `Dokumentasi ${mountain.nama}`;
      mountain.media.push({
        type: item.type,
        src: item.src,
        title: title,
        desc: desc
      });

      if (isCover && index === 0) {
        mountain.cover = item.src;
      }
    });
    showToast(`✅ ${selectedMediaFilesData.length} dokumen berhasil diunggah!`, "success");
  } else if (manualUrl) {
    const isVideo = manualUrl.endsWith(".mp4") || manualUrl.endsWith(".webm");
    mountain.media.push({
      type: isVideo ? "video" : "image",
      src: manualUrl,
      title: customTitle || mountain.nama,
      desc: customDesc || `Dokumentasi ${mountain.nama}`
    });
    if (isCover) mountain.cover = manualUrl;
    showToast("✅ Link media berhasil ditambahkan!", "success");
  } else {
    showToast("Pilih file foto/video atau masukkan URL terlebih dahulu!", "error");
    return;
  }

  saveStoredDemoData(DATA_GUNUNG);
  closeAddMediaModal();
  renderMediaManager();
  renderDashboardOverview();
}

function handleDeleteMedia(idx) {
  const m = DATA_GUNUNG[currentSelectedMountainId];
  if (!m || !m.media) return;
  if (confirm("Hapus foto/video ini?")) {
    m.media.splice(idx, 1);
    saveStoredDemoData(DATA_GUNUNG);
    showToast("🗑️ Media telah dihapus.", "info");
    renderMediaManager();
    renderDashboardOverview();
  }
}

// 5. EVENT LISTENERS
function setupEventListeners() {
  const loginForm = document.getElementById("formLogin");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);

  const mountainForm = document.getElementById("formMountain");
  if (mountainForm) mountainForm.addEventListener("submit", handleSaveMountain);

  const mediaForm = document.getElementById("formAddMedia");
  if (mediaForm) mediaForm.addEventListener("submit", handleUploadMedia);

  const coverFileInput = document.getElementById("mCoverFileInput");
  if (coverFileInput) coverFileInput.addEventListener("change", handleCoverFileSelected);

  const mediaFileInput = document.getElementById("mediaFileInput");
  if (mediaFileInput) mediaFileInput.addEventListener("change", handleImageFileSelected);

  const searchInput = document.getElementById("mountainSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => renderMountainTable(e.target.value));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  checkAuthAndRender();
});
