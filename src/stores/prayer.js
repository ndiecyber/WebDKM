import { defineStore } from 'pinia'

export const usePrayerStore = defineStore('prayer', {
  state: () => ({
    nextPrayer: null
  }),
  actions: {
    setNextPrayer(prayer) {
      this.nextPrayer = prayer
    }
  }
})
