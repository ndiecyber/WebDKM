/**
 * Helper to process a silhouette image (e.g. black silhouette on white/transparent background)
 * to ensure all white/light pixels are fully transparent and dark pixels are solid black,
 * returning a clean data URL suitable for CSS masks.
 * 
 * @param {string} src - The image source path
 * @returns {Promise<string>} A promise resolving to the processed data URL
 */
export function createSilhouetteMask(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(src)
          return
        }
        ctx.drawImage(img, 0, 0)
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const a = data[i + 3]
          
          // If pixel is near-white or transparent, make it fully transparent
          if (a < 10 || (r > 200 && g > 200 && b > 200)) {
            data[i + 3] = 0
          } else {
            // Otherwise, force it to solid black so it acts as a perfect mask
            data[i] = 0
            data[i + 1] = 0
            data[i + 2] = 0
            data[i + 3] = 255
          }
        }
        
        ctx.putImageData(imgData, 0, 0)
        resolve(canvas.toDataURL())
      } catch (e) {
        console.warn('Failed to process image mask:', e)
        resolve(src) // Fallback to raw src if canvas fails (e.g., CORS)
      }
    }
    img.onerror = () => {
      resolve(src)
    }
  })
}
