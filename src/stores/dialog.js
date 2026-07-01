import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    isOpen: false,
    title: '',
    message: '',
    type: 'confirm', // 'alert', 'confirm', 'prompt'
    inputPlaceholder: '',
    confirmText: 'Konfirmasi',
    cancelText: 'Batal',
    resolvePromise: null,
    rejectPromise: null
  }),
  actions: {
    open(options) {
      this.title = options.title || 'Konfirmasi'
      this.message = options.message || ''
      this.type = options.type || 'confirm'
      this.inputPlaceholder = options.inputPlaceholder || 'Masukkan nilai...'
      this.confirmText = options.confirmText || 'Konfirmasi'
      this.cancelText = options.cancelText || 'Batal'
      this.isOpen = true

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },
    confirm(val = true) {
      if (this.resolvePromise) {
        this.resolvePromise(val)
      }
      this.close()
    },
    cancel() {
      if (this.type === 'prompt') {
        if (this.resolvePromise) this.resolvePromise(null)
      } else {
        if (this.resolvePromise) this.resolvePromise(false)
      }
      this.close()
    },
    close() {
      this.isOpen = false
      this.resolvePromise = null
      this.rejectPromise = null
    }
  }
})
