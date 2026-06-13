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
    currentUser: parseSafe('admin_current_user') || { id: 1, username: 'admin', name: 'Super Admin', role: 'superadmin' },
    roles: parseSafe('admin_roles') || [
      { id: 1, key: 'superadmin', name: 'Super Admin', hierarchy: 1, modules: ['web', 'keuangan', 'qurban', 'sistem'] },
      { id: 2, key: 'bendahara', name: 'Bendahara', hierarchy: 2, modules: ['keuangan'] },
      { id: 3, key: 'sekretaris', name: 'Sekretaris', hierarchy: 3, modules: ['web'] }
    ],
    users: parseSafe('admin_users') || [
      { id: 1, username: 'admin', name: 'Super Admin', role: 'superadmin', password: 'admin123' },
      { id: 2, username: 'bendahara', name: 'Bendahara', role: 'bendahara', password: 'password123' },
      { id: 3, username: 'sekretaris', name: 'Sekretaris', role: 'sekretaris', password: 'password123' }
    ],
    auditLogs: parseSafe('admin_audit_logs') || [],
    committee: parseSafe('admin_committee') || {
      dewanPenasihat: [
        { id: 1, name: 'Ust. H. Iwa Kurniawan', role: 'Dewan Penasihat' },
        { id: 2, name: 'Ust. H. Ade Karom', role: 'Dewan Penasihat' },
        { id: 3, name: 'Bpk. Sudiana Maska', role: 'Dewan Penasihat' },
        { id: 4, name: 'Bpk. H. Usman', role: 'Dewan Penasihat' },
        { id: 5, name: 'Bpk. Ayi Sunarwan', role: 'Dewan Penasihat' }
      ],
      pengurusHarian: [
        { id: 1, name: "Ust. H. Ahmad Nasa'i", role: 'Ketua DKMJ', isLeader: true, image: null },
        { id: 2, name: 'Ust. H. M. Ainur Rofik', role: 'Sekretaris', isLeader: false, image: null },
        { id: 3, name: 'Ust. Randi Rizal', role: 'Bendahara', isLeader: false, image: null }
      ],
      seksiDakwah: [
        { id: 1, name: 'Ust. H. Irvan Ruchiat', role: 'Anggota Dakwah & Pendidikan', image: null },
        { id: 2, name: 'Ust. H. Dani Ramdhani', role: 'Anggota Dakwah & Pendidikan', image: null },
        { id: 3, name: 'Usth. Neneng Aam Siti Marhamah', role: 'Anggota Dakwah & Pendidikan', image: null },
        { id: 4, name: 'Usth. Ai Jamaliah', role: 'Anggota Dakwah & Pendidikan', image: null },
        { id: 5, name: 'Usth. Rini Dewi Anggiani', role: 'Anggota Dakwah & Pendidikan', image: null },
        { id: 6, name: 'Usth. Dede Asiah', role: 'Anggota Dakwah & Pendidikan', image: null }
      ],
      seksiEkonomi: [
        { id: 1, name: 'Bpk. Ali M. Abduh', role: 'Anggota Ekonomi & Wakaf', image: null },
        { id: 2, name: 'Bpk. Ujang Kurnia', role: 'Anggota Ekonomi & Wakaf', image: null },
        { id: 3, name: 'Bpk. Erwin Darmawan', role: 'Anggota Ekonomi & Wakaf', image: null },
        { id: 4, name: 'Bpk. Ade Ramdhani', role: 'Anggota Ekonomi & Wakaf', image: null }
      ],
      seksiLogistik: [
        { id: 1, name: 'Bpk. H. Redi Sasriandi', role: 'Anggota Peralatan & Logistik', image: null },
        { id: 2, name: 'Bpk. Aditya Astra Prayudha', role: 'Anggota Peralatan & Logistik', image: null },
        { id: 3, name: 'Bpk. Sukardi', role: 'Anggota Peralatan & Logistik', image: null },
        { id: 4, name: 'Bpk. Nanang Barkah', role: 'Anggota Peralatan & Logistik', image: null }
      ],
      remajaMasjid: [
        { id: 1, name: 'Bpk. Gojali Abdul Syafi\'i', role: 'Remaja Masjid', image: null },
        { id: 2, name: 'Usth. Rani Rahmayati', role: 'Remaja Masjid', image: null },
        { id: 3, name: 'Usth. Rayanthi', role: 'Remaja Masjid', image: null }
      ]
    },
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
    gallery: parseSafe('admin_gallery') || [
      { id: 1, image: heroImg, caption: 'Kawasan Masjid Kassiti', subcaption: 'Pemandangan udara masjid dan perumahan yang asri dan hijau.', tag: 'Udara', iconName: 'MapPin', date: 'Baru saja' },
      { id: 2, image: stunningExteriorImg, caption: 'Pesona Senja', subcaption: 'Kemegahan arsitektur masjid di kala senja dengan tata cahaya yang indah.', tag: 'Eksklusif', iconName: 'Camera', date: 'Baru saja' },
      { id: 3, image: interiorImg, caption: 'Keheningan Interior', subcaption: 'Desain ruang sholat utama yang tenang, sejuk, dan khusyuk.', tag: 'Fasilitas', iconName: 'Building', date: 'Baru saja' },
      { id: 4, image: grandInteriorImg, caption: 'Kemegahan Interior', subcaption: 'Detail ornamen geometris dan lampu gantung kristal yang memukau jamaah.', tag: 'Desain', iconName: 'Building', date: 'Baru saja' },
      { id: 5, image: sholatImg, caption: 'Sholat Jumat Bersama', subcaption: 'Kekhusyukan jamaah saat melaksanakan ibadah sholat Jumat.', tag: 'Ibadah', iconName: 'Users', date: 'Baru saja' },
      { id: 6, image: communityImg, caption: 'Ukhuwah Jamaah', subcaption: 'Momen kebersamaan dan kekeluargaan jamaah Masjid Jami Kassiti.', tag: 'Sosial', iconName: 'Users', date: 'Baru saja' },
      { id: 7, image: kajianImg, caption: 'Kajian Rutin', subcaption: 'Majelis ilmu yang diisi oleh asatidzah berkompeten.', tag: 'Kajian', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 8, image: quranImg, caption: 'Pendidikan Al-Quran', subcaption: 'TPA/TPQ untuk mencetak generasi Islami yang cinta Al-Quran.', tag: 'Edukasi', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 9, image: sosialImg, caption: 'Bakti Sosial', subcaption: 'Kegiatan pembagian santunan untuk warga sekitar.', tag: 'Sosial', iconName: 'Users', date: 'Baru saja' },
      { id: 10, image: exteriorImg, caption: 'Arsitektur Menawan', subcaption: 'Keindahan kubah dan eksterior yang menjadi ikon perumahan.', tag: 'Arsitektur', iconName: 'Camera', date: 'Baru saja' },
      { id: 11, image: malamImg, caption: 'Cahaya Malam', subcaption: 'Suasana masjid yang syahdu dan bercahaya di malam hari.', tag: 'Arsitektur', iconName: 'Camera', date: 'Baru saja' },
      { id: 12, image: kaligrafiImg, caption: 'Detail Kaligrafi', subcaption: 'Seni kaligrafi indah yang menghiasi dinding masjid.', tag: 'Desain', iconName: 'Building', date: 'Baru saja' },
    ],
    layanan: parseSafe('admin_layanan_v6') || [
      { id: 1, title: 'Sholat Berjamaah', category: 'Ibadah', bgImage: communityImg, description: 'Sholat lima waktu dan sholat Jumat berjamaah dengan imam yang berpengalaman.', iconName: 'Sholat', badge: 'Tersedia', badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800', details: { fullDescription: 'Masjid Jami Kassiti menyelenggarakan sholat berjamaah lima waktu secara rutin, dilengkapi dengan fasilitas tempat wudhu yang bersih, karpet yang nyaman, dan pendingin ruangan. Kami juga menyelenggarakan Sholat Jumat dengan khatib-khatib pilihan yang membawakan materi khutbah inspiratif dan aktual.', schedule: 'Setiap Waktu Sholat & Jumat 11.30 WIB', location: 'Ruang Utama & Lantai 2 Masjid Jami Kassiti', contact: 'DKM Masjid (Bpk. Ahmad)', requirements: ['Pakaian sopan dan menutup aurat', 'Menjaga ketertiban dan kebersihan'] } },
      { id: 2, title: 'Kajian Rutin', category: 'Pendidikan', bgImage: interiorImg, description: 'Kajian ilmu agama setiap pekan meliputi tafsir, hadits, fiqih, dan akhlak.', iconName: 'BookOpen', badge: 'Terjadwal', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800', details: { fullDescription: 'Program kajian rutin terbuka untuk umum (Ikhwan & Akhwat) yang diisi oleh asatidzah berkompeten. Materi kajian disusun secara terstruktur mulai dari dasar hingga lanjutan, mencakup pembahasan Tafsir Al-Quran, Hadits Arbain, Fiqih Ibadah, dan Sirah Nabawiyah.', schedule: 'Rabu (Ba\'da Maghrib) & Ahad (Ba\'da Subuh)', location: 'Ruang Utama Masjid', contact: 'Divisi Dakwah (Bpk. Rizky)', requirements: ['Membawa alat tulis (opsional)', 'Terbuka untuk umum'] } },
      { id: 3, title: 'TPQ (Taman Pendidikan Al-Qur\'an)', category: 'Pendidikan', bgImage: quranImg, description: 'Program pendidikan Al-Quran untuk anak-anak dengan metode pembelajaran modern.', iconName: 'GraduationCap', badge: 'Pendaftaran Buka', badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800', details: { fullDescription: 'Taman Pendidikan Al-Quran (TPQ) Masjid Jami Kassiti mendidik generasi muda agar cinta Al-Quran. Kurikulum mencakup baca tulis Al-Quran (Metode Iqro/Tilawati), hafalan surat pendek, doa sehari-hari, praktik ibadah, dan pembentukan akhlakul karimah.', schedule: 'Senin - Kamis, 15.30 - 17.00 WIB', location: 'Ruang Kelas TPA (Lantai 2)', contact: 'Kepala TPA (Ust. Salman)', requirements: ['Usia 5 - 12 Tahun', 'Mengisi formulir pendaftaran', 'Fotokopi Akta Kelahiran'] } },
      { id: 6, title: 'DTA (Diniyah Takmiliyah Awaliyah)', category: 'Pendidikan', bgImage: quranImg, description: 'Program pendidikan keagamaan Islam non-formal sebagai pelengkap pendidikan formal anak.', iconName: 'GraduationCap', badge: 'Pendaftaran Buka', badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800', details: { fullDescription: 'Diniyah Takmiliyah Awaliyah (DTA) Masjid Jami Kassiti menyelenggarakan pendidikan keagamaan Islam bagi anak-anak usia sekolah dasar. Program ini dirancang untuk memperkuat pemahaman agama anak di luar jam sekolah formal dengan kurikulum terpadu meliputi Aqidah, Akhlak, Fiqih Ibadah, Tarikh (Sejarah Islam), Hadits, serta praktik ibadah sehari-hari.', schedule: 'Senin - Sabtu, 14.00 - 15.30 WIB', location: 'Ruang Kelas Lantai 2 Masjid Jami Kassiti', contact: 'Layanan DTA (Bpk. Ade)', requirements: ['Mengisi formulir pendaftaran', 'Fotokopi Akta Kelahiran & Kartu Keluarga', 'Membayar biaya administrasi pendaftaran'] } },
      { id: 5, title: 'Zakat & Infaq', category: 'Ibadah', bgImage: exteriorImg, description: 'Pengelolaan dan penyaluran zakat, infaq, dan sedekah secara transparan.', iconName: 'HandCoins', badge: 'Aktif', badgeColor: 'bg-primary/10 text-primary-dark dark:text-primary-light border border-primary/20', details: { fullDescription: 'Unit Pengumpul Zakat (UPZ) Masjid Jami Kassiti memfasilitasi jamaah dalam menunaikan Zakat Fitrah, Zakat Maal, Infaq, dan Sedekah. Dana yang terkumpul disalurkan kepada asnaf yang berhak and untuk operasional kemakmuran masjid dengan laporan keuangan yang dipublikasikan rutin.', schedule: 'Layanan 24 Jam (Transfer) / 08.00-17.00 (Offline)', location: 'Kantor Sekretariat Masjid', contact: 'Divisi ZISWAF (Bpk. Lukman)', requirements: ['Menerima konsultasi hitung Zakat Maal', 'Menerima jemput zakat khusus area terdekat'] } },
      { id: 4, title: 'Remaja Masjid', category: 'Sosial', bgImage: sosialImg, description: 'Wadah kegiatan dan kreativitas pemuda-pemudi muslim Masjid Jami Kassiti.', iconName: 'Users', badge: 'Aktif', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800', details: { fullDescription: 'Remaja Masjid Jami Kassiti (IRMAS) merupakan wadah pembinaan, kreativitas, dan kolaborasi pemuda-pemudi muslim dalam memakmurkan masjid. Kegiatan meliputi kajian kepemudaan, pelatihan skill, olahraga, bakti sosial, dan pengembangan seni budaya Islami.', schedule: 'Setiap Akhir Pekan (Sabtu & Ahad)', location: 'Masjid Jami Kassiti & Lingkungan Sekitar', contact: 'Koordinator IRMAS (Sdr. Gojali)', requirements: ['Pemuda/pemudi usia 13 - 25 tahun', 'Memiliki semangat belajar dan berorganisasi', 'Mengisi form keanggotaan'] } }
    ],
    generalSettings: parseSafe('admin_general_settings') || {
      name: 'Masjid Jami Kassiti',
      slogan: 'Membangun <span class="text-gradient-gold">Iman</span>,<br class="hidden sm:block" /> Ilmu, dan <span class="text-gradient-gold">Ukhuwah</span>',
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
      this.logActivity('Ubah Kegiatan', 'Memperbarui data kegiatan/acara');
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
      this.logActivity('Ubah Galeri', 'Memperbarui data galeri foto');
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
      this.logActivity('Ubah Layanan', 'Memperbarui data layanan masjid');
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
      setStorage('admin_committee', JSON.stringify(this.committee))
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
