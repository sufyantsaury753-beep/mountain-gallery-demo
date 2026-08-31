/**
 * MOUNTAIN GALLERY - ADMIN CLOUD DASHBOARD LOGIC
 * Manages Supabase PostgreSQL CRUD, Cloud Storage Uploads, 1-Click Seeding & Auth
 */

let currentSelectedMountainId = null;
let currentEditingMountainId = null;

document.addEventListener("DOMContentLoaded", () => {
  checkAuthAndRender();
  setupEventListeners();
});

// =========================================================
// 1. AUTHENTICATION & INITIALIZATION
// =========================================================
function checkAuthAndRender() {
  const loginScreen = document.getElementById("loginScreen");
  const adminContainer = document.getElementById("adminContainer");

  if (CloudDB.isLoggedIn()) {
    loginScreen.style.display = "none";
    adminContainer.classList.add("active");
    
    updateConnectionStatusUI();
    loadSettingsInputs();
    renderDashboardOverview();
    renderMountainTable();
    populateMediaMountainSelect();
  } else {
    loginScreen.style.display = "flex";
    adminContainer.classList.remove("active");
    const loginForm = document.getElementById("formLogin");
    if (loginForm) loginForm.reset();
  }
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  if (CloudDB.login(user, pass)) {
    showToast("Selamat datang di Cloud Admin, " + user + "!", "success");
    checkAuthAndRender();
  } else {
    showToast("Username atau password salah!", "error");
  }
}

function handleLogout() {
  CloudDB.logout();
  showToast("Anda telah logout.", "info");
  checkAuthAndRender();
}

function updateConnectionStatusUI() {
  const badge = document.getElementById("cloudConnectionBadge");
  const isConn = CloudDB.isConnected();

  if (badge) {
    if (isConn) {
      badge.className = "cloud-status-pill cloud-status-connected";
      badge.innerHTML = `<span class="status-dot"></span> Supabase Cloud Terhubung`;
    } else {
      badge.className = "cloud-status-pill cloud-status-offline";
      badge.innerHTML = `<span class="status-dot"></span> Mode Lokal (Belum Terhubung Cloud)`;
    }
  }
}

// =========================================================
// 2. TABS & OVERVIEW STATS
// =========================================================
function switchTab(tabName, btnElement) {
  document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-content-pane").forEach(p => p.style.display = "none");

  if (btnElement) btnElement.classList.add("active");
  const pane = document.getElementById(`tabPane-${tabName}`);
  if (pane) pane.style.display = "block";

  if (tabName === "overview") renderDashboardOverview();
  if (tabName === "mountains") renderMountainTable();
  if (tabName === "media") renderMediaManager();
}

