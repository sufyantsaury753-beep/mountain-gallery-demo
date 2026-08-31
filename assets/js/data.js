/**
 * DATA MASTER MOUNTAIN GALLERY DEMO
 * 21 Gunung Pilihan di Pulau Jawa (Jawa Barat, Jawa Tengah, Jawa Timur)
 * 100% Standalone - Berjalan langsung tanpa server/database luar.
 */

const DEFAULT_DEMO_DATA = {
  "gunung-gede": {
    "id": "gunung-gede",
    "slug": "gede",
    "nama": "Gunung Gede",
    "lokasi": "Cianjur / Sukabumi / Bogor, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 2958,
    "mdplText": "2.958 Mdpl",
    "lat": -6.7833,
    "lng": 106.9833,
    "cover": "https://images.unsplash.com/photo-1574950578143-858c6fc58922?w=1200&q=85",
    "deskripsi": "Gunung Gede adalah salah satu gunung paling legendaris dan favorit di Taman Nasional Gunung Gede Pangrango (TNGGP). Terkenal dengan pesona Alun-Alun Suryakencana yang dihiasi padang bunga edelweiss abadi seluas 50 hektar dan panorama kawah aktif yang dramatis.",
    "deskripsiTambahan": "Destinasi pendakian terpopuler di Jawa Barat dengan fasilitas pos yang tertata rapi dan kanopi hutan hujan tropis yang asri.",
    "tingkatKesulitan": "Sedang",
    "estimasiWaktu": "6 - 9 Jam",
    "suhuPuncak": "5°C - 12°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Cibodas (Utama)",
        "waktu": "6 - 7 Jam",
        "status": "Jalur Favorit & Air Terjun Cibeureum"
      },
      {
        "nama": "Jalur Gunung Putri",
        "waktu": "5 - 6 Jam",
        "status": "Jalur Tercepat ke Surya Kencana"
      },
      {
        "nama": "Jalur Selabintana (Sukabumi)",
        "waktu": "9 - 11 Jam",
        "status": "Jalur Terpanjang & Petualangan Hutan Rapat"
      }
    ],
    "tags": [
      "Jawa Barat",
      "2.958 Mdpl",
      "Surya Kencana",
      "Edelweiss",
      "TNGGP",
      "Taman Nasional"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1574950578143-858c6fc58922?w=1200&q=85",
        "title": "Lembah Alun-Alun Suryakencana",
        "category": "image",
        "desc": "Hamparan padang bunga edelweiss abadi yang membentang luas di ketinggian 2.750 mdpl."
      },
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=85",
        "title": "Panorama Kawah Ratu & Kawah Wadon",
        "category": "image",
        "desc": "Kawah vulkanik aktif Gunung Gede dengan hembusan asap belerang."
      },
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "title": "Sunrise di Puncak Gunung Gede",
        "category": "image",
        "desc": "Cahaya fajar menyinari siluet kerucut Gunung Pangrango di kejauhan."
      }
    ]
  },
  "gunung-pangrango": {
    "id": "gunung-pangrango",
    "slug": "pangrango",
    "nama": "Gunung Pangrango",
    "lokasi": "Bogor / Cianjur / Sukabumi, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 3019,
    "mdplText": "3.019 Mdpl",
    "lat": -6.77,
    "lng": 106.9633,
    "cover": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85",
    "deskripsi": "Gunung Pangrango merupakan puncak tertinggi kedua di Jawa Barat setelah Gunung Ciremai. Memiliki puncak bernama Puncak Mandalawangi yang diabadikan oleh aktivis Soe Hok Gie dalam puisinya yang terkenal tentang keindahan dan keheningan lembah Mandalawangi.",
    "deskripsiTambahan": "Jalur pendakian yang menantang dengan suasana hutan lumut purba yang magis dan damai.",
    "tingkatKesulitan": "Menantang",
    "estimasiWaktu": "7 - 10 Jam",
    "suhuPuncak": "4°C - 10°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Cibodas via Kandang Badak",
        "waktu": "7 - 8 Jam",
        "status": "Jalur Utama & Pos Kandang Badak"
      },
      {
        "nama": "Jalur Gunung Putri",
        "waktu": "8 - 9 Jam",
        "status": "Tanjakan Curam & Hutan Lebat"
      }
    ],
    "tags": [
      "Jawa Barat",
      "3.019 Mdpl",
      "Lembah Mandalawangi",
      "Soe Hok Gie",
      "Hutan Lumut"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85",
        "title": "Keheningan Lembah Mandalawangi",
        "category": "image",
        "desc": "Padang edelweiss tenang tempat peristirahatan jiwa di balik puncak Pangrango."
      },
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85",
        "title": "Hutan Lumut Pegunungan",
        "category": "image",
        "desc": "Pepohonan tua berselimut lumut tebal yang khas di jalur atas Pangrango."
      }
    ]
  },
  "gunung-salak": {
    "id": "gunung-salak",
    "slug": "salak",
    "nama": "Gunung Salak",
    "lokasi": "Bogor / Sukabumi, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 2211,
    "mdplText": "2.211 Mdpl",
    "lat": -6.7167,
    "lng": 106.7333,
    "cover": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
    "deskripsi": "Gunung Salak berasal dari bahasa Sanskerta Salaka yang berarti perak. Terkenal sebagai salah satu gunung paling menantang dan mistis di Jawa Barat dengan kerapatan vegetasi hutan hujan lebat, jalur terjal berakar, dan Kawah Ratu yang megah.",
    "deskripsiTambahan": "Dikenal sebagai laboratorium botani alam dan medan uji fisik sejati bagi para pecinta petualangan rimba.",
    "tingkatKesulitan": "Sangat Menantang",
    "estimasiWaktu": "6 - 8 Jam",
    "suhuPuncak": "12°C - 18°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Pasir Reungit (Kawah Ratu)",
        "waktu": "4 - 5 Jam",
        "status": "Menuju Kawah Ratu"
      },
      {
        "nama": "Jalur Cimelati (Cicurug)",
        "waktu": "6 - 7 Jam",
        "status": "Jalur Tercepat ke Puncak Salak 1"
      },
      {
        "nama": "Jalur Cidahu (Sukabumi)",
        "waktu": "7 - 8 Jam",
        "status": "Jalur Resmi Taman Nasional"
      }
    ],
    "tags": [
      "Jawa Barat",
      "2.211 Mdpl",
      "Kawah Ratu",
      "Hutan Hujan",
      "Petualangan Rimba"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
        "title": "Lanskap Kawah Ratu",
        "category": "image",
        "desc": "Kawah belerang aktif yang dikelilingi aliran sungai hangat dan hutan pegunungan."
      },
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1511497584788-87676104235f?w=1200&q=85",
        "title": "Vegetasi Rimbun Gunung Salak",
        "category": "image",
        "desc": "Kanopi hijau alami yang lebat dan asri khas Gunung Salak."
      }
    ]
  },
  "gunung-ciremai": {
    "id": "gunung-ciremai",
    "slug": "ciremai",
    "nama": "Gunung Ciremai",
    "lokasi": "Kuningan / Majalengka, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 3078,
    "mdplText": "3.078 Mdpl",
    "lat": -6.8925,
    "lng": 108.4058,
    "cover": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=85",
    "deskripsi": "Gunung Ciremai adalah gunung tertinggi dan atap tertinggi di Provinsi Jawa Barat dengan ketinggian 3.078 mdpl. Memiliki kawah ganda yang spektakuler (Kawah Barat dan Kawah Timur) serta panorama 360 derajat Laut Jawa di utara dan Samudra Hindia di selatan.",
    "deskripsiTambahan": "Tersedia tangga jalur Linggarjati yang melegenda serta jalur Apuy yang populer dengan keindahan matahari terbitnya.",
    "tingkatKesulitan": "Menantang",
    "estimasiWaktu": "7 - 10 Jam",
    "suhuPuncak": "4°C - 10°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Apuy (Majalengka)",
        "waktu": "6 - 8 Jam",
        "status": "Jalur Favorit & Relatif Teratur"
      },
      {
        "nama": "Jalur Palutungan (Kuningan)",
        "waktu": "7 - 9 Jam",
        "status": "Jalur Landai & Sumber Air Melimpah"
      },
      {
        "nama": "Jalur Linggarjati (Kuningan)",
        "waktu": "9 - 12 Jam",
        "status": "Jalur Terberat Tanjakan Bapa Tere"
      }
    ],
    "tags": [
      "Jawa Barat",
      "Atap Jabar",
      "3.078 Mdpl",
      "Kawah Ganda",
      "Sunrise Spot"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=85",
        "title": "Kawah Raksasa Ciremai",
        "category": "image",
        "desc": "Kawah ganda kaldera aktif dengan panorama spektakuler di atap Jawa Barat."
      },
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&q=85",
        "title": "Sunrise Atap Jawa Barat",
        "category": "image",
        "desc": "Samudra awan menakjubkan saat mentari terbit menyinari pulau Jawa."
      }
    ]
  },
  "gunung-cikuray": {
    "id": "gunung-cikuray",
    "slug": "cikuray",
    "nama": "Gunung Cikuray",
    "lokasi": "Garut, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 2821,
    "mdplText": "2.821 Mdpl",
    "lat": -7.3226,
    "lng": 107.8599,
    "cover": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85",
    "deskripsi": "Gunung Cikuray merupakan gunung tertinggi di Kabupaten Garut dengan puncak kerucut sempurna setinggi 2.821 mdpl. Terkenal dengan jalur tanjakan tanpa ampun tanpa bonus datar serta lautan samudra awan 360 derajat terbaik di Jawa Barat.",
    "deskripsiTambahan": "Gardu pandang puncak dan sunrise emas di atas lautan awan menjadi impian setiap pendaki.",
    "tingkatKesulitan": "Menantang",
    "estimasiWaktu": "6 - 8 Jam",
    "suhuPuncak": "8°C - 14°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Pemancar (Dayeuhmamat)",
        "waktu": "6 - 7 Jam",
        "status": "Jalur Terpopuler & Basecamp Luas"
      },
      {
        "nama": "Jalur Bayongbong",
        "waktu": "7 - 8 Jam",
        "status": "Jalur Terjal & Penuh Tantangan"
      },
      {
        "nama": "Jalur Cikajang (Kebun Teh)",
        "waktu": "7 - 8 Jam",
        "status": "Melewati Hamparan Perkebunan Teh"
      }
    ],
    "tags": [
      "Jawa Barat",
      "Garut",
      "2.821 Mdpl",
      "Samudra Awan",
      "Kerucut Sempurna"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85",
        "title": "Lautan Samudra Awan Cikuray",
        "category": "image",
        "desc": "Gugusan awan putih bagai permadani menyelimuti tanah Priangan."
      }
    ]
  },
  "gunung-papandayan": {
    "id": "gunung-papandayan",
    "slug": "papandayan",
    "nama": "Gunung Papandayan",
    "lokasi": "Garut, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 2665,
    "mdplText": "2.665 Mdpl",
    "lat": -7.319,
    "lng": 107.731,
    "cover": "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=85",
    "deskripsi": "Gunung Papandayan adalah gunung api strato aktif di Garut yang ramah pemula dan keluarga. Memiliki keunikan lanskap Kawah Mas yang mengepulkan asap belerang, eksotisme Hutan Mati berbatang cantigi hitam, dan padang edelweiss abadi Tegal Alun.",
    "deskripsiTambahan": "Spot favorit camping, foto lanskap dramatis, dan wisata edukasi vulkanologi.",
    "tingkatKesulitan": "Mudah (Ramah Pemula)",
    "estimasiWaktu": "3 - 5 Jam",
    "suhuPuncak": "10°C - 18°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Cisurupan (Utama)",
        "waktu": "3 - 4 Jam",
        "status": "Fasilitas Sangat Lengkap"
      },
      {
        "nama": "Jalur Pangalengan",
        "waktu": "5 - 6 Jam",
        "status": "Jalur Alternatif Hutan Alami"
      }
    ],
    "tags": [
      "Jawa Barat",
      "Garut",
      "2.665 Mdpl",
      "Ramah Pemula",
      "Hutan Mati",
      "Tegal Alun"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=85",
        "title": "Misteri Hutan Mati Papandayan",
        "category": "image",
        "desc": "Pohon-pohon cantigi hitam berdiri eksotis di atas tanah putih vulkanik."
      }
    ]
  },
  "gunung-sagara": {
    "id": "gunung-sagara",
    "slug": "sagara",
    "nama": "Gunung Sagara",
    "lokasi": "Garut, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 2138,
    "mdplText": "2.138 Mdpl",
    "lat": -7.135,
    "lng": 108.0683,
    "cover": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
    "deskripsi": "Gunung Sagara adalah primadona baru di Kabupaten Garut dengan daya tarik utama pemandangan spektakuler Danau Talaga Bodas yang berwarna hijau toska dari puncak ketinggian 2.138 mdpl.",
    "deskripsiTambahan": "Pemandangan danau kawah berpadu dengan awan putih menjadikannya surganya fotografi alam.",
    "tingkatKesulitan": "Sedang",
    "estimasiWaktu": "3 - 4 Jam",
    "suhuPuncak": "12°C - 18°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Tajur (Sukahurip)",
        "waktu": "3 - 4 Jam",
        "status": "Jalur Resmi & Paling Terawat"
      },
      {
        "nama": "Jalur Campaka",
        "waktu": "4 - 5 Jam",
        "status": "Pemandangan Kebun & Lembah"
      }
    ],
    "tags": [
      "Jawa Barat",
      "Garut",
      "2.138 Mdpl",
      "Talaga Bodas",
      "Danau Kawah"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
        "title": "Pesona Talaga Bodas dari Sagara",
        "category": "image",
        "desc": "Danau belerang toska yang memukau terlihat sempurna dari puncak Gunung Sagara."
      }
    ]
  },
  "gunung-guntur": {
    "id": "gunung-guntur",
    "slug": "guntur",
    "nama": "Gunung Guntur",
    "lokasi": "Tarogong Kaler, Garut, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 2249,
    "mdplText": "2.249 Mdpl",
    "lat": -7.1436,
    "lng": 107.8406,
    "cover": "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1200&q=85",
    "deskripsi": "Gunung Guntur sering dijuluki Miniatur Gunung Semeru Jawa Barat karena memiliki medan tanjakan kerikil pasir berbatu yang menantang serta padang savana ilalang kuning keemasan yang menawan.",
    "deskripsiTambahan": "Memiliki 4 puncak dan curug air terjun Citiis yang menyegarkan di pos awal pendakian.",
    "tingkatKesulitan": "Menantang (Pasir Curam)",
    "estimasiWaktu": "4 - 6 Jam",
    "suhuPuncak": "12°C - 20°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Citiis (Tarogong)",
        "waktu": "4 - 5 Jam",
        "status": "Jalur Utama & Air Terjun Citiis"
      }
    ],
    "tags": [
      "Jawa Barat",
      "Garut",
      "2.249 Mdpl",
      "Miniatur Semeru",
      "Savana Ilalang"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1200&q=85",
        "title": "Tanjakan Pasir Gunung Guntur",
        "category": "image",
        "desc": "Medan pasir berbatu terbuka dengan pemandangan kota Garut di bawahnya."
      }
    ]
  },
  "gunung-patuha": {
    "id": "gunung-patuha",
    "slug": "patuha",
    "nama": "Gunung Patuha",
    "lokasi": "Ciwidey, Bandung, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 2434,
    "mdplText": "2.434 Mdpl",
    "lat": -7.1603,
    "lng": 107.4003,
    "cover": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=85",
    "deskripsi": "Gunung Patuha terkenal dengan danau vulkanik Kawah Putih yang sangat eksotis dengan air kawah berwarna putih kehijauan yang berubah sesuai cuaca dan kadar belerang.",
    "deskripsiTambahan": "Dikelilingi perkebunan teh Rancabali yang sejuk dan hutan cantigi pegunungan.",
    "tingkatKesulitan": "Mudah - Sedang",
    "estimasiWaktu": "3 - 4 Jam",
    "suhuPuncak": "8°C - 16°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Kawah Putih (Ciwidey)",
        "waktu": "2 - 3 Jam",
        "status": "Akses Mudah & Wisata Populer"
      },
      {
        "nama": "Jalur Cipanganten",
        "waktu": "4 - 5 Jam",
        "status": "Jalur Rimba Tradisional"
      }
    ],
    "tags": [
      "Jawa Barat",
      "Bandung",
      "2.434 Mdpl",
      "Kawah Putih",
      "Ciwidey",
      "Wisata Alam"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=85",
        "title": "Lanskap Kawah Putih Ciwidey",
        "category": "image",
        "desc": "Danau kawah putih kehijauan berselimut kabut sejuk khas Bandung Selatan."
      }
    ]
  },
  "gunung-tangkuban-parahu": {
    "id": "gunung-tangkuban-parahu",
    "slug": "tangkuban-parahu",
    "nama": "Gunung Tangkuban Parahu",
    "lokasi": "Subang / Lembang, Bandung Barat, Jawa Barat",
    "region": "Jawa Barat",
    "mdpl": 2084,
    "mdplText": "2.084 Mdpl",
    "lat": -6.7597,
    "lng": 107.6097,
    "cover": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&q=85",
    "deskripsi": "Gunung Tangkuban Parahu adalah gunung api aktif berbentuk perahu terbalik yang melegenda dalam cerita rakyat Sangkuriang dan Dayang Sumbi. Memiliki kawah raksasa Kawah Ratu, Kawah Domas, dan Kawah Upas.",
    "deskripsiTambahan": "Akses jalan yang sangat mudah hingga ke bibir kawah menjadikannya destinasi ikonik Jawa Barat.",
    "tingkatKesulitan": "Sangat Ramah (Wisata)",
    "estimasiWaktu": "1 - 2 Jam",
    "suhuPuncak": "14°C - 20°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Gerbang Utama Lembang / Subang",
        "waktu": "1 Jam",
        "status": "Akses Kendaraan ke Bibir Kawah"
      },
      {
        "nama": "Jalur Jayagiri (Trekking Hutan Pinus)",
        "waktu": "3 - 4 Jam",
        "status": "Trekking Hutan Pinus Asri"
      }
    ],
    "tags": [
      "Jawa Barat",
      "Bandung",
      "2.084 Mdpl",
      "Sangkuriang",
      "Kawah Ratu",
      "Wisata Legenda"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&q=85",
        "title": "Kemegahan Kawah Ratu Tangkuban Parahu",
        "category": "image",
        "desc": "Kawah raksasa vulkanik dengan struktur geologi menawan di utara Bandung."
      }
    ]
  },
  "gunung-slamet": {
    "id": "gunung-slamet",
    "slug": "slamet",
    "nama": "Gunung Slamet",
    "lokasi": "Purbalingga / Banyumas / Brebes / Pemalang / Tegal, Jawa Tengah",
    "region": "Jawa Tengah",
    "mdpl": 3428,
    "mdplText": "3.428 Mdpl",
    "lat": -7.2425,
    "lng": 109.2144,
    "cover": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
    "deskripsi": "Gunung Slamet adalah gunung tertinggi di Jawa Tengah dan gunung berapi tertinggi kedua di Pulau Jawa setelah Semeru. Memiliki kawah aktif Segoro Wedi yang sangat luas dan medan pasir terjal menuju puncak Surono.",
    "deskripsiTambahan": "Dikenal dengan vegetasi lebat dan jalur pendakian yang menuntut ketahanan fisik ekstra.",
    "tingkatKesulitan": "Sangat Menantang",
    "estimasiWaktu": "8 - 12 Jam",
    "suhuPuncak": "3°C - 9°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Bambangan (Purbalingga)",
        "waktu": "8 - 10 Jam",
        "status": "Jalur Terpopuler & Basecamp Lengkap"
      },
      {
        "nama": "Jalur Guci (Tegal)",
        "waktu": "9 - 11 Jam",
        "status": "Dekat Pemandian Air Panas Guci"
      },
      {
        "nama": "Jalur Dipajaya (Pemalang)",
        "waktu": "8 - 10 Jam",
        "status": "Jalur Alternatif Teratur"
      }
    ],
    "tags": [
      "Jawa Tengah",
      "Atap Jateng",
      "3.428 Mdpl",
      "Puncak Surono",
      "Segoro Wedi"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "title": "Puncak Surono Gunung Slamet",
        "category": "image",
        "desc": "Ketinggian 3.428 mdpl menembus lautan awan di atas tanah Jawa Tengah."
      }
    ]
  },
  "gunung-sindoro": {
    "id": "gunung-sindoro",
    "slug": "sindoro",
    "nama": "Gunung Sindoro",
    "lokasi": "Wonosobo / Temanggung, Jawa Tengah",
    "region": "Jawa Tengah",
    "mdpl": 3136,
    "mdplText": "3.136 Mdpl",
    "lat": -7.3006,
    "lng": 109.9983,
    "cover": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=85",
    "deskripsi": "Gunung Sindoro (Sundoro) adalah gunung berapi aktif di Jawa Tengah yang berdampingan anggun dengan Gunung Sumbing (Gunung Kembar Double S). Terkenal dengan padang edelweiss luas di puncak dan kawah aktif beraroma belerang.",
    "deskripsiTambahan": "Spot terbaik menyaksikan siluet segitiga raksasa Gunung Sumbing saat matahari terbit.",
    "tingkatKesulitan": "Menantang",
    "estimasiWaktu": "6 - 8 Jam",
    "suhuPuncak": "4°C - 11°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Kledung (Temanggung)",
        "waktu": "6 - 7 Jam",
        "status": "Jalur Paling Populer & Ojek Tersedia"
      },
      {
        "nama": "Jalur Ndoro Dongker / Sigedang (Wonosobo)",
        "waktu": "5 - 6 Jam",
        "status": "Melewati Kebun Teh Menawan"
      },
      {
        "nama": "Jalur Bansari",
        "waktu": "6 - 7 Jam",
        "status": "Panorama Alam Eksotis"
      }
    ],
    "tags": [
      "Jawa Tengah",
      "3.136 Mdpl",
      "Kledung",
      "Gunung Kembar",
      "Sunrise Spot"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=85",
        "title": "Lanskap Gunung Sindoro & Sumbing",
        "category": "image",
        "desc": "Keindahan gunung kembar legendaris di jantung Jawa Tengah."
      }
    ]
  },
  "gunung-sumbing": {
    "id": "gunung-sumbing",
    "slug": "sumbing",
    "nama": "Gunung Sumbing",
    "lokasi": "Wonosobo / Temanggung / Magelang, Jawa Tengah",
    "region": "Jawa Tengah",
    "mdpl": 3371,
    "mdplText": "3.371 Mdpl",
    "lat": -7.3842,
    "lng": 110.07,
    "cover": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85",
    "deskripsi": "Gunung Sumbing adalah gunung tertinggi kedua di Jawa Tengah setelah Slamet dengan ketinggian 3.371 mdpl. Terkenal dengan pesona Dusun Butuh (Nepal Van Java) di lerengnya serta kawah Segoro Banjaran yang megah.",
    "deskripsiTambahan": "Menyajikan tantangan tanjakan terjal dan panorama puncak Rajawali, Sejati, dan Buntu.",
    "tingkatKesulitan": "Menantang",
    "estimasiWaktu": "7 - 9 Jam",
    "suhuPuncak": "3°C - 10°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Garung (Wonosobo)",
        "waktu": "7 - 8 Jam",
        "status": "Jalur Legendaris & Populer"
      },
      {
        "nama": "Jalur Butuh / Nepal Van Java (Magelang)",
        "waktu": "6 - 7 Jam",
        "status": "Melewati Pemukiman Warna-Warni Ikonik"
      },
      {
        "nama": "Jalur Bowongso",
        "waktu": "7 - 8 Jam",
        "status": "Jalur Santai & Alami"
      }
    ],
    "tags": [
      "Jawa Tengah",
      "3.371 Mdpl",
      "Nepal Van Java",
      "Kawah Banjaran",
      "Puncak Rajawali"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85",
        "title": "Keagungan Puncak Sumbing",
        "category": "image",
        "desc": "Kawah kaldera luas dengan tebing-tebing batu kokoh di puncak."
      }
    ]
  },
  "gunung-prau": {
    "id": "gunung-prau",
    "slug": "prau",
    "nama": "Gunung Prau",
    "lokasi": "Dataran Tinggi Dieng, Wonosobo / Batang / Kendal, Jawa Tengah",
    "region": "Jawa Tengah",
    "mdpl": 2590,
    "mdplText": "2.590 Mdpl",
    "lat": -7.1867,
    "lng": 109.9217,
    "cover": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85",
    "deskripsi": "Gunung Prau adalah salah satu destinasi pendakian terfavorit di Indonesia yang ramah bagi pemula. Terkenal dengan panorama Sunrise Emas (Golden Sunrise) terbaik se-Asia Tenggara dan bukit teletubbies yang memanjakan mata.",
    "deskripsiTambahan": "Dari puncaknya terlihat jajaran megah Sindoro, Sumbing, Merapi, Merbabu, Slamet, dan Lawu dalam satu garis pandang.",
    "tingkatKesulitan": "Mudah (Ramah Pemula)",
    "estimasiWaktu": "3 - 4 Jam",
    "suhuPuncak": "0°C - 10°C (Bisa Embun Upas)",
    "jalurPendakian": [
      {
        "nama": "Jalur Patak Banteng (Dieng)",
        "waktu": "2.5 - 3.5 Jam",
        "status": "Jalur Tercepat & Paling Ramai"
      },
      {
        "nama": "Jalur Dieng Kulon / Kalilembu",
        "waktu": "3 - 4 Jam",
        "status": "Jalur Landai & Nyaman"
      },
      {
        "nama": "Jalur Igirmranak / Dwarawati",
        "waktu": "3.5 - 4.5 Jam",
        "status": "Jalur Hijau Alami"
      }
    ],
    "tags": [
      "Jawa Tengah",
      "Dieng",
      "2.590 Mdpl",
      "Golden Sunrise",
      "Ramah Pemula",
      "Bukit Teletubbies"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85",
        "title": "Golden Sunrise Gunung Prau",
        "category": "image",
        "desc": "Pancaran fajar emas dengan latar Gunung Sindoro dan Sumbing yang tersohor."
      }
    ]
  },
  "gunung-merapi": {
    "id": "gunung-merapi",
    "slug": "merapi",
    "nama": "Gunung Merapi",
    "lokasi": "Sleman / Magelang / Boyolali / Klaten, Jawa Tengah & DIY",
    "region": "Jawa Tengah",
    "mdpl": 2930,
    "mdplText": "2.930 Mdpl",
    "lat": -7.5408,
    "lng": 110.4458,
    "cover": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=85",
    "deskripsi": "Gunung Merapi adalah salah satu gunung api teraktif di dunia dengan sejarah vulkanik yang sangat kuat. Memiliki pesona kubah lava yang terus bertumbuh dan panorama Pasar Bubrah yang legendaris.",
    "deskripsiTambahan": "Menjadi simbol kekayaan geologi dan budaya spiritual masyarakat Jawa.",
    "tingkatKesulitan": "Menantang (Medan Vulkanik)",
    "estimasiWaktu": "4 - 6 Jam",
    "suhuPuncak": "10°C - 16°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Selo (Boyolali)",
        "waktu": "4 - 5 Jam",
        "status": "Jalur Resmi Pendakian Selo"
      }
    ],
    "tags": [
      "Jawa Tengah",
      "2.930 Mdpl",
      "Vulkanik Aktif",
      "Pasar Bubrah",
      "Selo"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=85",
        "title": "Puncak Kubah Lava Merapi",
        "category": "image",
        "desc": "Kubah lava aktif dengan lanskap bebatuan vulkanik yang dramatis."
      }
    ]
  },
  "gunung-merbabu": {
    "id": "gunung-merbabu",
    "slug": "merbabu",
    "nama": "Gunung Merbabu",
    "lokasi": "Magelang / Boyolali / Semarang, Jawa Tengah",
    "region": "Jawa Tengah",
    "mdpl": 3145,
    "mdplText": "3.145 Mdpl",
    "lat": -7.455,
    "lng": 110.44,
    "cover": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85",
    "deskripsi": "Gunung Merbabu adalah surga savana hijau pegunungan di Jawa Tengah dengan ketinggian 3.145 mdpl (Puncak Kenteng Songo & Triangulasi). Terkenal dengan hamparan padang savana berbukit-bukit yang magis dan pemandangan Gunung Merapi yang berdiri megah di depannya.",
    "deskripsiTambahan": "Salah satu gunung dengan lanskap terindah di Indonesia dan camping ground savana yang spektakuler.",
    "tingkatKesulitan": "Sedang - Menantang",
    "estimasiWaktu": "6 - 8 Jam",
    "suhuPuncak": "5°C - 12°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Selo (Boyolali)",
        "waktu": "6 - 7 Jam",
        "status": "Jalur Savana Favorit"
      },
      {
        "nama": "Jalur Suwanting (Magelang)",
        "waktu": "7 - 8 Jam",
        "status": "Jalur Menantang & View Merapi Jelas"
      },
      {
        "nama": "Jalur Thekelan / Cuntel (Semarang)",
        "waktu": "7 - 9 Jam",
        "status": "Jalur Utara Legendaris"
      }
    ],
    "tags": [
      "Jawa Tengah",
      "3.145 Mdpl",
      "Kenteng Songo",
      "Savana Hijau",
      "View Merapi"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85",
        "title": "Lembah Savana Gunung Merbabu",
        "category": "image",
        "desc": "Gundukan perbukitan hijau savana dengan latar belakang puncak Merapi."
      }
    ]
  },
  "gunung-raung": {
    "id": "gunung-raung",
    "slug": "raung",
    "nama": "Gunung Raung",
    "lokasi": "Banyuwangi / Bondowoso / Jember, Jawa Timur",
    "region": "Jawa Timur",
    "mdpl": 3344,
    "mdplText": "3.344 Mdpl",
    "lat": -8.125,
    "lng": 114.045,
    "cover": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
    "deskripsi": "Gunung Raung adalah gunung api raksasa di Jawa Timur yang terkenal memiliki kaldera terbesar kedua di Indonesia serta jalur pendakian paling ekstrem: Jembatan Shiratal Mustaqim menuju Puncak Sejati 3.344 mdpl.",
    "deskripsiTambahan": "Wajib menggunakan peralatan panjat tebing (climbing harness, helmet, rope) untuk menyeberangi igir-igir jurang maut.",
    "tingkatKesulitan": "Sangat Ekstrem (Perlu Alat Climbing)",
    "estimasiWaktu": "9 - 14 Jam",
    "suhuPuncak": "4°C - 10°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Kalibaru (Banyuwangi)",
        "waktu": "10 - 13 Jam",
        "status": "Jalur Puncak Sejati dengan Peralatan Climbing"
      },
      {
        "nama": "Jalur Sumberwringin (Bondowoso)",
        "waktu": "8 - 10 Jam",
        "status": "Menuju Bibir Kaldera"
      }
    ],
    "tags": [
      "Jawa Timur",
      "3.344 Mdpl",
      "Puncak Sejati",
      "Jembatan Shiratal Mustaqim",
      "Kaldera Raksasa",
      "Ekstrem"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
        "title": "Jembatan Shiratal Mustaqim Raung",
        "category": "image",
        "desc": "Punggung jurang sempit berbatu dengan jurang sedalam ratusan meter di kanan kirinya."
      }
    ]
  },
  "gunung-semeru": {
    "id": "gunung-semeru",
    "slug": "semeru",
    "nama": "Gunung Semeru",
    "lokasi": "Lumajang / Malang, Jawa Timur",
    "region": "Jawa Timur",
    "mdpl": 3676,
    "mdplText": "3.676 Mdpl",
    "lat": -8.1081,
    "lng": 112.9225,
    "cover": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
    "deskripsi": "Gunung Semeru dengan Puncak Mahameru adalah atap tertinggi di Pulau Jawa (3.676 mdpl). Menyimpan pesona magis Danau Ranu Kumbolo, Tanjakan Cinta, padang savana Oro-Oro Ombo yang ungu oleh bunga Verbena, dan letupan kawah Jonggring Saloko.",
    "deskripsiTambahan": "Gunung legendaris yang menjadi kiblat petualangan para pendaki tanah air.",
    "tingkatKesulitan": "Sangat Menantang",
    "estimasiWaktu": "2 - 3 Hari",
    "suhuPuncak": "-2°C - 6°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Ranu Pani (Lumajang / Malang)",
        "waktu": "2 Hari",
        "status": "Jalur Resmi via Ranu Kumbolo & Kalimati"
      }
    ],
    "tags": [
      "Jawa Timur",
      "Atap Jawa",
      "3.676 Mdpl",
      "Mahameru",
      "Ranu Kumbolo",
      "Oro-Oro Ombo"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "title": "Keheningan Danau Ranu Kumbolo",
        "category": "image",
        "desc": "Danau air tawar di ketinggian 2.400 mdpl yang menjadi surga perkemahan para pendaki."
      }
    ]
  },
  "gunung-arjuno": {
    "id": "gunung-arjuno",
    "slug": "arjuno",
    "nama": "Gunung Arjuno",
    "lokasi": "Malang / Pasuruan / Batu, Jawa Timur",
    "region": "Jawa Timur",
    "mdpl": 3339,
    "mdplText": "3.339 Mdpl",
    "lat": -7.765,
    "lng": 112.59,
    "cover": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=85",
    "deskripsi": "Gunung Arjuno adalah gunung tertinggi kedua di Jawa Timur setelah Semeru dengan ketinggian 3.339 mdpl (Puncak Ogal-Agil). Berdampingan mesra dengan Gunung Welirang dan kaya akan situs petilasan sejarah kerajaan Majapahit.",
    "deskripsiTambahan": "Menyajikan panorama padang savana Alas Lali Jiwo yang luas dan hutan cemara gunung yang asri.",
    "tingkatKesulitan": "Menantang",
    "estimasiWaktu": "8 - 11 Jam",
    "suhuPuncak": "3°C - 10°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Tretes (Pasuruan)",
        "waktu": "8 - 10 Jam",
        "status": "Jalur Terpopuler via Pos Kop-Kopan & Pondokan"
      },
      {
        "nama": "Jalur Sumber Brantas (Batu)",
        "waktu": "7 - 9 Jam",
        "status": "Jalur Lembah Lengkehan"
      },
      {
        "nama": "Jalur Lawang (Malang)",
        "waktu": "9 - 11 Jam",
        "status": "Melewati Kebun Teh Wonosari"
      }
    ],
    "tags": [
      "Jawa Timur",
      "3.339 Mdpl",
      "Puncak Ogal-Agil",
      "Alas Lali Jiwo",
      "Arjuno-Welirang"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=85",
        "title": "Puncak Ogal-Agil Arjuno",
        "category": "image",
        "desc": "Formasi batu bertumpuk alami di titik tertinggi 3.339 mdpl."
      }
    ]
  },
  "gunung-lawu": {
    "id": "gunung-lawu",
    "slug": "lawu",
    "nama": "Gunung Lawu",
    "lokasi": "Karanganyar (Jateng) / Magetan & Ngawi (Jatim)",
    "region": "Jawa Timur",
    "mdpl": 3265,
    "mdplText": "3.265 Mdpl",
    "lat": -7.6272,
    "lng": 111.1925,
    "cover": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85",
    "deskripsi": "Gunung Lawu adalah gunung suci yang berada di perbatasan Jawa Tengah dan Jawa Timur dengan ketinggian 3.265 mdpl (Puncak Hargo Dumilah). Terkenal dengan warung legendaris tertinggi di Indonesia (Warung Mbok Yem di Hargo Dalem) dan padang savana Gupakan Menjangan.",
    "deskripsiTambahan": "Dikenal memiliki energi spiritual yang kuat serta Candi Cetho dan Candi Sukuh di lerengnya.",
    "tingkatKesulitan": "Sedang",
    "estimasiWaktu": "6 - 8 Jam",
    "suhuPuncak": "2°C - 8°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Candi Cetho (Karanganyar)",
        "waktu": "7 - 8 Jam",
        "status": "Jalur Paling Indah via Savana Gupakan Menjangan"
      },
      {
        "nama": "Jalur Cemoro Sewu (Magetan)",
        "waktu": "5 - 6 Jam",
        "status": "Jalur Bebatuan Tertata & Paling Cepat"
      },
      {
        "nama": "Jalur Cemoro Kandang (Karanganyar)",
        "waktu": "6 - 7 Jam",
        "status": "Jalur Landai Tradisional"
      }
    ],
    "tags": [
      "Jawa Timur",
      "Jawa Tengah",
      "3.265 Mdpl",
      "Hargo Dumilah",
      "Mbok Yem",
      "Candi Cetho"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85",
        "title": "Savana Gupakan Menjangan Lawu",
        "category": "image",
        "desc": "Padang savana berbukit dengan telaga alami di ketinggian 2.900 mdpl."
      }
    ]
  },
  "gunung-bromo": {
    "id": "gunung-bromo",
    "slug": "bromo",
    "nama": "Gunung Bromo",
    "lokasi": "Probolinggo / Pasuruan / Lumajang / Malang, Jawa Timur",
    "region": "Jawa Timur",
    "mdpl": 2329,
    "mdplText": "2.329 Mdpl",
    "lat": -7.9425,
    "lng": 112.9531,
    "cover": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85",
    "deskripsi": "Gunung Bromo adalah destinasi wisata internasional paling ikonik di Taman Nasional Bromo Tengger Semeru. Terkenal dengan lautan pasir berbisik seluas 10 kilometer persegi, kawah aktif yang bergemuruh, upacara adat Yadnya Kasada Suku Tengger, dan panorama sunrise spektakuler dari Bukit Penanjakan.",
    "deskripsiTambahan": "Sangat mudah diakses dengan jeep 4x4, kuda, maupun berjalan kaki santai.",
    "tingkatKesulitan": "Sangat Ramah (Wisata Keluarga)",
    "estimasiWaktu": "1 - 2 Jam",
    "suhuPuncak": "5°C - 15°C",
    "jalurPendakian": [
      {
        "nama": "Jalur Cemoro Lawang (Probolinggo)",
        "waktu": "1 Jam",
        "status": "Akses Utama Wisata & View Point"
      },
      {
        "nama": "Jalur Tosari (Pasuruan)",
        "waktu": "1 Jam",
        "status": "Akses Menuju Penanjakan 1"
      },
      {
        "nama": "Jalur Wonokitri / Tumpang (Malang)",
        "waktu": "1 - 2 Jam",
        "status": "Melewati Lembah Jemplang & Savana Teletubbies"
      }
    ],
    "tags": [
      "Jawa Timur",
      "2.329 Mdpl",
      "Tengger",
      "Lautan Pasir",
      "Kawah Bromo",
      "Wisata Dunia"
    ],
    "media": [
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85",
        "title": "Lautan Pasir & Kawah Bromo",
        "category": "image",
        "desc": "Pemandangan magis kaldera Bromo Tengger saat kabut pagi menyelimuti lembah."
      }
    ]
  }
};

// Inisialisasi Local Storage
const STORAGE_KEY = "mountain_gallery_demo_db_v1";

function getStoredDemoData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Object.keys(parsed).length >= 10) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Storage error, fallback to default data:", e);
  }
  saveStoredDemoData(DEFAULT_DEMO_DATA);
  return DEFAULT_DEMO_DATA;
}

function saveStoredDemoData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch(e) {
    console.warn("Cannot write to localStorage:", e);
  }
}

function resetDemoDataToDefault() {
  saveStoredDemoData(DEFAULT_DEMO_DATA);
  return DEFAULT_DEMO_DATA;
}

// Data Gunung yang sedang aktif
const DATA_GUNUNG = getStoredDemoData();
