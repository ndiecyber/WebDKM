import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: []
  }),
  actions: {
    addToast(message, type = 'success', action = null) {
      const id = Date.now()
      this.toasts.push({ id, message, type, action })
      
      // Auto remove after 3.5 seconds
      setTimeout(() => {
        this.removeToast(id)
      }, 3500)
    },
    removeToast(id) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    }
  }
})
