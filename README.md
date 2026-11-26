# SERAYA — Landing Page & Katalog Skincare

Situs statis untuk merek skincare fiktif **SERAYA**: satu landing page dan enam halaman detail produk.
Dibangun dengan HTML, CSS, dan JavaScript murni — tanpa framework, tanpa build step, tanpa dependency.

Referensi layout: `docs/reference/design/publik.jpg`.

---

## Fitur

- **Landing page** dengan bagian Produk, Manfaat, Testimoni, Promo, FAQ, dan Kontak.
- **Enam halaman detail produk** dalam satu file (`produk.html`) yang dipilih lewat query string.
- **Navigasi mobile** (menu full-screen, tutup dengan Escape, kunci scroll body).
- **Header sticky** yang berubah saat halaman digulir.
- **Animasi scroll** memakai CSS scroll-driven animation (`animation-timeline: view()`), dengan fallback `IntersectionObserver` untuk browser yang belum mendukung.
- **Aksesibilitas**: skip link, landmark, `aria-expanded` pada menu & FAQ, fokus terlihat, target sentuh 44px.
- **Responsif** dari 320px sampai 1440px+, tanpa overflow horizontal.
- **Tombol WhatsApp mengambang** dan tautan pemesanan per produk dengan pesan terisi otomatis.
- Menghormati `prefers-reduced-motion: reduce` (animasi dimatikan).

---

## Struktur

```
.
├── index.html                  # Landing page
├── produk.html                 # Detail produk (6 artikel, dipilih via ?p=)
├── favicon.svg
├── publik.jpg                  # Referensi layout asli
├── assets/
│   ├── css/styles.css          # Semua styling, token warna, animasi
│   ├── js/main.js              # Menu, FAQ, switcher produk, reveal fallback
│   └── img/                    # Foto produk, hero, avatar, CTA
└── docs/
    └── reference/
        └── design/
            └── publik.jpg      # Salinan referensi layout
```

---

## Menjalankan

Tidak perlu instalasi. Buka `index.html` langsung di browser, atau jalankan server statis lokal:

```bash
# Node.js
npx serve .

# Python 3
python -m http.server 4173
```

Lalu buka `http://localhost:4173` (atau port yang ditampilkan).

---

## Halaman Produk

`produk.html` berisi enam artikel produk; JavaScript menampilkan satu berdasarkan parameter `p`:

| URL | Produk | Harga demo |
|---|---|---|
| `produk.html?p=cleanser` | Gentle Cleanser Amino | Rp 119.000 |
| `produk.html?p=toner` | Hydrating Toner Essence | Rp 129.000 |
| `produk.html?p=serum` | Serum Vitamin C 10% | Rp 189.000 |
| `produk.html?p=pelembap` | Pelembap Barrier | Rp 159.000 |
| `produk.html?p=sunscreen` | Sunscreen Glow SPF 50 PA++++ | Rp 149.000 |
| `produk.html?p=body-oil` | Body Oil Jeruk Nipis | Rp 139.000 |

Tanpa parameter atau dengan nilai tidak dikenal, halaman menampilkan Serum Vitamin C 10%.
Saat produk berganti, judul dokumen, breadcrumb, dan meta description ikut diperbarui.
Bagian "Lengkapi rutinitas" menampilkan tiga produk lain (bukan produk yang sedang dibuka).

---

## Design System

| Token | Nilai | Fungsi |
|---|---|---|
| `--bg` | `#fdf7f4` | Latar utama (blush cream) |
| `--bg-2` | `#f8ece7` | Latar bagian alternatif |
| `--surface` | `#f4e3dd` | Kartu, blok media |
| `--ink` | `#2b2024` | Teks utama |
| `--ink-2` | `#6d5a60` | Teks sekunder |
| `--line` | `#e6d2cb` | Garis & border |
| `--accent` | `#9c3f5b` | Aksen rose plum |
| `--accent-dark` | `#7b2f47` | Hover & teks aksen |
| `--cream` | `#fff9f6` | Teks di atas aksen |

- **Tipografi**: Fraunces (judul) + Manrope (isi), dimuat dari Google Fonts.
- **Radius & spacing**: variabel CSS di `:root` pada `assets/css/styles.css`.
- Semua warna teks sudah dicek kontrasnya terhadap latar (WCAG AA).

---

## Animasi Scroll

- Elemen dengan `.section-head`, `.product`, `.pdp__info > *`, dan sejenisnya memudar + naik 22px saat masuk viewport.
- Chrome/Edge memakai `animation-timeline: view()` (berjalan di compositor).
- Browser lain memakai fallback `IntersectionObserver` yang hanya aktif bila `animation-timeline` tidak didukung.
- Animasi memakai properti `translate`, bukan `transform`, agar efek hover pada kartu tetap bekerja.

---

## Data Demo — Wajib Diganti Sebelum Produksi

Halaman ini masih berisi data contoh:

- Harga, jumlah ulasan, dan rating semua produk.
- Nomor BPOM (`123456789`, ditampilkan dengan garis putus-putus sebagai penanda placeholder).
- Testimoni dan nama pelanggan.
- Alamat email `halo@seraya.example`.
- Tanggal promo dan tautan Instagram.
- Nomor WhatsApp `081384634526` — ganti dengan nomor bisnis resmi.

Klaim produk (vegan, dermatology-tested, 0% alkohol, dan sejenisnya) belum diverifikasi dan perlu persetujuan pemilik merek sebelum dipublikasikan.

---

## Kredit

Foto: [Unsplash](https://unsplash.com) dan [Pexels](https://www.pexels.com), dipakai sebagai pengganti sementara.
Ganti dengan foto produk sendiri sebelum rilis.

## Lisensi

Belum ditentukan.
