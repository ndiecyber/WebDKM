import { defineStore } from 'pinia'

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
    }
  }
})
