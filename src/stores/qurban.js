import { defineStore } from 'pinia'
import { getStorage, setStorage } from '@/utils/storage'
import api from '@/utils/api'

const parseSafe = (key, defaultVal) => {
  try {
    const val = getStorage(key)
    return val ? JSON.parse(val) : defaultVal
  } catch (e) {
    return defaultVal
  }
}

export const useQurbanStore = defineStore('qurban', {
  state: () => ({
    periods: [],
    selectedPeriodId: null,
    isLoading: false,
    isFetchingPeriods: false,
    settings: parseSafe('qurban_settings', {
      whatsappType: 'global', // 'global' or 'custom'
      selectedGlobalWaId: 1,
      customWaName: '',
      customWaNumber: ''
    })
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
        this.triggerLoading()
      }
    },
    triggerLoading() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 800)
    },
    addPeriod(newPeriod) {
      this.periods.unshift({
        id: newPeriod.id,
        label: newPeriod.label,
        status: 'persiapan'
      })
    },
    setActivePeriod(id) {
      // Set all 'aktif' to 'arsip'
      this.periods.forEach(p => {
        if (p.status === 'aktif') p.status = 'arsip'
      })
      // Set target to 'aktif'
      const target = this.periods.find(p => p.id === id)
      if (target) {
        target.status = 'aktif'
      }
      this.selectedPeriodId = id
    },
    archivePeriod(id) {
      const target = this.periods.find(p => p.id === id)
      if (target) {
        target.status = 'arsip'
      }
    },
    updateSettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings }
      setStorage('qurban_settings', JSON.stringify(this.settings))
    }
  }
})
