/**
 * MOUNTAIN GALLERY - CLOUD CONFIGURATION
 * Konfigurasi API Supabase Database, Cloudflare R2 Storage, dan Admin
 */

const CLOUD_CONFIG = {
  // Masukkan Supabase Project URL & Anon Key Anda di sini
  // (Bisa juga diisi langsung melalui menu Pengaturan di Dashboard Admin)
  SUPABASE_URL: "https://xjpkfdalokarxmbousvj.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcGtmZGFsb2thcnhtYm91c3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5OTM3MjksImV4cCI6MjEwMzU2OTcyOX0.ukLS09nUcqYzn9soXrNwngYRfK7hFPnzlH0wkOR69l8",

  // URL Publik Bucket Cloudflare R2 / Supabase Storage
  STORAGE_BUCKET: "mountain-photos",
  R2_PUBLIC_URL: "",

  // Kredensial Login Admin
  ADMIN_USER: "piantsa",
  ADMIN_PASS: "150205"
};

// Helper untuk membaca konfigurasi (Mendukung override via LocalStorage jika diubah dari UI Admin)
function getActiveCloudConfig() {
  try {
    const custom = localStorage.getItem("mg_cloud_config_override");
    if (custom) {
      return { ...CLOUD_CONFIG, ...JSON.parse(custom) };
    }
  } catch (e) {}
  return { ...CLOUD_CONFIG };
}

function saveCloudConfigOverride(cfg) {
  try {
    localStorage.setItem("mg_cloud_config_override", JSON.stringify(cfg));
    return true;
  } catch (e) {
    return false;
  }
}
