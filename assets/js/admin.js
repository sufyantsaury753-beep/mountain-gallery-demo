/**
 * MOUNTAIN GALLERY DEMO - ADMIN CMS LOGIC (100% Standalone)
 * Full Interactive CRUD & Demo Auth via LocalStorage.
 */

let activeTab = "overview";
let currentSelectedMountainId = null;
let currentMediaMountainId = "gunung-gede";

const DEMO_AUTH_KEY = "mountain_gallery_demo_auth_v1";

function isLoggedIn() {
  return localStorage.getItem(DEMO_AUTH_KEY) === "true";
}

function loginDemo(username, password) {
  // Allow admin/admin, demo/demo, piantsa/150205, or any credentials for easy testing
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
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
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
  activeTab = tabId;
  document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
  if (el) el.classList.add("active");

  document.querySelectorAll(".tab-content-pane").forEach(p => p.style.display = "none");
  const target = document.getElementById(`tabPane-${tabId}`);
  if (target) target.style.display = "block";

  if (tabId === "overview") renderDashboardOverview();
  if (tabId === "mountains") renderMountainTable();
  if (tabId === "media") renderMediaSection();
}

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
      <td>${(m.media || []).length} File</td>
      <td>
        <div class="action-btns-group">
          <button class="btn-icon" title="Edit" onclick="openEditMountainModal('${m.id}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span>
          </button>
          <button class="btn-icon" title="Kelola Media" onclick="selectMountainForMedia('${m.id}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span>
          </button>
          <button class="btn-icon btn-icon-danger" title="Hapus" onclick="handleDeleteMountain('${m.id}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></span>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

function handleSearchMountain(val) {
  renderMountainTable(val);
}

function selectMountainForMedia(id) {
  currentMediaMountainId = id;
  const mediaTabBtn = document.querySelector('[data-tab="media"]');
  switchTab("media", mediaTabBtn);
}

function populateMediaMountainSelect() {
  const select = document.getElementById("mediaMountainSelect");
  const modalSelect = document.getElementById("formMediaTargetMountain");
  const mountains = Object.values(DATA_GUNUNG);

  if (select) {
    select.innerHTML = mountains.map(m => `<option value="${m.id}" ${m.id === currentMediaMountainId ? 'selected' : ''}>${m.nama} (${m.region})</option>`).join("");
  }
  if (modalSelect) {
    modalSelect.innerHTML = mountains.map(m => `<option value="${m.id}" ${m.id === currentMediaMountainId ? 'selected' : ''}>${m.nama}</option>`).join("");
  }
}

