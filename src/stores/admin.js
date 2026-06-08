import { defineStore } from 'pinia'
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

export const useAdminStore = defineStore('admin', {
  state: () => ({
    isAuthenticated: localStorage.getItem('admin_auth') === 'true',
    kegiatan: JSON.parse(localStorage.getItem('admin_kegiatan')) || [
      { id: 1, title: 'Kajian Rutin Ahad Pagi', type: 'Kajian Rutin', date: 'Setiap Ahad', time: '05:00 - 06:30', ustadz: 'Ust. Abdul Somad', status: 'Aktif' },
      { id: 2, title: 'Tahsin Al-Quran', type: 'Pendidikan', date: 'Setiap Selasa', time: '18:30 - 20:00', ustadz: 'Ust. Hanan Attaki', status: 'Aktif' },
      { id: 3, title: 'Buka Puasa Sunnah', type: 'Sosial', date: 'Setiap Senin & Kamis', time: '17:30 - Selesai', ustadz: '-', status: 'Aktif' },
    ],
    finance: JSON.parse(localStorage.getItem('admin_finance')) || {
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
    gallery: JSON.parse(localStorage.getItem('admin_gallery')) || [
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
  }),
  actions: {
    login(username, password) {
      // Mock simple auth
      if (username === 'admin' && password === 'admin123') {
        this.isAuthenticated = true
        localStorage.setItem('admin_auth', 'true')
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('admin_auth')
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
      localStorage.setItem('admin_kegiatan', JSON.stringify(this.kegiatan))
    },
    updateFinance(data) {
      this.finance = { ...this.finance, ...data }
      localStorage.setItem('admin_finance', JSON.stringify(this.finance))
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
      localStorage.setItem('admin_gallery', JSON.stringify(this.gallery))
    }
  }
})