async function renderDashboardOverview() {
  const mountains = await CloudDB.getAllMountains();
  let totalMedia = 0;
  let totalRoutes = 0;

  mountains.forEach(m => {
    if (m.media) totalMedia += m.media.length;
    if (m.jalurPendakian) totalRoutes += m.jalurPendakian.length;
  });

  document.getElementById("kpiTotalMountains").textContent = mountains.length;
  document.getElementById("kpiTotalMedia").textContent = totalMedia;
  document.getElementById("kpiTotalRoutes").textContent = totalRoutes;

  const recentContainer = document.getElementById("recentMountainsList");
  if (recentContainer) {
    recentContainer.innerHTML = mountains.map(m => `
      <div class="recent-mountain-row">
        <div class="recent-mountain-info">
          <img src="${resolveAssetPath(m.cover)}" class="recent-mountain-thumb" alt="${m.nama}" onerror="this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100'">
          <div>
            <strong class="recent-mountain-name">${m.nama}</strong>
            <div class="recent-mountain-meta">${m.region} · ${m.mdplText || (m.mdpl ? `${m.mdpl.toLocaleString()} Mdpl` : '')}</div>
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

// =========================================================
// 3. MOUNTAIN CRUD (CREATE, READ, UPDATE, DELETE)
// =========================================================
async function renderMountainTable() {
  const tableBody = document.getElementById("mountainTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px;">Memuat data gunung...</td></tr>`;

  const keyword = (document.getElementById("mountainSearchInput")?.value || "").toLowerCase().trim();
  const all = await CloudDB.getAllMountains();
  const mountains = all.filter(m => 
    m.nama.toLowerCase().includes(keyword) || 
    m.region.toLowerCase().includes(keyword) || 
    m.lokasi.toLowerCase().includes(keyword)
  );

  if (mountains.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:32px; color:var(--admin-muted);">
          Tidak ada data gunung ditemukan.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = mountains.map(m => `
    <tr>
      <td>
        <div class="mountain-cell">
          <img class="mountain-thumb-mini" src="${resolveAssetPath(m.cover)}" alt="${m.nama}" onerror="this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100'">
          <div class="mountain-cell-info">
            <strong>${m.nama}</strong>
            <small>${m.lokasi}</small>
          </div>
        </div>
      </td>
      <td><strong>${m.mdplText}</strong></td>
      <td><span class="badge-admin">${m.region}</span></td>
      <td>${m.tingkatKesulitan}</td>
      <td>${(m.media || []).length} Foto/Video</td>
      <td>
        <div class="action-btns-group">
          <button class="btn-icon" title="Kelola Foto & Galeri" onclick="selectMountainForMedia('${m.id}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span>
          </button>
          <button class="btn-icon" title="Edit Data Gunung" onclick="openEditMountainModal('${m.id}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>
          </button>
          <button class="btn-icon" title="Lihat di Web Live" onclick="window.open('../galeri/index.html?id=${m.id}', '_blank')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span>
          </button>
          <button class="btn-icon btn-icon-danger" title="Hapus Gunung" onclick="confirmDeleteMountain('${m.id}', '${m.nama}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></span>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

let selectedCoverFile = null;

function handleCoverFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;
  selectedCoverFile = file;

  const previewBox = document.getElementById("mCoverPreviewBox");
  const previewImg = document.getElementById("mCoverPreviewImg");
  if (previewBox && previewImg) {
    previewImg.src = URL.createObjectURL(file);
    previewBox.style.display = "block";
  }
}

function openAddMountainModal() {
  currentEditingMountainId = null;
  selectedCoverFile = null;
  document.getElementById("modalMountainTitle").textContent = "Tambah Destinasi Gunung Baru";
  document.getElementById("formMountain").reset();
  document.getElementById("mountainIdInput").value = "";
  
  const previewBox = document.getElementById("mCoverPreviewBox");
  if (previewBox) previewBox.style.display = "none";
  const coverFileInput = document.getElementById("mCoverFileInput");
  if (coverFileInput) coverFileInput.value = "";

  const container = document.getElementById("routesRepeaterContainer");
  container.innerHTML = "";
  addRouteRow();

  document.getElementById("modalMountain").classList.add("active");
}

async function openEditMountainModal(mountainId) {
  const mountain = await CloudDB.getMountainById(mountainId);
  if (!mountain) return;

  currentEditingMountainId = mountainId;
  selectedCoverFile = null;
  document.getElementById("modalMountainTitle").textContent = `Edit Data ${mountain.nama}`;
  
  document.getElementById("mountainIdInput").value = mountain.id;
  document.getElementById("mNama").value = mountain.nama;
  document.getElementById("mMdpl").value = mountain.mdpl;
  document.getElementById("mLokasi").value = mountain.lokasi;
  document.getElementById("mRegion").value = mountain.region;
  document.getElementById("mLat").value = mountain.lat !== undefined && mountain.lat !== null ? String(mountain.lat) : "";
  document.getElementById("mLng").value = mountain.lng !== undefined && mountain.lng !== null ? String(mountain.lng) : "";
  document.getElementById("mKesulitan").value = mountain.tingkatKesulitan;
  document.getElementById("mEstimasi").value = mountain.estimasiWaktu;
  document.getElementById("mSuhu").value = mountain.suhuPuncak;
  document.getElementById("mCover").value = mountain.cover || "";
  document.getElementById("mAtribusi").value = mountain.atribusi || "";
  document.getElementById("mDeskripsi").value = mountain.deskripsi;
  document.getElementById("mDeskripsiTambahan").value = mountain.deskripsiTambahan || "";
  document.getElementById("mTags").value = (mountain.tags || []).join(", ");

  const previewBox = document.getElementById("mCoverPreviewBox");
  const previewImg = document.getElementById("mCoverPreviewImg");
  const coverFileInput = document.getElementById("mCoverFileInput");
  if (coverFileInput) coverFileInput.value = "";

  if (mountain.cover && previewBox && previewImg) {
    previewImg.src = resolveAssetPath(mountain.cover);
    previewBox.style.display = "block";
  } else if (previewBox) {
    previewBox.style.display = "none";
  }

  const container = document.getElementById("routesRepeaterContainer");
  container.innerHTML = "";
  if (mountain.jalurPendakian && mountain.jalurPendakian.length > 0) {
    mountain.jalurPendakian.forEach(r => addRouteRow(r.nama, r.waktu, r.status));
  } else {
    addRouteRow();
  }

  document.getElementById("modalMountain").classList.add("active");
}

function closeMountainModal() {
  document.getElementById("modalMountain").classList.remove("active");
}

function addRouteRow(nama = "", waktu = "", status = "") {
  const container = document.getElementById("routesRepeaterContainer");
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

function parseCoord(val) {
  if (val === null || val === undefined || val === "") return 0;
  const cleanStr = String(val).replace(",", ".").trim();
  const num = parseFloat(cleanStr);
  return isNaN(num) ? 0 : num;
}

async function handleSaveMountain(e) {
  e.preventDefault();

  const routeRows = document.querySelectorAll("#routesRepeaterContainer .route-item-row");
  const routes = [];
  routeRows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    const nama = inputs[0].value.trim();
    const waktu = inputs[1].value.trim();
    const status = inputs[2].value.trim();
    if (nama) {
      routes.push({ nama, waktu: waktu || "4-6 Jam", status: status || "Jalur Resmi" });
    }
  });

  const rawTags = document.getElementById("mTags").value.split(",").map(t => t.trim()).filter(Boolean);
  const mountainIdVal = document.getElementById("mountainIdInput").value || undefined;
  const mountainNameVal = document.getElementById("mNama").value.trim();

  let coverUrl = document.getElementById("mCover").value.trim();

  // Jika user memilih file cover baru dari HP / Laptop
  if (selectedCoverFile) {
    try {
      showToast("⏳ Mengompresi & mengunggah foto cover ke Cloud Storage...", "info");
      const targetId = mountainIdVal || mountainNameVal.toLowerCase().replace(/[^a-z0-9]/g, "-");
      coverUrl = await CloudDB.uploadCoverFile(targetId, selectedCoverFile);
    } catch (coverErr) {
      showToast(`Gagal upload cover: ${coverErr.message}`, "error");
      return;
    }
  }

  const mountainData = {
    id: mountainIdVal,
    nama: mountainNameVal,
    mdpl: Number(document.getElementById("mMdpl").value) || 0,
    lokasi: document.getElementById("mLokasi").value.trim(),
    region: document.getElementById("mRegion").value,
    lat: parseCoord(document.getElementById("mLat").value),
    lng: parseCoord(document.getElementById("mLng").value),
    tingkatKesulitan: document.getElementById("mKesulitan").value,
    estimasiWaktu: document.getElementById("mEstimasi").value.trim(),
    suhuPuncak: document.getElementById("mSuhu").value.trim(),
    cover: coverUrl,
    atribusi: document.getElementById("mAtribusi").value.trim(),
    deskripsi: document.getElementById("mDeskripsi").value.trim(),
    deskripsiTambahan: document.getElementById("mDeskripsiTambahan").value.trim(),
    jalurPendakian: routes,
    tags: rawTags
  };

  try {
    const result = await CloudDB.saveMountain(mountainData);
    showToast(`Data ${result.nama} berhasil disimpan ke Supabase Cloud!`, "success");
    closeMountainModal();
    renderMountainTable();
    renderDashboardOverview();
    populateMediaMountainSelect();
  } catch (err) {
    showToast(`Error: ${err.message}`, "error");
  }
}

async function confirmDeleteMountain(mountainId, mountainName) {
  if (confirm(`Apakah Anda yakin ingin menghapus "${mountainName}" dari Supabase Cloud Database?`)) {
    try {
      await CloudDB.deleteMountain(mountainId);
      showToast(`Gunung "${mountainName}" berhasil dihapus.`, "success");
      renderMountainTable();
      renderDashboardOverview();
      populateMediaMountainSelect();
    } catch (err) {
      showToast(`Error: ${err.message}`, "error");
    }
  }
}

// =========================================================
// 4. MEDIA MANAGER (MULTI-PHOTO UPLOADS TO CLOUD STORAGE)
// =========================================================
let selectedUploadFiles = [];

async function populateMediaMountainSelect() {
  const select = document.getElementById("mediaMountainSelect");
  if (!select) return;

  const mountains = await CloudDB.getAllMountains();
  select.innerHTML = mountains.map(m => `
    <option value="${m.id}">${m.nama} (${(m.media || []).length} Media)</option>
  `).join("");

  if (mountains.length > 0 && !currentSelectedMountainId) {
    currentSelectedMountainId = mountains[0].id;
  }
  if (currentSelectedMountainId) {
    select.value = currentSelectedMountainId;
  }
}

function handleMediaMountainChange(e) {
  currentSelectedMountainId = e.target.value;
  renderMediaManager();
}

function selectMountainForMedia(mountainId) {
  currentSelectedMountainId = mountainId;
  switchTab("media", document.querySelector('[data-tab="media"]'));
  const select = document.getElementById("mediaMountainSelect");
  if (select) select.value = mountainId;
  renderMediaManager();
}

async function renderMediaManager() {
  const container = document.getElementById("mediaGridContainer");
  if (!container || !currentSelectedMountainId) return;

  container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:32px;">Memuat galeri foto...</div>`;

  const mountain = await CloudDB.getMountainById(currentSelectedMountainId);
  if (!mountain) return;

  document.getElementById("currentMountainMediaTitle").textContent = `Galeri Media: ${mountain.nama}`;

  const mediaList = mountain.media || [];
  if (mediaList.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--admin-muted);">
        Belum ada foto dokumentasi di cloud untuk gunung ini. Silakan upload via tombol di atas!
      </div>
    `;
    return;
  }

  container.innerHTML = mediaList.map((m, index) => {
    const isCover = (mountain.cover === m.src || (m.src && mountain.cover.endsWith(m.src)));
    const resolved = resolveAssetPath(m.src);

    return `
      <div class="media-card-item">
        <div class="media-thumb-box">
          ${m.type === "video" 
            ? `<video src="${resolved}" muted></video>` 
            : `<img src="${resolved}" alt="${m.title}" onerror="this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300'">`}
          ${isCover ? `<span class="media-badge-cover">Cover Utama</span>` : ""}
        </div>
        <div class="media-card-body">
          <div class="media-card-title">${m.title || `Media #${index + 1}`}</div>
          <div class="media-card-desc">${m.desc || "Tanpa deskripsi"}</div>
          <div class="media-card-actions">
            ${isCover ? `<span style="font-size:10.5px; color:var(--admin-emerald); font-weight:800;">✓ Foto Cover</span>` : `
              <button class="btn-admin btn-admin-outline" style="padding:4px 8px; font-size:10.5px;" onclick="setMediaAsCover('${m.src}')">
                Set Cover
              </button>
            `}
            <button class="btn-icon btn-icon-danger" style="width:26px; height:26px;" title="Hapus Foto" onclick="deleteMediaConfirm('${m.id}', '${m.src}')">
              <span class="svg-icon"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openAddMediaModal() {
  const select = document.getElementById("mediaMountainSelect");
  if (!currentSelectedMountainId && select && select.value) {
    currentSelectedMountainId = select.value;
  }
  selectedUploadFiles = [];
  document.getElementById("formAddMedia").reset();
  
  const multiGrid = document.getElementById("mediaMultiPreviewGrid");
  if (multiGrid) {
    multiGrid.style.display = "none";
    multiGrid.innerHTML = "";
  }

  const progressBox = document.getElementById("uploadProgressBarContainer");
  if (progressBox) progressBox.style.display = "none";

  const status = document.getElementById("uploadStatusText");
  if (status) { status.style.display = "none"; status.textContent = ""; }

  const btnSubmit = document.getElementById("btnSubmitMedia");
  if (btnSubmit) {
    btnSubmit.disabled = false;
    btnSubmit.textContent = "Upload & Simpan ke Cloud";
  }

  document.getElementById("modalAddMedia").classList.add("active");
}

function closeAddMediaModal() {
  document.getElementById("modalAddMedia").classList.remove("active");
}

function handleImageFileSelected(e) {
  const files = Array.from(e.target.files || []);
  if (!files || files.length === 0) return;
  selectedUploadFiles = files;

  const totalSizeMB = files.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024);
  const vidCount = files.filter(f => f.type.startsWith("video/") || f.name.match(/\.(mp4|webm|mov|mkv|avi)$/i)).length;
  const imgCount = files.length - vidCount;
  const multiGrid = document.getElementById("mediaMultiPreviewGrid");
  
  if (multiGrid) {
    multiGrid.innerHTML = "";
    multiGrid.style.display = "grid";

    // Buat thumbnail preview untuk foto & video yang dipilih
    files.slice(0, 24).forEach(file => {
      const isVideo = file.type.startsWith("video/") || file.name.match(/\.(mp4|webm|mov|mkv|avi)$/i);
      
      if (isVideo) {
        const vidBox = document.createElement("div");
        vidBox.style.position = "relative";
        vidBox.style.width = "100%";
        vidBox.style.aspectRatio = "1/1";
        vidBox.style.background = "#0f172a";
        vidBox.style.borderRadius = "6px";
        vidBox.style.overflow = "hidden";
        vidBox.style.display = "flex";
        vidBox.style.alignItems = "center";
        vidBox.style.justifyContent = "center";

        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";
        video.muted = true;

        const badge = document.createElement("span");
        badge.textContent = "VIDEO";
        badge.style.position = "absolute";
        badge.style.bottom = "2px";
        badge.style.right = "2px";
        badge.style.background = "rgba(0,0,0,0.75)";
        badge.style.color = "#ffffff";
        badge.style.fontSize = "7.5px";
        badge.style.fontWeight = "800";
        badge.style.padding = "1px 4px";
        badge.style.borderRadius = "3px";

        vidBox.appendChild(video);
        vidBox.appendChild(badge);
        multiGrid.appendChild(vidBox);
      } else {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "100%";
        img.style.aspectRatio = "1/1";
        img.style.objectFit = "cover";
        img.style.borderRadius = "6px";
        multiGrid.appendChild(img);
      }
    });

    if (files.length > 24) {
      const more = document.createElement("div");
      more.style.display = "flex";
      more.style.alignItems = "center";
      more.style.justifyContent = "center";
      more.style.background = "#e2e8f0";
      more.style.borderRadius = "6px";
      more.style.fontSize = "11px";
      more.style.fontWeight = "800";
      more.textContent = `+${files.length - 24}`;
      multiGrid.appendChild(more);
    }
  }

  const status = document.getElementById("uploadStatusText");
  if (status) {
    status.style.display = "block";
    status.style.background = "#f0fdf4";
    status.style.color = "#15803d";
    status.style.borderColor = "#bbf7d0";
    status.textContent = `✓ ${files.length} Dokumen Siap Diunggah (${imgCount} Foto, ${vidCount} Video · Total: ${totalSizeMB.toFixed(2)} MB).`;
  }
}

async function handleSaveMedia(e) {
  e.preventDefault();

  const targetMountainId = currentSelectedMountainId;
  if (!targetMountainId) {
    showToast("Pilih destinasi gunung terlebih dahulu!", "error");
    return;
  }

  const userTitle = document.getElementById("mediaTitleInput").value.trim();
  const userDesc = document.getElementById("mediaDescInput").value.trim();
  const isCover = document.getElementById("mediaIsCoverCheckbox").checked;
  const rawUrl = document.getElementById("mediaSrcUrlInput").value.trim();

  const statusText = document.getElementById("uploadStatusText");
  const progressContainer = document.getElementById("uploadProgressBarContainer");
  const progressBar = document.getElementById("uploadProgressBar");
  const progressLabel = document.getElementById("uploadProgressLabel");
  const progressPct = document.getElementById("uploadProgressPct");
  const saveBtn = document.getElementById("btnSubmitMedia");

  if (saveBtn) saveBtn.disabled = true;

  try {
    const mountain = await CloudDB.getMountainById(targetMountainId);
    const mountainName = mountain ? mountain.nama : "Gunung";

    if (selectedUploadFiles && selectedUploadFiles.length > 0) {
      const totalFiles = selectedUploadFiles.length;

      if (progressContainer) {
        progressContainer.style.display = "block";
      }

      for (let i = 0; i < totalFiles; i++) {
        const file = selectedUploadFiles[i];
        const pct = Math.round(((i + 1) / totalFiles) * 100);

        // Auto-generate title & desc seragam (tanpa penomoran)
        const currentTitle = userTitle || mountainName;
        const currentDesc = userDesc || `Dokumentasi ${mountainName}`;

        const isCoverThisFile = (isCover && i === 0);

        if (statusText) {
          statusText.style.display = "block";
          statusText.textContent = `⏳ Mengunggah dokumen (${i + 1}/${totalFiles}): "${file.name}"...`;
        }

        if (progressLabel) progressLabel.textContent = `Dokumen ${i + 1} dari ${totalFiles}`;
        if (progressPct) progressPct.textContent = `${pct}%`;
        if (progressBar) progressBar.style.width = `${pct}%`;

        await CloudDB.uploadMediaFile(targetMountainId, file, currentTitle, currentDesc, isCoverThisFile);
      }

      showToast(`✓ Berhasil mengunggah ${totalFiles} dokumen ke ${mountainName}!`, "success");
    } else if (rawUrl) {
      const client = CloudDB.getClient();
      const finalTitle = userTitle || mountainName;
      const finalDesc = userDesc || `Dokumentasi ${mountainName}`;
      const isVidUrl = rawUrl.match(/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i) !== null;

      await client.from("mountain_media").insert({
        mountain_id: targetMountainId,
        type: isVidUrl ? "video" : "image",
        src: rawUrl,
        title: finalTitle,
        description: finalDesc,
        category: isVidUrl ? "video" : "image"
      });
      if (isCover) {
        await client.from("mountains").update({ cover: rawUrl }).eq("id", targetMountainId);
      }
      showToast("✓ Link dokumen berhasil disimpan ke database!", "success");
    } else {
      showToast("Pilih file dokumen (foto/video) dari laptop/HP atau masukkan link!", "warning");
      if (saveBtn) saveBtn.disabled = false;
      return;
    }

    closeAddMediaModal();
    renderMediaManager();
    renderMountainTable();
    renderDashboardOverview();
  } catch (err) {
    showToast(`Upload gagal: ${err.message}`, "error");
  } finally {
    if (saveBtn) saveBtn.disabled = false;
  }
}

async function setMediaAsCover(srcUrl) {
  if (!currentSelectedMountainId) return;
  try {
    const client = CloudDB.getClient();
    await client.from("mountains").update({ cover: srcUrl }).eq("id", currentSelectedMountainId);
    showToast("Foto cover utama berhasil diperbarui!", "success");
    renderMediaManager();
    renderMountainTable();
  } catch (err) {
    showToast(`Gagal set cover: ${err.message}`, "error");
  }
}

async function deleteMediaConfirm(mediaId, srcUrl) {
  if (confirm("Hapus foto ini dari galeri dan database cloud?")) {
    try {
      await CloudDB.deleteMedia(mediaId, srcUrl);
      showToast("Media berhasil dihapus.", "success");
      renderMediaManager();
      renderMountainTable();
      renderDashboardOverview();
    } catch (err) {
      showToast(`Gagal menghapus: ${err.message}`, "error");
    }
  }
}

// =========================================================
// 5. CLOUD SETTINGS & 1-CLICK SEEDER
// =========================================================
function loadSettingsInputs() {
  const cfg = getActiveCloudConfig();
  const urlInp = document.getElementById("cfgSupabaseUrl");
  const keyInp = document.getElementById("cfgSupabaseKey");
  const r2Inp = document.getElementById("cfgR2Url");

  if (urlInp) urlInp.value = cfg.SUPABASE_URL || "";
  if (keyInp) keyInp.value = cfg.SUPABASE_ANON_KEY || "";
  if (r2Inp) r2Inp.value = cfg.R2_PUBLIC_URL || "";
}

function handleSaveCloudConfig(e) {
  e.preventDefault();
  const url = document.getElementById("cfgSupabaseUrl").value.trim();
  const key = document.getElementById("cfgSupabaseKey").value.trim();
  const r2 = document.getElementById("cfgR2Url").value.trim();

  const cfg = getActiveCloudConfig();
  cfg.SUPABASE_URL = url;
  cfg.SUPABASE_ANON_KEY = key;
  cfg.R2_PUBLIC_URL = r2;

  if (saveCloudConfigOverride(cfg)) {
    showToast("Konfigurasi Cloud berhasil disimpan!", "success");
    updateConnectionStatusUI();
    renderDashboardOverview();
    renderMountainTable();
    populateMediaMountainSelect();
  }
}

async function handleSeedDatabase() {
  if (!CloudDB.isConnected()) {
    showToast("Masukkan Supabase URL & Anon Key terlebih dahulu di form di atas!", "error");
    return;
  }

  if (confirm("Unggah seluruh data 5 gunung bawaan (Cikuray, Papandayan, dll.) beserta seluruh jalurnya ke Supabase?")) {
    const statusBox = document.getElementById("seedProgressBox");
    if (statusBox) {
      statusBox.style.display = "block";
      statusBox.textContent = "Memulai proses seeding data...";
    }

    try {
      const count = await CloudDB.seedInitialData((msg) => {
        if (statusBox) statusBox.textContent = msg;
      });
      showToast(`✓ Berhasil seeding ${count} gunung ke Supabase Cloud!`, "success");
      if (statusBox) statusBox.textContent = `✓ Selesai! ${count} destinasi gunung telah aktif di Supabase.`;
      renderDashboardOverview();
      renderMountainTable();
      populateMediaMountainSelect();
    } catch (err) {
      showToast(`Seeding gagal: ${err.message}`, "error");
      if (statusBox) statusBox.textContent = `Error: ${err.message}`;
    }
  }
}

function handleChangePassword(e) {
  e.preventDefault();
  const oldPass = document.getElementById("oldPasswordInput").value;
  const newUser = document.getElementById("newUsernameInput")?.value?.trim() || null;
  const newPass = document.getElementById("newPasswordInput").value;

  if (CloudDB.changeCredentials(oldPass, newUser, newPass)) {
    showToast("Akun Admin berhasil diperbarui!", "success");
    document.getElementById("formChangePassword").reset();
  } else {
    showToast("Password lama salah!", "error");
  }
}

// =========================================================
// 6. HELPERS & EVENT LISTENERS
// =========================================================
function showToast(message, type = "info") {
  let toast = document.getElementById("adminToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "adminToast";
    toast.className = "toast-box";
    document.body.appendChild(toast);
  }

  const iconMap = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ"
  };

  toast.innerHTML = `<span style="font-size:16px;">${iconMap[type] || "ℹ"}</span> <span>${message}</span>`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3400);
}

function setupEventListeners() {
  const loginForm = document.getElementById("formLogin");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);

  const mountainForm = document.getElementById("formMountain");
  if (mountainForm) mountainForm.addEventListener("submit", handleSaveMountain);

  const addMediaForm = document.getElementById("formAddMedia");
  if (addMediaForm) addMediaForm.addEventListener("submit", handleSaveMedia);

  const cfgForm = document.getElementById("formCloudConfig");
  if (cfgForm) cfgForm.addEventListener("submit", handleSaveCloudConfig);

  const passForm = document.getElementById("formChangePassword");
  if (passForm) passForm.addEventListener("submit", handleChangePassword);

  const fileInput = document.getElementById("mediaFileInput");
  if (fileInput) fileInput.addEventListener("change", handleImageFileSelected);

  const coverFileInput = document.getElementById("mCoverFileInput");
  if (coverFileInput) coverFileInput.addEventListener("change", handleCoverFileSelected);

  const searchInput = document.getElementById("mountainSearchInput");
  if (searchInput) searchInput.addEventListener("input", renderMountainTable);
}

function resolveAssetPath(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) return path;
  const clean = path.replace(/^(\.\.\/)+/, "").replace(/^(\.\/)+/, "").replace(/^\/+/, "");
  return "../" + clean;
}
