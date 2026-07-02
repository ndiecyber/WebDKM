import { useToastStore } from '@/stores/toast'

/**
 * Validates the file size against a maximum limit (in Megabytes).
 * If the file exceeds the limit, it displays a toast error and returns false.
 * 
 * @param {File} file - The file object from the input event.
 * @param {number} maxSizeMB - Maximum allowed size in Megabytes (default: 8)
 * @returns {boolean} - True if valid, false if invalid.
 */
export const validateFileSize = (file, maxSizeMB = 8) => {
  if (!file) return false
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  
  if (file.size > maxSizeBytes) {
    try {
      const toast = useToastStore()
      toast.addToast(`Ukuran gambar maksimal ${maxSizeMB} MB`, 'error')
    } catch (e) {
      alert(`Ukuran gambar maksimal ${maxSizeMB} MB`)
    }
    return false
  }
  
  return true
}
