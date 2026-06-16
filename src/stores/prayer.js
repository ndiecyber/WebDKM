import { defineStore } from 'pinia'

export const usePrayerStore = defineStore('prayer', {
  state: () => ({
    nextPrayer: null,
    hijriDate: '',
    gregorianDate: '',
    isLocationEnabled: false
  }),
  actions: {
    setNextPrayer(prayer) {
      this.nextPrayer = prayer
    },
    setHijriDate(dateStr) {
      this.hijriDate = dateStr
    },
    setGregorianDate(dateStr) {
      this.gregorianDate = dateStr
    },
    setLocationEnabled(enabled) {
      this.isLocationEnabled = enabled
    }
  },
  getters: {
    displayDate(state) {
      return state.hijriDate || state.gregorianDate
    }
  }
})
