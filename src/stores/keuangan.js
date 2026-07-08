import { defineStore } from 'pinia'
import api from '@/utils/api'
import {
  mapBankKasFromApi, mapBankKasToApi,
  mapTransactionFromApi, mapTransactionToApi,
  mapProgramFromApi, mapProgramToApi,
  mapCategoryFromApi, mapCategoryToApi,
  mapDashboardFromApi, mapChartDataFromApi,
  extractPaginatedData,
} from '@/utils/keuangan-mapper'

export const useKeuanganStore = defineStore('keuangan', {
  state: () => ({
    // Core data
    programs: [],
    transactions: [],
    bankKasList: [],
    categories: [],

    // Dashboard
    dashboardData: {},
    chartData: { categories: [], pemasukan: [], pengeluaran: [] },

    // Loading states
    loading: {
      programs: false,
      transactions: false,
      bankKas: false,
      categories: false,
      dashboard: false,
      chart: false,
    },

    // Pagination
    pagination: {
      transactions: { page: 1, lastPage: 1, total: 0, perPage: 15 },
      programs: { page: 1, lastPage: 1, total: 0, perPage: 15 },
      bankKas: { page: 1, lastPage: 1, total: 0, perPage: 50 },
      categories: { page: 1, lastPage: 1, total: 0, perPage: 100 },
    },
  }),

  getters: {
    activeBankKas(state) {
      return state.bankKasList.filter(bk => bk.isActive)
    },
    activePrograms(state) {
      return state.programs.filter(p => p.status === 'Aktif')
    },
    kategoriBySide(state) {
      return (tipe) => state.categories.filter(c => c.tipe === tipe)
    },
  },

  actions: {
    // ======================================================================
    // Dashboard
    // ======================================================================

    async fetchDashboard(params = {}) {
      this.loading.dashboard = true
      try {
        const res = await api.get('/keuangan/dashboard/overview', { params })
        const payload = res.data?.data ?? res.data
        this.dashboardData = mapDashboardFromApi(payload)
      } catch (err) {
        console.error('fetchDashboard error:', err)
      } finally {
        this.loading.dashboard = false
      }
    },

    async fetchChartData(months = 6) {
      this.loading.chart = true
      try {
        const res = await api.get('/keuangan/dashboard/chart/income-vs-expense', { params: { months } })
        const payload = res.data?.data ?? res.data
        this.chartData = mapChartDataFromApi(payload)
      } catch (err) {
        console.error('fetchChartData error:', err)
      } finally {
        this.loading.chart = false
      }
    },

    // ======================================================================
    // Programs
    // ======================================================================

    async fetchPrograms(params = {}) {
      this.loading.programs = true
      try {
        const res = await api.get('/keuangan/programs', { params: { per_page: 100, ...params } })
        const { items, currentPage, lastPage, total, perPage } = extractPaginatedData(res)
        this.programs = items.map(mapProgramFromApi)
        this.pagination.programs = { page: currentPage, lastPage, total, perPage }
      } catch (err) {
        console.error('fetchPrograms error:', err)
      } finally {
        this.loading.programs = false
      }
    },

    async createProgram(data) {
      const res = await api.post('/keuangan/programs', mapProgramToApi(data))
      const created = res.data?.data ?? res.data
      this.programs.unshift(mapProgramFromApi(created))
      return created
    },

    async updateProgram(id, data) {
      const res = await api.put(`/keuangan/programs/${id}`, mapProgramToApi(data))
      const updated = res.data?.data ?? res.data
      const index = this.programs.findIndex(p => p.id === id)
      if (index !== -1) this.programs[index] = mapProgramFromApi(updated)
      return updated
    },

    async deleteProgram(id) {
      await api.delete(`/keuangan/programs/${id}`)
      this.programs = this.programs.filter(p => p.id !== id)
    },

    async fetchProgramPhysicalBalances(id) {
      const res = await api.get(`/keuangan/programs/${id}/physical-balances`)
      return res.data?.data ?? res.data
    },

    async rolloverProgram(id, data) {
      const res = await api.post(`/keuangan/programs/${id}/rollover`, data)
      // Refresh programs after rollover
      await this.fetchPrograms()
      return res.data?.data ?? res.data
    },

    // ======================================================================
    // Transactions
    // ======================================================================

    async fetchTransactions(params = {}) {
      this.loading.transactions = true
      try {
        const res = await api.get('/keuangan/transactions', { params: { per_page: 15, ...params } })
        const { items, currentPage, lastPage, total, perPage } = extractPaginatedData(res)
        this.transactions = items.map(mapTransactionFromApi)
        this.pagination.transactions = { page: currentPage, lastPage, total, perPage }
      } catch (err) {
        console.error('fetchTransactions error:', err)
      } finally {
        this.loading.transactions = false
      }
    },

    async createTransaction(data) {
      const res = await api.post('/keuangan/transactions', mapTransactionToApi(data))
      const created = res.data?.data ?? res.data
      return mapTransactionFromApi(created)
    },

    async updateTransaction(id, data) {
      const res = await api.put(`/keuangan/transactions/${id}`, mapTransactionToApi(data))
      const updated = res.data?.data ?? res.data
      return mapTransactionFromApi(updated)
    },

    async deleteTransaction(id) {
      await api.delete(`/keuangan/transactions/${id}`)
      this.transactions = this.transactions.filter(t => t.id !== id)
    },

    async updateTransactionStatus(id, status) {
      const res = await api.patch(`/keuangan/transactions/${id}/status`, { status })
      const updated = res.data?.data ?? res.data
      const index = this.transactions.findIndex(t => t.id === id)
      if (index !== -1) this.transactions[index] = mapTransactionFromApi(updated)
      return updated
    },

    // ======================================================================
    // Bank/Kas
    // ======================================================================

    async fetchBankKas(params = {}) {
      this.loading.bankKas = true
      try {
        const res = await api.get('/keuangan/bank-kas', { params: { per_page: 50, ...params } })
        const { items, currentPage, lastPage, total, perPage } = extractPaginatedData(res)
        this.bankKasList = items.map(mapBankKasFromApi)
        this.pagination.bankKas = { page: currentPage, lastPage, total, perPage }
      } catch (err) {
        console.error('fetchBankKas error:', err)
      } finally {
        this.loading.bankKas = false
      }
    },

    async createBankKas(data, qrFile = null) {
      const formData = new FormData()
      const mapped = mapBankKasToApi(data)
      Object.entries(mapped).forEach(([key, value]) => {
        if (value !== null && value !== undefined) formData.append(key, value)
      })
      if (qrFile) formData.append('qr_image', qrFile)

      const res = await api.post('/keuangan/bank-kas', formData)
      const created = res.data?.data ?? res.data
      this.bankKasList.unshift(mapBankKasFromApi(created))
      return created
    },

    async updateBankKas(id, data, qrFile = null) {
      let res
      if (qrFile) {
        const formData = new FormData()
        formData.append('_method', 'PUT')
        const mapped = mapBankKasToApi(data)
        Object.entries(mapped).forEach(([key, value]) => {
          if (value !== null && value !== undefined) formData.append(key, value)
        })
        formData.append('qr_image', qrFile)
        res = await api.post(`/keuangan/bank-kas/${id}`, formData)
      } else {
        res = await api.put(`/keuangan/bank-kas/${id}`, mapBankKasToApi(data))
      }
      const updated = res.data?.data ?? res.data
      const index = this.bankKasList.findIndex(bk => bk.id === id)
      if (index !== -1) this.bankKasList[index] = mapBankKasFromApi(updated)
      return updated
    },

    async deleteBankKas(id) {
      await api.delete(`/keuangan/bank-kas/${id}`)
      this.bankKasList = this.bankKasList.filter(bk => bk.id !== id)
    },

    async adjustBalance(bankKasId, data) {
      const res = await api.post(`/keuangan/bank-kas/${bankKasId}/adjustments`, {
        tanggal: data.tanggal || data.date,
        target_saldo: parseFloat(data.targetSaldo || data.target_saldo || 0),
        deskripsi: data.deskripsi || data.description || null,
        program_id: data.programId || data.program_id || null,
      })
      // Refresh the bank_kas list to get updated saldo
      await this.fetchBankKas()
      return res.data?.data ?? res.data
    },

    async fetchBankKasActivities(id) {
      const res = await api.get(`/keuangan/bank-kas/${id}/activities`)
      return res.data?.data ?? res.data
    },

    async fetchBankKasProgramBalances(id) {
      const res = await api.get(`/keuangan/bank-kas/${id}/program-balances`)
      return res.data?.data ?? res.data
    },

    async createTransfer(data) {
      const txData = {
        type: 'transfer',
        name: data.name || 'Mutasi Kas',
        description: data.description || '',
        amount: data.amount,
        date: data.date,
        bankKasAsalId: data.bankKasAsalId || data.bank_kas_asal_id,
        bankKasTujuanId: data.bankKasTujuanId || data.bank_kas_tujuan_id,
        biayaAdmin: data.biayaAdmin || 0,
        status: 'approved',
      }
      return await this.createTransaction(txData)
    },

    // ======================================================================
    // Categories
    // ======================================================================

    async fetchCategories(params = {}) {
      this.loading.categories = true
      try {
        const res = await api.get('/keuangan/categories', { params: { per_page: 100, ...params } })
        const { items } = extractPaginatedData(res)
        this.categories = items.map(mapCategoryFromApi)
      } catch (err) {
        console.error('fetchCategories error:', err)
      } finally {
        this.loading.categories = false
      }
    },

    async createCategory(data) {
      const res = await api.post('/keuangan/categories', mapCategoryToApi(data))
      const created = res.data?.data ?? res.data
      this.categories.push(mapCategoryFromApi(created))
      return created
    },

    async updateCategory(id, data) {
      const res = await api.put(`/keuangan/categories/${id}`, mapCategoryToApi(data))
      const updated = res.data?.data ?? res.data
      const index = this.categories.findIndex(c => c.id === id)
      if (index !== -1) this.categories[index] = mapCategoryFromApi(updated)
      return updated
    },

    async deleteCategory(id) {
      await api.delete(`/keuangan/categories/${id}`)
      this.categories = this.categories.filter(c => c.id !== id)
    },
  }
})
