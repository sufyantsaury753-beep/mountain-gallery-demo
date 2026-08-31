/**
 * DATA MASTER MOUNTAIN GALLERY (Single Source of Truth)
 * Seluruh data lokasi, ketinggian, deskripsi, jalur pendakian, dan media disimpan di sini.
 */

try {
  localStorage.removeItem("mountain_gallery_db_v2");
  localStorage.removeItem("mountain_gallery_auth_session");
  localStorage.removeItem("mountain_gallery_config");
} catch(e) {}

const DATA_GUNUNG = {
  "gunung-cikuray": {
    id: "gunung-cikuray",
    slug: "cikuray",
    nama: "Gunung Cikuray",
    lokasi: "Garut, Jawa Barat",
    region: "Jawa Barat",
    mdpl: 2821,
    mdplText: "2.821 Mdpl",
    lat: -7.3226,
    lng: 107.8599,
    cover: "galeri/gunung-cikuray/img/mt-cikuray.jpeg",
    coverFallback: "galeri/gunung-cikuray/img/mt-cikuray.jpeg",
    atribusi: "Foto Gunung Cikuray dan Papandayan oleh Pudyatmoko, Wikimedia Commons, CC BY-SA 4.0.",
    deskripsi: "Gunung Cikuray merupakan salah satu ikon pendakian di Kabupaten Garut dengan ketinggian sekitar 2.821 mdpl. Gunung ini terkenal dengan jalur yang menanjak konstan tanpa bonus datar, vegetasi hutan yang rapat, serta panorama puncak yang sering menyajikan hamparan samudra awan menakjubkan.",
    deskripsiTambahan: "Galeri ini merangkum suasana pendakian, sunrise emas, jalur hutan berakar, kabut pegunungan, dan panorama Garut dari ketinggian.",
    tingkatKesulitan: "Menantang",
    estimasiWaktu: "6 - 8 Jam",
    suhuPuncak: "8°C - 14°C",
    jalurPendakian: [
      { nama: "Jalur Pemancar (Dayeuhmamat)", waktu: "6 - 7 Jam", status: "Jalur Terpopuler" },
      { nama: "Jalur Bayongbong", waktu: "7 - 8 Jam", status: "Jalur Paling Terjal" },
      { nama: "Jalur Cikajang (Kebun Teh)", waktu: "7 - 8 Jam", status: "Panorama Kebun Teh" }
    ],
    tags: ["Jawa Barat", "Garut", "2.821 Mdpl", "Jalur Menantang", "Sunrise Spot", "Samudra Awan"],
    media: [
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (1).jpeg", title: "Sunrise Puncak Cikuray", category: "image", desc: "Cahaya keemasan fajar memecah kabut di puncak tertinggi Garut." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (2).jpeg", title: "Lautan Samudra Awan", category: "image", desc: "Hamparan awan putih tak berujung layaknya negeri di atas awan." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (3).jpeg", title: "Vegetasi Hutan Lebat", category: "image", desc: "Pepohonan rimbun dan akar tanah yang menantang stamina pendaki." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (4).jpeg", title: "Camp Area Cikuray", category: "image", desc: "Momen istirahat dan berkemah di bawah langit malam pegunungan." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (5).jpeg", title: "Kabut Pagi Dingin", category: "image", desc: "Kabut sejuk menyelimuti punggungan bukit di pagi hari." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (6).jpeg", title: "Siluet Pegunungan Garut", category: "image", desc: "Pemandangan kontur pegunungan Priangan saat matahari menyingsing." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (7).jpeg", title: "Gardu Pandang Puncak", category: "image", desc: "Puncak 2.821 mdpl dengan gardu pandang ikonik Cikuray." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (8).jpeg", title: "Tanjakan Akar Legendaris", category: "image", desc: "Karakteristik jalur tanah merah berakar khas Cikuray." },
      { type: "video", src: "galeri/gunung-cikuray/img/cikuray-video-1.mp4", title: "Cuangki Cikuray", category: "video", desc: "Video hembusan angin segar dan pemandangan luas 360 derajat di puncak." },
      { type: "video", src: "galeri/gunung-cikuray/img/cikuray-video-2.mp4", title: "Lautan Awan", category: "video", desc: "Rekaman detik-detik terbitnya fajar emas di ufuk timur pegunungan." }
    ]
  },

  "gunung-papandayan": {
    id: "gunung-papandayan",
    slug: "papandayan",
    nama: "Gunung Papandayan",
    lokasi: "Garut, Jawa Barat",
    region: "Jawa Barat",
    mdpl: 2665,
    mdplText: "2.665 Mdpl",
    lat: -7.3190,
    lng: 107.7310,
    cover: "galeri/gunung-papandayan/img/papandayan-cvr.jpeg",
    coverFallback: "galeri/gunung-papandayan/img/papandayan-cvr.jpeg",
    atribusi: "Foto Gunung Papandayan oleh RonyPS, Wikimedia Commons, CC BY-SA 4.0.",
    deskripsi: "Gunung Papandayan adalah gunung api strato aktif di Kabupaten Garut yang sangat ramah bagi semua kalangan pendaki. Terkenal dengan keunikan lanskap Kawah Mas yang aktif, eksotisme Hutan Mati berbatang cantigi hitam, dan padang edelweiss abadi di Tegal Alun.",
    deskripsiTambahan: "Pilihan terbaik untuk pendakian santai, camping keluarga, dan fotografi lanskap vulkanik yang dramatis.",
    tingkatKesulitan: "Mudah (Ramah Pemula)",
    estimasiWaktu: "3 - 5 Jam",
    suhuPuncak: "10°C - 18°C",
    jalurPendakian: [
      { nama: "Jalur Cisurupan (Utama)", waktu: "3 - 4 Jam", status: "Fasilitas Lengkap" },
      { nama: "Jalur Pangalengan", waktu: "5 - 6 Jam", status: "Jalur Hutan Alami" }
    ],
    tags: ["Jawa Barat", "Garut", "2.665 Mdpl", "Ramah Pemula", "Hutan Mati", "Padang Edelweiss"],
    media: [
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (1).jpeg", title: "Pos 3", category: "image", desc: "Area Istirahat Pertama." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (2).jpeg", title: "Sunrise Spot", category: "image", desc: "Pemandangan Gunung Cikuray." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (3).jpeg", title: "Gerbang Pendakian", category: "image", desc: "Gapura pendakian Papandayan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (4).jpeg", title: "Hamparan Edelweiss Tegal Alun", category: "image", desc: "Padang bunga abadi terluas dan terindah di Jawa Barat." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (5).jpeg", title: "Sunrise Spot", category: "image", desc: "Momen matahari terbit spektakuler menyinari lembah Garut dari gardu pandang." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (6).jpeg", title: "Sunrise Spot", category: "image", desc: "Pemandangan Gunung Cikuray." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (7).jpeg", title: "Pohon Cantigi", category: "image", desc: "berdiri di tengah jalur yang diapit pohon cantigi yang berlekuk." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (8).jpeg", title: "Suasana Pagi Hutan Mati", category: "image", desc: "Kabut tipis sejuk menyelimuti Area pendaki saat fajar." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (9).jpeg", title: "Area Tebing", category: "image", desc: "memotret atau merekam aktivitas kawah aktif yang berasap di kejauhan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (10).jpeg", title: "Area Camp", category: "image", desc: "Berfoto dengan latar belakang lanskap gunung yang luas dan kawah aktif yang mengeluarkan uap putih." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (11).jpeg", title: "Area Hutan Mati", category: "image", desc: "Berfoto dengan teman di Hutan Mati." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (12).jpeg", title: "Area Hutan Mati", category: "image", desc: "Berfoto dengan teman di Hutan Mati" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (13).jpeg", title: "Trek menuju Hutan Mati", category: "image", desc: "Momen petualangan menyusuri medan Papandayan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (14).jpeg", title: "Area Hutan Mati", category: "image", desc: "Foto bersama di Hutan Mati." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (15).jpeg", title: "Warung Nasi Goreng", category: "image", desc: "Makan Nasi Goreng sebelum Muncak, daerah Wanaraja." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (16).jpeg", title: "Warung Nasi Goreng", category: "image", desc: "Makan Nasi Goreng sebelum Muncak, daerah Wanaraja." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (17).jpeg", title: "Area Camp", category: "image", desc: "Istirahat menunggu sunrise di area Camp." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (18).jpeg", title: "Spot Tebing Karang Kawah", category: "image", desc: "Titik pengamatan dengan sudut pandang lanskap kawah secara luas." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (19).jpeg", title: "Menjelajahi Hutan Mati", category: "image", desc: "berdiri di antara pepohonan kering yang menjadi ciri khas kawasan Hutan Mati Gunung Papandayan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (20).jpeg", title: "Di Tengah Vegetasi Papandayan", category: "image", desc: "dengan latar tumbuhan khas dataran tinggi dan perbukitan hijau Gunung Papandayan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (21).jpeg", title: "Kuncup Bunga Edelweiss Abadi", category: "image", desc: "Flora khas pegunungan yang dilindungi dan tumbuh subur di Tegal Alun." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (22).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (23).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (24).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (25).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (26).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (27).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (28).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (29).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (30).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (31).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (32).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (33).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (34).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (35).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (36).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (37).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (38).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (39).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (40).jpeg" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan (41).jpeg" },
      { type: "video", src: "galeri/gunung-papandayan/img/vid-01.mp4", title: "Barca", category: "video", desc: "Hutan Mati dan Barca." }
    ]
  },

  "gunung-sagara": {
    id: "gunung-sagara",
    slug: "sagara",
    nama: "Gunung Sagara",
    lokasi: "Garut, Jawa Barat",
    region: "Jawa Barat",
    mdpl: 2132,
    mdplText: "2.132 Mdpl",
    lat: -7.220583,
    lng: 108.057306,
    cover: "galeri/gunung-sagara/img/sagara-cover.jpg",
    coverFallback: "galeri/gunung-sagara/img/sagara-cover.jpg",
    atribusi: "Foto Gunung Sagara/Talaga Bodas oleh Rangga Prawira, Wikimedia Commons, CC BY-SA 4.0.",
    deskripsi: "Gunung Sagara berada di kawasan timur Garut, menyuguhkan pemandangan menakjubkan yang menghadap langsung ke kawah dan danau belerang toska Talaga Bodas. Ketinggiannya yang moderat membuatnya sangat populer untuk pendakian tektok maupun camping akhir pekan.",
    deskripsiTambahan: "Pemandangan air danau berwarna hijau toska yang berkilau di bawah sinar matahari dari atas tebing puncak Sagara menjadi daya tarik utamanya.",
    tingkatKesulitan: "Menengah",
    estimasiWaktu: "3 - 4 Jam",
    suhuPuncak: "12°C - 20°C",
    jalurPendakian: [
      { nama: "Jalur Tajur", waktu: "3 - 4 Jam", status: "Jalur Resmi" },
      { nama: "Jalur Sukahurip", waktu: "4 Jam", status: "Jalur Alternatif Alami" }
    ],
    tags: ["Jawa Barat", "Garut", "2.132 Mdpl", "View Talaga Bodas", "Sunrise Spot", "Fotogenik"],
    media: [
      { type: "image", src: "galeri/gunung-sagara/img/mt-sagara (1).jpeg", title: "Gerbang Pendakian", category: "image", desc: "Gerbang pendakian gunung sagara." },
      { type: "image", src: "galeri/gunung-sagara/img/mt-sagara (2).jpeg", title: "Trek", category: "image", desc: "Trek vegetasi kebun." },
      { type: "image", src: "galeri/gunung-sagara/img/mt-sagara (3).jpeg", title: "Puncak Sagara", category: "image", desc: "Puncak sagara dengan view Talaga Bodas." },
      { type: "image", src: "galeri/gunung-sagara/img/mt-sagara (4).jpeg", title: "Puncak Sagara", category: "image", desc: "Puncak sagara dengan view Talaga Bodas." },
      { type: "image", src: "galeri/gunung-sagara/img/mt-sagara (5).jpeg", title: "Puncak Sagara", category: "image", desc: "Puncak sagara dengan view Talaga Bodas." },
      { type: "image", src: "galeri/gunung-sagara/img/mt-sagara (6).jpeg", title: "Puncak Sagara", category: "image", desc: "Puncak sagara dengan view Talaga Bodas." },
      { type: "image", src: "galeri/gunung-sagara/img/mt-sagara (7).jpeg", title: "Puncak Sagara", category: "image", desc: "Puncak sagara dengan view Talaga Bodas." },
      { type: "image", src: "galeri/gunung-sagara/img/mt-sagara (8).jpeg", title: "Trek", category: "image", desc: "Trek vegetasi kebun." },
      { type: "image", src: "galeri/gunung-sagara/img/mt-sagara (9).jpeg", title: "Trek", category: "image", desc: "Trek vegetasi kebun." }
    ]
  },

  "gunung-slamet": {
    id: "gunung-slamet",
    slug: "slamet",
    nama: "Gunung Slamet",
    lokasi: "Jawa Tengah (Purbalingga, Banyumas, dkk)",
    region: "Jawa Tengah",
    mdpl: 3432,
    mdplText: "3.432 Mdpl",
    lat: -7.2390,
    lng: 109.2201,
    cover: "galeri/gunung-slamet/img/cvr-slamet.jpeg",
    coverFallback: "galeri/gunung-slamet/img/cvr-slamet.jpeg",
    atribusi: "Foto Gunung Slamet oleh wowo_s, Wikimedia Commons, CC BY 3.0.",
    deskripsi: "Gunung Slamet adalah gunung tertinggi di Jawa Tengah dan tertinggi kedua di Pulau Jawa setelah Gunung Semeru. Memiliki kawah aktif raksasa Segoro Wedi dengan medan pasir dan bebatuan vulkanik yang sangat menantang ketahanan mental dan fisik pendaki.",
    deskripsiTambahan: "Dikenal sebagai Atap Jawa Tengah, puncak Slamet menyajikan sensasi berada di atas samudera awan yang sangat luas membentang.",
    tingkatKesulitan: "Menantang / Ekstrem",
    estimasiWaktu: "8 - 12 Jam",
    suhuPuncak: "3°C - 10°C",
    jalurPendakian: [
      { nama: "Jalur Bambangan (Purbalingga)", waktu: "8 - 10 Jam", status: "Jalur Resmi" },
      { nama: "Jalur Dipajaya (Pemalang)", waktu: "8 - 9 Jam", status: "Jalur Favorit" },
      { nama: "Jalur Guci (Tegal)", waktu: "10 - 12 Jam", status: "Pemandian Air Panas" },
      { nama: "Jalur Kaliwadas (Brebes)", waktu: "10 Jam", status: "Hutan Tropis" }
    ],
    tags: ["Jawa Tengah", "3.432 Mdpl", "Atap Jawa Tengah", "Kawah Segoro Wedi", "Suhu Dingin", "Jalur Ekstrem"],
    media: [
      { type: "image", src: "galeri/gunung-slamet/img/01.jpeg" },
      { type: "video", src: "galeri/gunung-slamet/img/01.mp4" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-atas (1).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-atas (2).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-atas (3).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-atas (4).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-atas (5).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-atas (7).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-atas (8).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-atas (9).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (1).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (2).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (3).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (4).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (5).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (6).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (7).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (8).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (9).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (10).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (11).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (12).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (13).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (14).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (15).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (16).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (17).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (18).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (19).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (20).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (21).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (22).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (23).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (24).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (25).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (26).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (27).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (28).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (29).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (30).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (31).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (32).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (33).jpeg" },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-tengah (34).jpeg" }
    ]
  },

  "gunung-tampomas": {
    id: "gunung-tampomas",
    slug: "tampomas",
    nama: "Gunung Tampomas",
    lokasi: "Sumedang, Jawa Barat",
    region: "Jawa Barat",
    mdpl: 1684,
    mdplText: "1.684 Mdpl",
    lat: -6.7637,
    lng: 107.9606,
    cover: "galeri/gunung-tampomas/img/tampomas-cover.jpg",
    coverFallback: "galeri/gunung-tampomas/img/tampomas-cover.jpg",
    atribusi: "Foto Gunung Tampomas oleh Hamdan Suryana, Wikimedia Commons, CC BY-SA 4.0.",
    deskripsi: "Gunung Tampomas adalah gunung yang tenang dan asri di Kabupaten Sumedang. Di puncaknya terdapat area bebatuan vulkanik besar yang dikenal dengan nama Sanghyang Taraje. Pemandangannya memberikan sudut pandang 360 derajat ke seluruh lanskap Sumedang dan sekitarnya.",
    deskripsiTambahan: "Sangat bersahabat untuk pendakian santai singkat (tektok 1 hari), belajar mendaki bagi pemula, atau tempat melepas penat di akhir pekan.",
    tingkatKesulitan: "Mudah - Sedang",
    estimasiWaktu: "2.5 - 4 Jam",
    suhuPuncak: "15°C - 23°C",
    jalurPendakian: [
      { nama: "Jalur Narimbang (Conggeang)", waktu: "2.5 - 3.5 Jam", status: "Dekat Curug Ciputrawangi" },
      { nama: "Jalur Cibeureum", waktu: "3 - 4 Jam", status: "Akses Mudah Kota" },
      { nama: "Jalur Buahdua", waktu: "3 - 4 Jam", status: "Jalur Asri" }
    ],
    tags: ["Jawa Barat", "Sumedang", "1.684 Mdpl", "Sanghyang Taraje", "Ramah Tektok", "Hutan Pinus"],
    media: [
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-1.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-2.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-3.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-4.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-5.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-6.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-7.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-8.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-9.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-10.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-11.jpeg" },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-12.jpeg" }
    ]
  }
};

