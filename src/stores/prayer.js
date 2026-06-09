import { defineStore } from 'pinia'

export const usePrayerStore = defineStore('prayer', {
  state: () => ({
    nextPrayer: null,
    hijriDate: ''
  }),
  actions: {
    setNextPrayer(prayer) {
      this.nextPrayer = prayer
    },
    setHijriDate(dateStr) {
      this.hijriDate = dateStr
    }
  }
})
