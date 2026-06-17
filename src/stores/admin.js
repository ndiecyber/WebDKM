import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import heroImg from '@/assets/images/hero-mosque.png'
import interiorImg from '@/assets/images/mosque-interior.png'
import communityImg from '@/assets/images/community-prayer.png'
import quranImg from '@/assets/images/quran-study.png'
import exteriorImg from '@/assets/images/mosque-exterior.png'
import grandInteriorImg from '@/assets/images/mosque_grand_interior.png'
import stunningExteriorImg from '@/assets/images/mosque_stunning_exterior.png'
import kajianImg from '@/assets/images/kajian_masjid.png'
import sholatImg from '@/assets/images/sholat_jumat.png'
import sosialImg from '@/assets/images/kegiatan_sosial.png'
import malamImg from '@/assets/images/arsitektur_malam.png'
import kaligrafiImg from '@/assets/images/kaligrafi_masjid.png'

const parseSafe = (key) => {
  try {
    const val = getStorage(key)
    return val ? JSON.parse(val) : null
  } catch (e) {
    return null
  }
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    isAuthenticated: getStorage('admin_auth') === 'true',
    kegiatan: parseSafe('admin_kegiatan_v3') || [
      { id: 1, title: 'Kajian Akbar Bulanan', category: 'Kajian', description: 'Kajian ilmu agama bersama ustadz ternama membahas fiqih ibadah dan muamalah kontemporer.', image: communityImg, day: '15', month: 'Jun', time: '09:00 - 12:00', location: 'Aula Utama', badge: 'Segera' },
      { id: 2, title: 'Wisuda Santri TPA/TPQ', category: 'Pendidikan', description: 'Perayaan kelulusan para santri TPA/TPQ yang telah menyelesaikan program tahfidz dan tilawah.', image: quranImg, day: '22', month: 'Jun', time: '08:00 - 11:00', location: 'Masjid Utama', badge: null },
      { id: 3, title: 'Bakti Sosial Ramadhan', category: 'Sosial', description: 'Kegiatan bakti sosial pembagian sembako dan santunan untuk dhuafa dan yatim piatu.', image: exteriorImg, day: '01', month: 'Jul', time: '07:00 - 10:00', location: 'Halaman Masjid', badge: null },
      { id: 4, title: 'Kajian Muslimah', category: 'Kajian', description: 'Kajian khusus muslimah membahas peranan wanita dalam membangun keluarga Islami.', image: communityImg, day: '10', month: 'Jul', time: '13:00 - 15:00', location: 'Aula Lt. 2', badge: null },
      { id: 5, title: 'Pelatihan Pengurusan Jenazah', category: 'Pendidikan', description: 'Pelatihan tata cara memandikan, mengkafani, dan menyalatkan jenazah sesuai sunnah.', image: quranImg, day: '18', month: 'Jul', time: '08:30 - 11:30', location: 'Serambi Masjid', badge: null },
      { id: 6, title: 'Mabit & Qiyamullail', category: 'Ibadah', description: 'Malam bina iman dan taqwa, diisi dengan kajian, muhasabah, dan shalat malam berjamaah.', image: exteriorImg, day: '25', month: 'Jul', time: '20:00 - 04:30', location: 'Masjid Utama', badge: 'Terbatas' },
    ],
    finance: parseSafe('admin_finance') || {
      saldoAwal: '84,74',
      saldoAwalFull: '84.739.781',
      periodeAwal: 'Jumat, 29 Mei 2026',
      pemasukan: '15',
      pemasukanFull: '15.000.000',
      pengeluaran: '8',
      pengeluaranFull: '8.000.000',
      saldoAkhir: '91,74',
      saldoAkhirFull: '91.739.781',
      periodeAkhir: 'Selasa, 2 Juni 2026',
      periodeSingkat: '29 Mei - 2 Jun',
      selisihBersih: '7.000.000'
    },
    gallery: parseSafe('admin_gallery_v5') || [
      { id: 1, image: tampakMasjidImg, caption: 'Tampak Masjid', subcaption: 'Keindahan eksterior Masjid Jami Kassiti.', tag: 'Arsitektur', iconName: 'Building', date: 'Baru saja' },
      { id: 2, image: gerbangMasukPerumImg, caption: 'Gerbang Masuk', subcaption: 'Akses masuk menuju kawasan Masjid Jami Kassiti.', tag: 'Kawasan', iconName: 'MapPin', date: 'Baru saja' },
      { id: 3, image: pengajianAkbarImg, caption: 'Pengajian Akbar', subcaption: 'Momen berharga saat pelaksanaan pengajian akbar.', tag: 'Kajian', iconName: 'Users', date: 'Baru saja' },
      { id: 4, image: pesantrenRamadanImg, caption: 'Pesantren Ramadan', subcaption: 'Kegiatan mendalam mempelajari agama selama bulan suci.', tag: 'Edukasi', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 5, image: samenHaflahImg, caption: 'Samen / Haflah', subcaption: 'Perayaan dan kelulusan santri dengan penuh kegembiraan.', tag: 'Pendidikan', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 6, image: ujianMadrasahImg, caption: 'Ujian Madrasah', subcaption: 'Suasana ujian para santri madrasah dengan tertib.', tag: 'Pendidikan', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 7, image: beritaQurbanImg, caption: 'Kegiatan Qurban', subcaption: 'Pelaksanaan penyembelihan dan distribusi hewan qurban.', tag: 'Sosial', iconName: 'Users', date: 'Baru saja' },
      { id: 8, image: guruTpqImg, caption: 'Guru TPQ', subcaption: 'Para pengajar TPQ Masjid Jami Kassiti.', tag: 'Edukasi', iconName: 'Users', date: 'Baru saja' },
      { id: 9, image: seminarParentingImg, caption: 'Seminar Parenting', subcaption: 'Kegiatan seminar untuk mendidik anak sesuai sunnah.', tag: 'Kajian', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 10, image: manasikHajiImg, caption: 'Manasik Haji', subcaption: 'Pelatihan manasik haji untuk anak-anak dan warga.', tag: 'Edukasi', iconName: 'MapPin', date: 'Baru saja' },
      { id: 11, image: dtaImg, caption: 'Kegiatan DTA', subcaption: 'Pembelajaran agama di Madrasah Diniyah Takmiliyah Awaliyah.', tag: 'Pendidikan', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 12, image: pelepasanKenaikanKelasImg, caption: 'Pelepasan Santri', subcaption: 'Momen haru pelepasan dan kenaikan kelas para santri.', tag: 'Edukasi', iconName: 'Users', date: 'Baru saja' },
      { id: 13, image: ujianAnakAnakTpqImg, caption: 'Ujian Santri TPQ', subcaption: 'Suasana ujian hafalan dan bacaan santri TPQ Masjid Jami Kassiti.', tag: 'Pendidikan', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 14, image: seminarParenting2Img, caption: 'Kajian Parenting', subcaption: 'Materi pembekalan untuk mewujudkan keluarga yang harmonis dan sakinah.', tag: 'Kajian', iconName: 'Users', date: 'Baru saja' },
    ],
    layanan: parseSafe('admin_layanan_v11') || [
      { id: 1, title: 'Sholat Berjamaah', category: 'Ibadah', bgImage: tampakMasjidImg, description: 'Sholat lima waktu dan sholat Jumat berjamaah dengan imam yang berpengalaman.', iconName: 'Sholat', badge: 'Tersedia', badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800', details: { fullDescription: 'Masjid Jami Kassiti menyelenggarakan sholat berjamaah lima waktu secara rutin, dilengkapi dengan fasilitas tempat wudhu yang bersih, karpet yang nyaman, dan pendingin ruangan. Kami juga menyelenggarakan Sholat Jumat dengan khatib-khatib pilihan yang membawakan materi khutbah inspiratif dan aktual.', schedule: 'Setiap Waktu Sholat & Jumat 11.30 WIB', location: 'Ruang Utama & Lantai 2 Masjid Jami Kassiti', contact: 'DKM Masjid (Bpk. H. Irvan Ruchiat)', contactImage: dkmIrvan, requirements: ['Pakaian sopan dan menutup aurat', 'Menjaga ketertiban dan kebersihan'] } },
      { id: 2, title: 'Kajian Rutin', category: 'Pendidikan', bgImage: pengajianAkbarImg, description: 'Kajian ilmu agama setiap pekan meliputi tafsir, hadits, fiqih, dan akhlak.', iconName: 'BookOpen', badge: 'Terjadwal', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800', details: { fullDescription: 'Program kajian rutin terbuka untuk umum (Ikhwan & Akhwat) yang diisi oleh asatidzah berkompeten. Materi kajian disusun secara terstruktur mulai dari dasar hingga lanjutan, mencakup pembahasan Tafsir Al-Quran, Hadits Arbain, Fiqih Ibadah, dan Sirah Nabawiyah.', schedule: 'Rabu (Ba\'da Maghrib) & Ahad (Ba\'da Subuh)', location: 'Ruang Utama Masjid', contact: 'Divisi Dakwah (Bpk. H. Irvan Ruchiat)', contactImage: dkmIrvan, requirements: ['Membawa alat tulis (opsional)', 'Terbuka untuk umum'] } },
      { id: 3, title: 'TPQ (Taman Pendidikan Al-Qur\'an)', category: 'Pendidikan', bgImage: guruTpqImg, description: 'Program pendidikan Al-Quran untuk anak-anak dengan metode pembelajaran modern.', iconName: 'GraduationCap', badge: 'Pendaftaran Buka', badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800', details: { fullDescription: 'Taman Pendidikan Al-Quran (TPQ) Masjid Jami Kassiti mendidik generasi muda agar cinta Al-Quran. Kurikulum mencakup baca tulis Al-Quran (Metode Iqro/Tilawati), hafalan surat pendek, doa sehari-hari, praktik ibadah, dan pembentukan akhlakul karimah.', schedule: 'Senin - Kamis, 15.30 - 17.00 WIB', location: 'Ruang Kelas TPA (Lantai 2)', contact: 'Kepala TPA (Usth. Ai Jamaliah)', contactImage: usthAi, requirements: ['Usia 5 - 12 Tahun', 'Mengisi formulir pendaftaran', 'Fotokopi Akta Kelahiran'], staff: [{ name: 'Usth. Ai Jamaliah', role: 'Kepala Sekolah', image: usthAi }, { name: 'Usth. Rini Dewi Anggiani', role: 'Guru', image: usthRini }, { name: 'Usth. Dede Asiah', role: 'Guru', image: usthDede }, { name: 'Usth. Rani Rahmayati', role: 'Guru', image: usthRani }] } },
      { id: 6, title: 'DTA (Diniyah Takmiliyah Awaliyah)', category: 'Pendidikan', bgImage: dtaImg, description: 'Program pendidikan keagamaan Islam non-formal sebagai pelengkap pendidikan formal anak.', iconName: 'GraduationCap', badge: 'Pendaftaran Buka', badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800', details: { fullDescription: 'Diniyah Takmiliyah Awaliyah (DTA) Masjid Jami Kassiti menyelenggarakan pendidikan keagamaan Islam bagi anak-anak usia sekolah dasar. Program ini dirancang untuk memperkuat pemahaman agama anak di luar jam sekolah formal dengan kurikulum terpadu meliputi Aqidah, Akhlak, Fiqih Ibadah, Tarikh (Sejarah Islam), Hadits, serta praktik ibadah sehari-hari.', schedule: 'Senin - Sabtu, 15.30 - 17.00 WIB', location: 'Ruang Kelas Lantai 2 Masjid Jami Kassiti', contact: 'Kepala DTA (Usth. Neneng Aam S.M)', contactImage: usthNeneng, requirements: ['Mengisi formulir pendaftaran', 'Fotokopi Akta Kelahiran & Kartu Keluarga', 'Membayar biaya administrasi pendaftaran'], staff: [{ name: 'Usth. Neneng Aam Siti Marhamah', role: 'Kepala DTA', image: usthNeneng }, { name: 'Usth. Raya', role: 'Guru', image: usthRayanthi }, { name: 'Usth. Sani', role: 'Guru' }, { name: 'Bpk. Dani R', role: 'Guru' }] } },
      { id: 5, title: 'Zakat & Infaq', category: 'Ibadah', bgImage: beritaQurbanImg, description: 'Pengelolaan dan penyaluran zakat, infaq, dan sedekah secara transparan.', iconName: 'HandCoins', badge: 'Aktif', badgeColor: 'bg-primary/10 text-primary-dark dark:text-primary-light border border-primary/20', details: { fullDescription: 'Unit Pengumpul Zakat (UPZ) Masjid Jami Kassiti memfasilitasi jamaah dalam menunaikan Zakat Fitrah, Zakat Maal, Infaq, dan Sedekah. Dana yang terkumpul disalurkan kepada asnaf yang berhak and untuk operasional kemakmuran masjid dengan laporan keuangan yang dipublikasikan rutin.', schedule: 'Layanan 24 Jam (Transfer) / 08.00-17.00 (Offline)', location: 'Kantor Sekretariat Masjid', contact: 'Divisi ZISWAF (Bpk. ALI M Abduh)', contactImage: bpkAli, requirements: ['Menerima konsultasi hitung Zakat Maal', 'Menerima jemput zakat khusus area terdekat'] } },
      { id: 4, title: 'Remaja Masjid', category: 'Sosial', bgImage: sosialImg, description: 'Wadah kegiatan dan kreativitas pemuda-pemudi muslim Masjid Jami Kassiti.', iconName: 'Users', badge: 'Aktif', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800', details: { fullDescription: 'Remaja Masjid Jami Kassiti (IRMAS) merupakan wadah pembinaan, kreativitas, dan kolaborasi pemuda-pemudi muslim dalam memakmurkan masjid. Kegiatan meliputi kajian kepemudaan, pelatihan skill, olahraga, bakti sosial, dan pengembangan seni budaya Islami.', schedule: 'Setiap Akhir Pekan (Sabtu & Ahad)', location: 'Masjid Jami Kassiti & Lingkungan Sekitar', contact: 'Koordinator IRMAS (Sdr. Gojali)', contactImage: bpkGojali, requirements: ['Pemuda/pemudi usia 13 - 25 tahun', 'Memiliki semangat belajar dan berorganisasi', 'Mengisi form keanggotaan'], staff: [{ name: 'Bpk. Gojali Abdul Syafi\'i', role: 'Koordinator', image: bpkGojali }, { name: 'Usth. Rani Rahmayati', role: 'Anggota', image: usthRani }, { name: 'Usth. Rayanthi', role: 'Anggota', image: usthRayanthi }] } }
    ],
    generalSettings: parseSafe('admin_general_settings') || {
      name: 'Perumahan Arjamukti Kencana Raya',
      slogan: 'Membangun *Iman*,\nIlmu, dan *Ukhuwah*',
      description: 'Selamat datang di Masjid Jami Kassiti Perum Arjamukti Kencana Raya Arjasari, Leuwisari, Kab. Tasikmalaya. Bergabunglah bersama kami dalam ibadah, pembelajaran, dakwah, dan pelayanan umat.',
      history: 'Masjid Jami Kassiti yang berlokasi di Perum Arjamukti Kencana Raya, Arjasari, Leuwisari, Kab. Tasikmalaya, adalah pusat ibadah dan kegiatan keislaman yang melayani umat dengan penuh dedikasi. Kami berkomitmen untuk menjadi rumah Allah yang menyejukkan, tempat berkumpulnya jamaah dalam menuntut ilmu, beribadah, dan mempererat ukhuwah islamiah.\n\nDengan berbagai program kegiatan rutin seperti kajian, TPA/TPQ, dan kegiatan sosial, kami berusaha membangun generasi muslim yang beriman, berilmu, dan bermanfaat bagi masyarakat sekitar.',
      instagram: 'https://instagram.com/masjidjamikassiti',
      facebook: 'https://facebook.com/masjidjamikassiti',
      youtube: 'https://youtube.com/@masjidjamikassiti',
      whatsapp: '6281234567890',
      maps: 'https://maps.google.com'
    },
    ctaSettings: parseSafe('admin_cta_settings') || {
      title: 'Investasi Terbaik Untuk Akhirat',
      subtitle: 'Setiap rupiah yang Anda sedekahkan tidak hanya memakmurkan masjid, tapi juga mengalirkan pahala yang tak terputus bagi Anda dan keluarga.',
      quote: '"Barang siapa yang membangun masjid karena Allah, maka Allah akan membangunkan baginya rumah di surga."',
      quoteSource: 'HR. Bukhari & Muslim',
      totalDonors: 128,
      programs: [
        { id: 1, name: 'Renovasi Aula Utama', progress: 75 },
        { id: 2, name: 'Sarana Pendidikan TPQ', progress: 60 }
      ]
    },
    masterData: parseSafe('admin_master_data_v2') || {
      kategori: [
        { id: 1, name: 'Kajian', description: 'Kegiatan belajar agama bersama ustadz', iconName: 'BookOpen' },
        { id: 2, name: 'Pendidikan', description: 'Kegiatan edukasi dan pembelajaran', iconName: 'GraduationCap' },
        { id: 3, name: 'Sosial', description: 'Kegiatan sosial kemasyarakatan', iconName: 'Users' },
        { id: 4, name: 'Ibadah', description: 'Kegiatan peribadahan jamaah', iconName: 'Heart' },
        { id: 5, name: 'Umum', description: 'Kegiatan umum lainnya', iconName: 'Info' }
      ],
      label: [
        { id: 1, name: 'Segera', description: 'Akan segera dilaksanakan', color: 'red' },
        { id: 2, name: 'Terbatas', description: 'Kuota terbatas', color: 'yellow' },
        { id: 3, name: 'Tersedia', description: 'Fasilitas / Layanan tersedia', color: 'green' },
        { id: 4, name: 'Baru', description: 'Informasi atau foto terbaru', color: 'blue' }
      ],
      status: [
        { id: 1, name: 'Aktif', description: 'Ditampilkan secara publik', color: 'green' },
        { id: 2, name: 'Nonaktif', description: 'Disembunyikan dari publik', color: 'gray' }
      ],
    }
  }),
  getters: {
    currentRoleData: (state) => {
      return state.roles.find(r => r.key === state.currentUser?.role) || null;
    },
    hasModuleAccess: (state) => {
      return (moduleKey) => {
        const roleData = state.roles.find(r => r.key === state.currentUser?.role);
        return roleData ? roleData.modules.includes(moduleKey) : false;
      }
    },
    canManageRole: (state) => {
      return (targetHierarchy) => {
        const roleData = state.roles.find(r => r.key === state.currentUser?.role);
        // User can only manage roles with a hierarchy numerically strictly greater than their own (1 is highest)
        return roleData ? roleData.hierarchy < targetHierarchy : false;
      }
    }
  },
  actions: {
    logActivity(actionName, details) {
      if (!this.currentUser) return;
      const newLog = {
        id: Date.now(),
        userId: this.currentUser.id,
        userName: this.currentUser.name,
        userRole: this.currentUser.role,
        action: actionName,
        details: details,
        timestamp: new Date().toISOString()
      };
      this.auditLogs.unshift(newLog); // Add to beginning
      if (this.auditLogs.length > 500) {
        this.auditLogs = this.auditLogs.slice(0, 500); // Keep max 500 logs
      }
      setStorage('admin_audit_logs', JSON.stringify(this.auditLogs));
    },
    login(username, password) {
      // For backwards compatibility and new users array
      const user = this.users.find(u => u.username === username && u.password === password);
      if (user) {
        this.isAuthenticated = true;
        this.currentUser = { ...user };
        // Don't store password in currentUser state/localStorage
        delete this.currentUser.password;

        setStorage('admin_auth', 'true');
        setStorage('admin_current_user', JSON.stringify(this.currentUser));
        this.logActivity('Login', 'Berhasil login ke sistem');
        return true;
      }
      return false;
    },
    logout() {
      if (this.isAuthenticated) {
        this.logActivity('Logout', 'Keluar dari sistem');
      }
      this.isAuthenticated = false;
      this.currentUser = null;
      removeStorage('admin_auth');
      removeStorage('admin_current_user');
    },
    addKegiatan(data) {
      const newId = this.kegiatan.length > 0 ? Math.max(...this.kegiatan.map((k) => k.id)) + 1 : 1
      this.kegiatan.push({ ...data, id: newId })
      this.saveKegiatan()
    },
    updateKegiatan(id, updatedData) {
      const index = this.kegiatan.findIndex((k) => k.id === id)
      if (index !== -1) {
        this.kegiatan[index] = { ...this.kegiatan[index], ...updatedData }
        this.saveKegiatan()
      }
    },
    deleteKegiatan(id) {
      this.kegiatan = this.kegiatan.filter((k) => k.id !== id)
      this.saveKegiatan()
    },
    saveKegiatan() {
      setStorage('admin_kegiatan_v3', JSON.stringify(this.kegiatan))
    },
    updateFinance(data) {
      this.finance = { ...this.finance, ...data }
      setStorage('admin_finance', JSON.stringify(this.finance))
      this.logActivity('Ubah Keuangan', 'Memperbarui data laporan keuangan');
    },
    addGallery(data) {
      const newId = this.gallery.length > 0 ? Math.max(...this.gallery.map((g) => g.id)) + 1 : 1
      this.gallery.push({ ...data, id: newId })
      this.saveGallery()
    },
    updateGallery(id, updatedData) {
      const index = this.gallery.findIndex((g) => g.id === id)
      if (index !== -1) {
        this.gallery[index] = { ...this.gallery[index], ...updatedData }
        this.saveGallery()
      }
    },
    deleteGallery(id) {
      this.gallery = this.gallery.filter((g) => g.id !== id)
      this.saveGallery()
    },
    saveGallery() {
      setStorage('admin_gallery', JSON.stringify(this.gallery))
    },
    addLayanan(data) {
      const newId = this.layanan.length > 0 ? Math.max(...this.layanan.map((l) => l.id)) + 1 : 1
      this.layanan.push({ ...data, id: newId })
      this.saveLayanan()
    },
    updateLayanan(id, updatedData) {
      const index = this.layanan.findIndex((l) => l.id === id)
      if (index !== -1) {
        this.layanan[index] = { ...this.layanan[index], ...updatedData }
        this.saveLayanan()
      }
    },
    deleteLayanan(id) {
      this.layanan = this.layanan.filter((l) => l.id !== id)
      this.saveLayanan()
    },
    saveLayanan() {
      setStorage('admin_layanan_v6', JSON.stringify(this.layanan))
    },
    saveGeneralSettings() {
      setStorage('admin_general_settings', JSON.stringify(this.generalSettings))
      this.logActivity('Ubah Pengaturan', 'Memperbarui pengaturan umum (teks sambutan, dsb)');
    },
    saveCtaSettings() {
      setStorage('admin_cta_settings', JSON.stringify(this.ctaSettings))
      this.logActivity('Ubah Donasi', 'Memperbarui pengaturan CTA Donasi');
    },
    saveMasterData() {
      setStorage('admin_master_data_v2', JSON.stringify(this.masterData))
      this.logActivity('Ubah Master Data', 'Memperbarui master data (kategori/label)');
    },
    saveCommittee() {
      setStorage('admin_committee_v3', JSON.stringify(this.committee))
      this.logActivity('Ubah Pengurus', 'Memperbarui struktur pengurus DKM');
    },
    addUser(userData) {
      const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
      this.users.push({ ...userData, id: newId });
      this.saveUsers();
      this.logActivity('Tambah Pengguna', `Menambahkan admin baru: ${userData.username}`);
    },
    updateUser(id, userData) {
      const index = this.users.findIndex(u => u.id === id);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...userData };
        this.saveUsers();
        this.logActivity('Ubah Pengguna', `Memperbarui data admin: ${this.users[index].username}`);
      }
    },
    deleteUser(id) {
      const user = this.users.find(u => u.id === id);
      if (user) {
        this.users = this.users.filter(u => u.id !== id);
        this.saveUsers();
        this.logActivity('Hapus Pengguna', `Menghapus admin: ${user.username}`);
      }
    },
    saveUsers() {
      setStorage('admin_users', JSON.stringify(this.users));
    },
    recalculateHierarchy() {
      this.roles.forEach((r, index) => {
        r.hierarchy = index + 1;
      });
      this.saveRoles();
    },
    moveRoleUp(id) {
      const index = this.roles.findIndex(r => r.id === id);
      // Index 0 is superadmin, cannot move anything above it, and it cannot move
      if (index > 1) {
        const temp = this.roles[index - 1];
        this.roles[index - 1] = this.roles[index];
        this.roles[index] = temp;
        this.recalculateHierarchy();
      }
    },
    moveRoleDown(id) {
      const index = this.roles.findIndex(r => r.id === id);
      // Index 0 is superadmin, it cannot move. Other roles can move down if not last.
      if (index > 0 && index < this.roles.length - 1) {
        const temp = this.roles[index + 1];
        this.roles[index + 1] = this.roles[index];
        this.roles[index] = temp;
        this.recalculateHierarchy();
      }
    },
    addRole(roleData) {
      const newId = this.roles.length > 0 ? Math.max(...this.roles.map(r => r.id)) + 1 : 1;
      roleData.hierarchy = this.roles.length + 1; // Put at the bottom
      this.roles.push({ ...roleData, id: newId });
      this.saveRoles();
      this.logActivity('Tambah Role', `Menambahkan peran baru: ${roleData.name}`);
    },
    updateRole(id, roleData) {
      const index = this.roles.findIndex(r => r.id === id);
      if (index !== -1) {
        // Prevent editing superadmin hierarchy/key to prevent lock-out
        if (this.roles[index].key === 'superadmin') {
          roleData.key = 'superadmin';
          roleData.hierarchy = 1;
        }
        this.roles[index] = { ...this.roles[index], ...roleData };
        this.saveRoles();
        this.logActivity('Ubah Role', `Memperbarui data peran: ${this.roles[index].name}`);
      }
    },
    deleteRole(id) {
      const role = this.roles.find(r => r.id === id);
      if (role && role.key !== 'superadmin') {
        this.roles = this.roles.filter(r => r.id !== id);
        this.saveRoles();
        this.logActivity('Hapus Role', `Menghapus peran: ${role.name}`);
      }
    },
    saveRoles() {
      setStorage('admin_roles', JSON.stringify(this.roles));
    }
  }
})
