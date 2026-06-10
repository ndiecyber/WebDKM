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
    layanan: parseSafe('admin_layanan') || [
      { id: 1, title: 'Sholat Berjamaah', category: 'Ibadah', bgImage: communityImg, description: 'Sholat lima waktu dan sholat Jumat berjamaah dengan imam yang berpengalaman.', iconName: 'Users', badge: 'Tersedia', badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800', details: { fullDescription: 'Masjid Jami Kassiti menyelenggarakan sholat berjamaah lima waktu secara rutin, dilengkapi dengan fasilitas tempat wudhu yang bersih, karpet yang nyaman, dan pendingin ruangan. Kami juga menyelenggarakan Sholat Jumat dengan khatib-khatib pilihan yang membawakan materi khutbah inspiratif dan aktual.', schedule: 'Setiap Waktu Sholat & Jumat 11.30 WIB', location: 'Ruang Utama & Lantai 2 Masjid Jami Kassiti', contact: 'DKM Masjid (Bpk. Ahmad)', requirements: ['Pakaian sopan dan menutup aurat', 'Menjaga ketertiban dan kebersihan'] } },
      { id: 2, title: 'Kajian Rutin', category: 'Pendidikan', bgImage: interiorImg, description: 'Kajian ilmu agama setiap pekan meliputi tafsir, hadits, fiqih, dan akhlak.', iconName: 'BookOpen', badge: 'Terjadwal', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800', details: { fullDescription: 'Program kajian rutin terbuka untuk umum (Ikhwan & Akhwat) yang diisi oleh asatidzah berkompeten. Materi kajian disusun secara terstruktur mulai dari dasar hingga lanjutan, mencakup pembahasan Tafsir Al-Quran, Hadits Arbain, Fiqih Ibadah, dan Sirah Nabawiyah.', schedule: 'Rabu (Ba\'da Maghrib) & Ahad (Ba\'da Subuh)', location: 'Ruang Utama Masjid', contact: 'Divisi Dakwah (Bpk. Rizky)', requirements: ['Membawa alat tulis (opsional)', 'Terbuka untuk umum'] } },
      { id: 3, title: 'TPA / TPQ', category: 'Pendidikan', bgImage: quranImg, description: 'Program pendidikan Al-Quran untuk anak-anak dengan metode pembelajaran modern.', iconName: 'GraduationCap', badge: 'Pendaftaran Buka', badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800', details: { fullDescription: 'Taman Pendidikan Al-Quran (TPQ) Masjid Jami Kassiti mendidik generasi muda agar cinta Al-Quran. Kurikulum mencakup baca tulis Al-Quran (Metode Iqro/Tilawati), hafalan surat pendek, doa sehari-hari, praktik ibadah, dan pembentukan akhlakul karimah.', schedule: 'Senin - Kamis, 15.30 - 17.00 WIB', location: 'Ruang Kelas TPA (Lantai 2)', contact: 'Kepala TPA (Ust. Salman)', requirements: ['Usia 5 - 12 Tahun', 'Mengisi formulir pendaftaran', 'Fotokopi Akta Kelahiran'] } },
      { id: 4, title: 'Konsultasi Agama', category: 'Sosial', bgImage: heroImg, description: 'Layanan konsultasi keagamaan untuk masyarakat seputar ibadah dan keluarga.', iconName: 'Heart', badge: 'Gratis', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800', details: { fullDescription: 'Layanan bimbingan dan konsultasi keagamaan yang ditangani langsung oleh ustadz/ulama rujukan masjid. Kami melayani pertanyaan seputar fiqih keseharian, waris, rumah tangga (konsultasi pra dan pasca nikah), serta pendampingan psikologis spiritual.', schedule: 'Berdasarkan Perjanjian (Appointment)', location: 'Ruang Konsultasi DKM / Online (WhatsApp)', contact: 'Layanan Konsultasi (Ust. Hidayat)', requirements: ['Membuat janji temu via WhatsApp maksimal H-1'] } },
      { id: 5, title: 'Zakat & Infaq', category: 'Ibadah', bgImage: exteriorImg, description: 'Pengelolaan dan penyaluran zakat, infaq, dan sedekah secara transparan.', iconName: 'HandCoins', badge: 'Aktif', badgeColor: 'bg-primary/10 text-primary-dark dark:text-primary-light border border-primary/20', details: { fullDescription: 'Unit Pengumpul Zakat (UPZ) Masjid Jami Kassiti memfasilitasi jamaah dalam menunaikan Zakat Fitrah, Zakat Maal, Infaq, dan Sedekah. Dana yang terkumpul disalurkan kepada asnaf yang berhak dan untuk operasional kemakmuran masjid dengan laporan keuangan yang dipublikasikan rutin.', schedule: 'Layanan 24 Jam (Transfer) / 08.00-17.00 (Offline)', location: 'Kantor Sekretariat Masjid', contact: 'Divisi ZISWAF (Bpk. Lukman)', requirements: ['Menerima konsultasi hitung Zakat Maal', 'Menerima jemput zakat khusus area terdekat'] } },
      { id: 6, title: 'Akad Nikah', category: 'Sosial', bgImage: interiorImg, description: 'Pelayanan akad nikah dan fasilitas memadai untuk membina keluarga sakinah.', iconName: 'Gem', badge: 'Tersedia', badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800', details: { fullDescription: 'Menyediakan fasilitas tempat untuk melangsungkan prosesi Akad Nikah di ruang utama masjid yang nyaman, sakral, dan ber-AC. Kami juga menyediakan ustadz untuk memberikan tausiyah pernikahan/khutbah nikah.', schedule: 'Sesuai Booking (Sabtu/Ahad Pagi)', location: 'Ruang Utama Masjid Jami Kassiti', contact: 'Sekretariat (Bpk. Hendra)', requirements: ['Booking jadwal maksimal H-30', 'Melampirkan surat pengantar KUA', 'Maksimal hadirin 100 orang'] } }
    ],
    generalSettings: parseSafe('admin_general_settings') || {
      name: 'Masjid Jami Kassiti',
      slogan: 'Membangun <span class="text-gradient-gold">Iman</span>,<br class="hidden sm:block" /> Ilmu, dan <span class="text-gradient-gold">Ukhuwah</span>',
      description: 'Selamat datang di Masjid Jami Kassiti Perum Arjamukti Kencana Raya Arjasari, Leuwisari, Kab. Tasikmalaya. Bergabunglah bersama kami dalam ibadah, pembelajaran, dakwah, dan pelayanan umat.',
      history: 'Masjid Jami Kassiti yang berlokasi di Perum Arjamukti Kencana Raya, Arjasari, Leuwisari, Kab. Tasikmalaya, adalah pusat ibadah dan kegiatan keislaman yang melayani umat dengan penuh dedikasi. Kami berkomitmen untuk menjadi rumah Allah yang menyejukkan, tempat berkumpulnya jamaah dalam menuntut ilmu, beribadah, dan mempererat ukhuwah islamiah.\n\nDengan berbagai program kegiatan rutin seperti kajian, TPA/TPQ, dan kegiatan sosial, kami berusaha membangun generasi muslim yang beriman, berilmu, dan bermanfaat bagi masyarakat sekitar.',
      instagram: 'https://instagram.com/masjidkassiti',
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
  actions: {
    login(username, password) {
      if (username === 'admin' && password === 'admin123') {
        this.isAuthenticated = true
        setStorage('admin_auth', 'true')
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      removeStorage('admin_auth')
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
      setStorage('admin_layanan', JSON.stringify(this.layanan))
    },
    saveGeneralSettings() {
      setStorage('admin_general_settings', JSON.stringify(this.generalSettings))
    },
    saveCtaSettings() {
      setStorage('admin_cta_settings', JSON.stringify(this.ctaSettings))
    },
    saveMasterData() {
      setStorage('admin_master_data_v2', JSON.stringify(this.masterData))
    }
  }
})
