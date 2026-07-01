import { defineStore } from 'pinia'

export const useQurbanStore = defineStore('qurban', {
  state: () => ({
    periods: [
      { id: '1447', label: '1447 H / 2026 M', status: 'aktif' },
      { id: '1446', label: '1446 H / 2025 M', status: 'arsip' },
      { id: '1445', label: '1445 H / 2024 M', status: 'arsip' }
    ],
    selectedPeriodId: '1447',
    isLoading: false
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
    }
  }
})