const LIST_GUNUNG = Object.values(DATA_GUNUNG);

function getGunungById(idOrSlug) {
  if (!idOrSlug) return null;
  const clean = idOrSlug.toLowerCase().trim();
  if (DATA_GUNUNG[clean]) return DATA_GUNUNG[clean];
  
  return LIST_GUNUNG.find(g => 
    g.id.toLowerCase() === clean || 
    g.slug.toLowerCase() === clean ||
    g.id.replace("gunung-", "") === clean ||
    g.nama.toLowerCase().includes(clean)
  ) || null;
}

/**
 * Helper fungsi untuk menyelesaikan URL path gambar / video secara otomatis,
 * baik saat halaman dibuka dari root (index.html) maupun dari subfolder (galeri/index.html).
 */
function resolveAssetPath(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  
  // Bersihkan awalan ../ atau ./ atau /
  const clean = path.replace(/^(\.\.\/)+/, "").replace(/^(\.\/)+/, "").replace(/^\/+/, "");
  
  // Cek apakah halaman saat ini berada di dalam subfolder seperti galeri/
  const pathName = window.location.pathname.toLowerCase();
  const isSubfolder = pathName.includes("/galeri/") || 
                      pathName.endsWith("/galeri") || 
                      window.location.href.includes("/galeri/");
  
  if (isSubfolder) {
    return "../" + clean;
  }
  return clean;
}
