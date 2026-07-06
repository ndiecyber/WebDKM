import { defineStore } from 'pinia'
import api from '@/utils/api'

export const useQurbanStore = defineStore('qurban', {
  state: () => ({
    periods: [],
    selectedPeriodId: null,
    isLoading: false,
    isFetchingPeriods: false,
    settings: {
      whatsappType: 'global',
      selectedGlobalWaId: 1,
      customWaName: '',
      customWaNumber: ''
    }
  }),
  getters: {
    activePeriod: (state) => state.periods.find(p => p.status === 'aktif'),
    selectedPeriod: (state) => state.periods.find(p => p.id === state.selectedPeriodId) || state.periods[0],
    isArchiveMode: (state) => {
      const period = state.periods.find(p => p.id === state.selectedPeriodId)
      return period ? period.status === 'arsip' : false
    }
  },
  actions: {
    async fetchPeriods() {
      if (this.isFetchingPeriods) return
      this.isFetchingPeriods = true
      try {
        const response = await api.get('/qurban/admin/periods')
        if (response.data?.success) {
          this.periods = response.data.data.map(p => ({
            ...p,
            label: p.name,
            status: p.is_active ? 'aktif' : 'arsip'
          }))
          
          if (!this.selectedPeriodId && this.periods.length > 0) {
            const active = this.periods.find(p => p.status === 'aktif')
            this.selectedPeriodId = active ? active.id : this.periods[0].id
          }
        }
      } catch (error) {
        console.error('Failed to fetch qurban periods', error)
      } finally {
        this.isFetchingPeriods = false
      }
    },
    changeSelectedPeriod(id) {
      if (this.selectedPeriodId !== id) {
        this.selectedPeriodId = id
      }
    },
    updateSettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings }
    }
  }
})
