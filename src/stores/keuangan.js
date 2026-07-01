import { defineStore } from 'pinia'
import { getStorage, setStorage } from '@/utils/storage'

const parseSafe = (key) => {
  try {
    const val = getStorage(key)
    return val ? JSON.parse(val) : null
  } catch (e) {
    return null
  }
}

export const useKeuanganStore = defineStore('keuangan', {
  state: () => ({
    programs: [
      { id: 1, name: 'PHBI Muharram 1446H', description: 'Peringatan Hari Besar Islam Muharram', startDate: '2026-07-01', endDate: '2026-07-15', status: 'Selesai' },
      { id: 2, name: 'Renovasi Aula Utama', description: 'Dana khusus untuk renovasi atap dan lantai aula utama masjid', startDate: '2026-06-01', endDate: '2026-08-30', status: 'Aktif' },
      { id: 3, name: 'Santunan Anak Yatim', description: 'Santunan rutin bulanan', startDate: '2026-01-01', endDate: '', status: 'Aktif' },
      { id: 4, name: 'Pembangunan Menara', description: 'Program wakaf menara masjid', startDate: '2026-01-01', endDate: '', status: 'Aktif' },
      { id: 5, name: 'Kajian Subuh Akbar', description: 'Kajian gabungan kecamatan', startDate: '2026-08-01', endDate: '2026-08-10', status: 'Aktif' },
      { id: 6, name: 'Panitia Qurban 1447H', description: 'Tabungan Qurban jamaah', startDate: '2026-01-01', endDate: '', status: 'Aktif' },
      { id: 7, name: 'Bantuan Bencana', description: 'Peduli musibah lokal', startDate: '2026-05-01', endDate: '2026-05-30', status: 'Selesai' },
    ],
    // Menggunakan dummy statis secara paksa (mengabaikan localStorage sementara)
    transactions: [
      { id: 1, date: '2026-06-12', description: 'Infaq Kotak Amal Jumat', category: 'Infaq Mingguan', account: 'BSI Masjid Jami Kassiti', program_id: null, type: 'in', status: 'approved', amount: 8500000 },
      { id: 2, date: '2026-06-10', description: 'Donasi Renovasi Hamba Allah', category: 'Donasi Umum', account: 'BSI Masjid Jami Kassiti', program_id: 2, type: 'in', status: 'approved', amount: 15000000 },
      { id: 3, date: '2026-06-08', description: 'Infaq Santunan Yatim', category: 'Donasi Umum', account: 'BSI Masjid Jami Kassiti', program_id: 3, type: 'in', status: 'approved', amount: 5000000 },
      { id: 4, date: '2026-06-05', description: 'Wakaf Pembangunan Menara', category: 'Wakaf', account: 'BSI Masjid Jami Kassiti', program_id: 4, type: 'in', status: 'approved', amount: 25000000 },
      { id: 5, date: '2026-06-01', description: 'Sponsor Kajian Subuh', category: 'Donasi Umum', account: 'BSI Masjid Jami Kassiti', program_id: 5, type: 'in', status: 'approved', amount: 2000000 },
      { id: 6, date: '2026-07-14', description: 'Tabungan Qurban Jamaah', category: 'Lainnya', account: 'BSI Masjid Jami Kassiti', program_id: 6, type: 'in', status: 'approved', amount: 12000000 },
      { id: 7, date: '2026-05-15', description: 'Donasi Bencana Banjir', category: 'Lainnya', account: 'BSI Masjid Jami Kassiti', program_id: 7, type: 'in', status: 'approved', amount: 3500000 },
      { id: 8, date: '2026-06-11', description: 'Bayar Listrik & Air', category: 'Operasional', account: 'BSI Masjid Jami Kassiti', program_id: null, type: 'out', status: 'approved', amount: 1200000 },
      { id: 9, date: '2026-06-01', description: 'Donasi Muharram (Hamba Allah)', category: 'Donasi Umum', account: 'BSI Masjid Jami Kassiti', program_id: 1, type: 'in', status: 'approved', amount: 5000000 },
      { id: 10, date: '2026-06-05', description: 'Pembayaran DP Tukang Renovasi', category: 'Pemeliharaan', account: 'BSI Masjid Jami Kassiti', program_id: 2, type: 'out', status: 'approved', amount: 3000000 },
    ],
    accounts: [
      { id: 1, name: 'Kotak Amal Utama', type: 'cash' },
      { id: 2, name: 'BSI Masjid Jami Kassiti', type: 'bank' },
      { id: 3, name: 'Kas Kecil Operasional', type: 'cash' },
    ]
  }),
  getters: {
    programBalances(state) {
      const balances = {}
      // Initialize balances
      state.programs.forEach(p => {
        balances[p.id] = { in: 0, out: 0, total: 0 }
      })
      // Calculate
      state.transactions.filter(t => t.status === 'approved' && t.program_id).forEach(t => {
        if (balances[t.program_id]) {
          if (t.type === 'in') {
            balances[t.program_id].in += t.amount
            balances[t.program_id].total += t.amount
          } else {
            balances[t.program_id].out += t.amount
            balances[t.program_id].total -= t.amount
          }
        }
      })
      return balances
    },
    generalBalance(state) {
      let totalIn = 0
      let totalOut = 0
      state.transactions.filter(t => t.status === 'approved' && !t.program_id).forEach(t => {
        if (t.type === 'in') {
          totalIn += t.amount
        } else {
          totalOut += t.amount
        }
      })
      return { in: totalIn, out: totalOut, total: totalIn - totalOut }
    },
    accountBalances(state) {
      const balances = {}
      state.accounts.forEach(a => {
        balances[a.name] = { 
          total: 0,
          programs: {},
          general: 0
        }
      })
      
      state.transactions.filter(t => t.status === 'approved').forEach(t => {
        if (!balances[t.account]) return
        
        const sign = t.type === 'in' ? 1 : -1
        const amount = t.amount * sign
        
        balances[t.account].total += amount
        
        if (t.program_id) {
          if (!balances[t.account].programs[t.program_id]) {
            balances[t.account].programs[t.program_id] = 0
          }
          balances[t.account].programs[t.program_id] += amount
        } else {
          balances[t.account].general += amount
        }
      })
      return balances
    }
  },
  actions: {
    addProgram(data) {
      const newId = this.programs.length > 0 ? Math.max(...this.programs.map((p) => p.id)) + 1 : 1
      this.programs.push({ ...data, id: newId })
      this.savePrograms()
    },
    updateProgram(id, updatedData) {
      const index = this.programs.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.programs[index] = { ...this.programs[index], ...updatedData }
        this.savePrograms()
      }
    },
    deleteProgram(id) {
      this.programs = this.programs.filter((p) => p.id !== id)
      // Remove program_id from transactions? Or maybe just keep them as historical data
      this.savePrograms()
    },
    rolloverProgram(fromProgramId, toProgramId, amount, accountName) {
      const date = new Date().toISOString().split('T')[0]
      // Create out transaction from the old program
      const txOut = {
        id: Date.now(),
        date: date,
        description: 'Rollover sisa dana program ke tujuan',
        category: 'Mutasi / Penyaluran',
        account: accountName,
        program_id: fromProgramId,
        type: 'out',
        status: 'approved',
        amount: parseInt(amount)
      }
      // Create in transaction to the new program (or general kas)
      const txIn = {
        id: Date.now() + 1,
        date: date,
        description: 'Penerimaan rollover sisa dana',
        category: 'Mutasi / Penerimaan',
        account: accountName,
        program_id: toProgramId || null, // null means general kas
        type: 'in',
        status: 'approved',
        amount: parseInt(amount)
      }
      this.transactions.push(txOut, txIn)
      this.saveTransactions()
    },
    savePrograms() {
      setStorage('admin_keuangan_programs', JSON.stringify(this.programs))
    },
    addTransaction(data) {
      const newId = this.transactions.length > 0 ? Math.max(...this.transactions.map((t) => t.id)) + 1 : 1
      this.transactions.push({ ...data, id: newId, amount: parseInt(data.amount) || 0 })
      this.saveTransactions()
    },
    updateTransaction(id, updatedData) {
      const index = this.transactions.findIndex((t) => t.id === id)
      if (index !== -1) {
        this.transactions[index] = { ...this.transactions[index], ...updatedData, amount: parseInt(updatedData.amount) || 0 }
        this.saveTransactions()
      }
    },
    deleteTransaction(id) {
      this.transactions = this.transactions.filter((t) => t.id !== id)
      this.saveTransactions()
    },
    saveTransactions() {
      setStorage('admin_keuangan_tx', JSON.stringify(this.transactions))
    },
    addBalanceAdjustment(account, amountDiff, programId) {
      // Just mock it by creating an adjustment transaction
      const date = new Date().toISOString().split('T')[0]
      const tx = {
        id: Date.now(),
        date: date,
        description: 'Penyesuaian Saldo',
        category: 'Penyesuaian',
        account: account,
        program_id: programId || null,
        type: amountDiff >= 0 ? 'in' : 'out',
        status: 'approved',
        amount: Math.abs(parseInt(amountDiff))
      }
      this.transactions.push(tx)
      this.saveTransactions()
    }
  }
})
