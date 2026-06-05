# 🕌 Web Profil Masjid Jami Kassiti

![Vue 3](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

Proyek ini adalah repositori bagian **Frontend** (Tampilan Antarmuka) untuk *website* resmi **Masjid Jami Kassiti** yang berlokasi di Perumahan Arjamukti, Desa Arjasari. Website ini dibangun untuk memenuhi kebutuhan informasi jamaah secara digital dengan desain modern, ultra-premium, dinamis, dan responsif.

Ini merupakan bagian dari proyek Kerja Praktek (KP) kolaboratif.

---

## ✨ Fitur Unggulan (Premium UI/UX)

- ⛅ **Simulasi Cuaca & Langit Dinamis**: Integrasi dengan *Open-Meteo API* untuk mendeteksi cuaca lokal secara otomatis. Menampilkan efek hujan deras, badai petir, hingga kabut secara visual langsung di latar belakang jadwal sholat.
- 🌙 **Fase Bulan & Kalender Hijriah**: Terkoneksi dengan *Aladhan API* untuk menyajikan penanggalan Hijriah serta mengubah bentuk fase bulan (sabit, separuh, purnama) secara presisi sesuai kalender Islam.
- 🕌 **Animasi & Transisi Tingkat Lanjut (GSAP)**: Pengalaman visual mewah (*wow factor*) mulai dari *Loading Screen* bersinkronisasi tinggi, efek paralaks, elemen mengambang, hingga *micro-interactions* yang sangat halus di seluruh komponen.
- 🕒 **Jadwal Sholat Waktu Nyata**: Menampilkan jadwal sholat dengan *countdown timer* akurat. Animasi objek langit (matahari/bulan) dan warna langit (fajar, siang, senja, malam) bergeser perlahan secara *real-time* mengikuti jarum jam.
- 💎 **Estetika Glassmorphism & Dark Mode**: Menggunakan desain tembus pandang (*frosted glass*) dengan palet warna gelap yang elegan, menonjolkan kesan profesional dan mahal.
- 📊 **Statistik Kemakmuran Masjid**: Modul *footer* dinamis yang memvisualisasikan kapasitas masjid, frekuensi kajian rutin, serta jumlah jamaah/mustahik yang telah terbantu.
- 📱 **100% Responsif**: Tata letak yang beradaptasi dengan sempurna dan tetap cantik di layar HP, Tablet, maupun PC.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animasi & Paralaks**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- **Ikonografi**: [Lucide Vue](https://lucide.dev/)
- **Data Eksternal**: Open-Meteo API (Cuaca), Aladhan API (Waktu Sholat)

---

## 💻 Cara Menjalankan Proyek Secara Lokal

Pastikan Anda sudah menginstal **Node.js** di komputer Anda sebelum menjalankan langkah-langkah di bawah ini.

### 1. Kloning Repositori
Silakan buka terminal (Command Prompt/Powershell) dan jalankan perintah berikut:
```bash
git clone https://github.com/ndiecyber/WebDKM.git
cd WebDKM
```

### 2. Instalasi Dependensi (Library)
Unduh seluruh paket yang dibutuhkan oleh proyek ini:
```bash
npm install
```

### 3. Jalankan Server Lokal (Development)
Untuk melihat tampilan website saat dalam proses pengembangan:
```bash
npm run dev
```
Setelah itu, buka tautan `http://localhost:5173` di peramban (browser) Anda.

### 4. Build untuk Produksi (Production)
Jika kode sudah siap untuk di-hosting atau di-deploy ke server sesungguhnya:
```bash
npm run build
```
File hasil *build* akan tersimpan di dalam folder `dist/`.

---

## 👥 Tim Pengembang

Proyek Sistem Informasi Masjid (Sistem DKM) ini dikembangkan oleh:
- **Muhammad Ikhsan Fauzi** - *Frontend Developer (WebDKM)*
- **Pandu Dwi** - *Backend Developer Keuangan (BackendDKM)*
- **Rhafi Decul** - *Frontend Developer Tabungan Qurban*

> *Proyek Kerja Praktek (KP) 2026*
