# Redesign Bhisa

Proyek ini merupakan implementasi aplikasi pemesanan tiket transportasi berbasis web. Dibuat menggunakan **React + Vite + TailwindCSS + DaisyUI** dan di-deploy ke **Vercel**.

## 📋 Daftar Isi

- [🎯 Demo](#-demo)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Setup Detail](#-setup-detail)

---

## 🎯 Demo

Link Deploy (Vercel): [https://redisgn-bhisa.vercel.app/](https://redisgn-bhisa.vercel.app/)

---

## 📦 Requirements

Pastikan system Anda memiliki:

| Software | Version | Required |
|----------|---------|----------|
| Node.js | v22.18 | ✅ |
| NPM | v10+ | ✅ |
| Git | Latest | ✅ |

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/ibayeye/redisgn-bhisa.git
cd redesign-bhisa
```

### 2. Setup Frontend

```bash
# Setup Frontend  
cd redesign-bhisa
npm install
```

### 3. Jalankan Aplikasi

```bash
# Terminal
cd frontend
npm run dev
```

Akses aplikasi di:
- **Frontend**: http://localhost:5173

---

## 📁 Project Structure

```
redesign-bhisa/
├── public/                # File statis (icon)
├── src/
│   ├── assets/            # Gambar/banner/icon internal
│   ├── components/        # Reusable UI components (Button, Dropdown, etc.)
│   ├── data/              # Data statis dalam bentuk JSON
│   ├── hooks/             # Custom hooks (useAlert, useCountdown, etc.)
│   ├── layout/            # Parent Components yang mendukung SPA (Navbar, Footer)
│   ├── pages/             # Halaman utama (Dashboard, PaymentSuccess, dsb.)
│   ├── sections/          # Section besar halaman (Promo, Membership, etc.)
│   ├── utils/             # Utility yang mendukung fitur (useCoupon, formatRupiah, etc.)
│   ├── App.jsx            # Routing utama
│   ├── main.jsx           # Entry point React
│   └── index.css          # Global style (Tailwind)
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Keputusan Teknis

#### 1. Framework
```bash
Menggunakan React (Vite) untuk performa lebih cepat saat dev dan build.
```

#### 2. Styling
```bash
Menggunakan TailwindCSS untuk styling cepat dan konsisten.
```

#### 3. Routing
```bash
Memakai React Router DOM untuk navigasi antar halaman.
```

#### 4. Data JSON

```bash
File kecil → ditaruh di /src/data agar bisa di-import langsung.
```
#### 5. Deployment

```bash
Menggunakan Vercel karena integrasi mudah dengan React (Vite) dan auto-deploy setiap push ke branch main
```

---

## 📌 Asumsi

1. Data (jadwal, promo, point keberangkatan/tujuan) masih dummy berbasis file JSON lokal.
Di tahap produksi, seharusnya berasal dari API backend
2. Aplikasi fokus pada alur pemesanan tiket dan UI/UX, bukan sistem pembayaran real.
3. Skeleton loader dipakai untuk meningkatkan UX saat data belum ready.
4. Responsif
    - Desktop: Filter & sort sebagai sidebar permanen.
    - Tablet/Mobile: Filter & sort sebagai drawer.
5. Buat Pull Request

---

## ✨ Fitur Utama

Jika mengalami masalah atau memiliki pertanyaan:

- Pencarian jadwal berdasarkan asal, tujuan, dan tanggal.
- Validasi agar asal ≠ tujuan.
- Alert error yang interaktif.
- Skeleton loading.
- Section promo, membership, why us, partnership, location.
- Payment success page dengan tombol Unduh E-ticket.

---