function renderMediaSection() {
  populateMediaMountainSelect();
  const currentMtn = DATA_GUNUNG[currentMediaMountainId] || Object.values(DATA_GUNUNG)[0];
  if (!currentMtn) return;

  const titleEl = document.getElementById("currentMountainMediaTitle");
  if (titleEl) titleEl.textContent = `Galeri Media - ${currentMtn.nama}`;

  const container = document.getElementById("mediaGridContainer");
  const mediaList = currentMtn.media || [];

  if (!container) return;

  if (mediaList.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:30px; color:var(--admin-muted);">Belum ada media untuk gunung ini. Silakan upload dokumen baru!</div>`;
    return;
  }

  container.innerHTML = mediaList.map((m, idx) => {
    const isVideo = m.type === "video";
    const src = resolveAssetPath(m.src);
    return `
      <div class="media-card-item">
        <div class="media-thumb-box">
          ${isVideo ? `<video src="${src}"></video>` : `<img src="${src}" alt="${m.title || ''}">`}
        </div>
        <div class="media-card-body">
          <div>
            <div class="media-card-title">${m.title || currentMtn.nama}</div>
            <div class="media-card-desc">${m.desc || '-'}</div>
          </div>
          <div class="media-card-actions">
            <span class="badge-admin">${m.type || 'image'}</span>
            <button class="btn-icon btn-icon-danger" onclick="handleDeleteMedia(${idx})">
              <span class="svg-icon"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function handleMediaMountainChange(e) {
  currentMediaMountainId = e.target.value;
  renderMediaSection();
}

function openAddMountainModal() {
  const modal = document.getElementById("mountainModal");
  if (!modal) return;
  document.getElementById("mountainModalTitle").textContent = "Tambah Destinasi Gunung";
  document.getElementById("formMountainId").value = "";
  document.getElementById("formMountainNama").value = "";
  document.getElementById("formMountainRegion").value = "Jawa Barat";
  document.getElementById("formMountainMdpl").value = "";
  document.getElementById("formMountainLokasi").value = "";
  document.getElementById("formMountainLat").value = "";
  document.getElementById("formMountainLng").value = "";
  document.getElementById("formMountainKesulitan").value = "Sedang";
  document.getElementById("formMountainWaktu").value = "6 - 8 Jam";
  document.getElementById("formMountainCover").value = "";
  document.getElementById("formMountainDesc").value = "";
  modal.classList.add("active");
}

function openEditMountainModal(id) {
  const m = DATA_GUNUNG[id];
  if (!m) return;
  const modal = document.getElementById("mountainModal");
  if (!modal) return;
  document.getElementById("mountainModalTitle").textContent = `Edit ${m.nama}`;
  document.getElementById("formMountainId").value = m.id;
  document.getElementById("formMountainNama").value = m.nama;
  document.getElementById("formMountainRegion").value = m.region || "Jawa Barat";
  document.getElementById("formMountainMdpl").value = m.mdpl || "";
  document.getElementById("formMountainLokasi").value = m.lokasi || "";
  document.getElementById("formMountainLat").value = m.lat || "";
  document.getElementById("formMountainLng").value = m.lng || "";
  document.getElementById("formMountainKesulitan").value = m.tingkatKesulitan || "";
  document.getElementById("formMountainWaktu").value = m.estimasiWaktu || "";
  document.getElementById("formMountainCover").value = m.cover || "";
  document.getElementById("formMountainDesc").value = m.deskripsi || "";
  modal.classList.add("active");
}

function closeMountainModal() {
  const modal = document.getElementById("mountainModal");
  if (modal) modal.classList.remove("active");
}

function handleSaveMountain(e) {
  e.preventDefault();
  const idInput = document.getElementById("formMountainId").value;
  const nama = document.getElementById("formMountainNama").value.trim();
  const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const id = idInput || `gunung-${slug}`;
  const mdplNum = parseInt(document.getElementById("formMountainMdpl").value) || 0;

  const existing = DATA_GUNUNG[id] || {};
  DATA_GUNUNG[id] = {
    ...existing,
    id: id,
    slug: slug,
    nama: nama,
    region: document.getElementById("formMountainRegion").value,
    mdpl: mdplNum,
    mdplText: `${mdplNum.toLocaleString()} Mdpl`,
    lokasi: document.getElementById("formMountainLokasi").value.trim(),
    lat: parseFloat(document.getElementById("formMountainLat").value) || 0,
    lng: parseFloat(document.getElementById("formMountainLng").value) || 0,
    tingkatKesulitan: document.getElementById("formMountainKesulitan").value.trim() || "Sedang",
    estimasiWaktu: document.getElementById("formMountainWaktu").value.trim() || "6 - 8 Jam",
    cover: document.getElementById("formMountainCover").value.trim() || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
    deskripsi: document.getElementById("formMountainDesc").value.trim(),
    media: existing.media || [],
    jalurPendakian: existing.jalurPendakian || []
  };

  saveStoredDemoData(DATA_GUNUNG);
  closeMountainModal();
  showToast(`✅ ${nama} berhasil disimpan!`, "success");
  renderDashboardOverview();
  if (activeTab === "mountains") renderMountainTable();
}

function handleDeleteMountain(id) {
  const m = DATA_GUNUNG[id];
  if (!m) return;
  if (confirm(`Yakin ingin menghapus ${m.nama}?`)) {
    delete DATA_GUNUNG[id];
    saveStoredDemoData(DATA_GUNUNG);
    showToast(`🗑️ ${m.nama} telah dihapus.`, "info");
    renderDashboardOverview();
    renderMountainTable();
  }
}

function openAddMediaModal() {
  const modal = document.getElementById("mediaModal");
  const targetSelect = document.getElementById("formMediaTargetMountain");
  if (targetSelect) targetSelect.value = currentMediaMountainId;
  document.getElementById("formMediaSrc").value = "";
  document.getElementById("formMediaTitle").value = "";
  document.getElementById("formMediaDesc").value = "";
  if (modal) modal.classList.add("active");
}

function closeMediaModal() {
  const modal = document.getElementById("mediaModal");
  if (modal) modal.classList.remove("active");
}

function handleSaveMedia(e) {
  e.preventDefault();
  const mtnId = document.getElementById("formMediaTargetMountain").value;
  const src = document.getElementById("formMediaSrc").value.trim();
  const type = document.getElementById("formMediaType").value;
  const title = document.getElementById("formMediaTitle").value.trim();
  const desc = document.getElementById("formMediaDesc").value.trim();

  if (!DATA_GUNUNG[mtnId]) return;
  if (!DATA_GUNUNG[mtnId].media) DATA_GUNUNG[mtnId].media = [];

  DATA_GUNUNG[mtnId].media.push({
    type: type,
    src: src,
    title: title || DATA_GUNUNG[mtnId].nama,
    desc: desc
  });

  saveStoredDemoData(DATA_GUNUNG);
  closeMediaModal();
  showToast("✅ Dokumen media berhasil ditambahkan!", "success");
  renderMediaSection();
}

function handleDeleteMedia(idx) {
  const m = DATA_GUNUNG[currentMediaMountainId];
  if (!m || !m.media) return;
  if (confirm("Hapus media ini?")) {
    m.media.splice(idx, 1);
    saveStoredDemoData(DATA_GUNUNG);
    showToast("🗑️ Media berhasil dihapus.", "info");
    renderMediaSection();
  }
}

function handleResetDemoData() {
  if (confirm("Apakah Anda yakin ingin mereset seluruh data kembali ke 21 Gunung default?")) {
    const fresh = resetDemoDataToDefault();
    Object.keys(DATA_GUNUNG).forEach(k => delete DATA_GUNUNG[k]);
    Object.assign(DATA_GUNUNG, fresh);
    showToast("🔄 Data berhasil direset ke 21 Gunung default!", "success");
    renderDashboardOverview();
  }
}

function setupEventListeners() {
  const loginForm = document.getElementById("formLogin");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);

  const searchInput = document.getElementById("mountainSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => handleSearchMountain(e.target.value));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  checkAuthAndRender();
});
