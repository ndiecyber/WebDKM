export const getStorage = (key) => {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.warn('localStorage is disabled or unavailable')
    return null
  }
}

export const setStorage = (key, val) => {
  try {
    localStorage.setItem(key, val)
  } catch (e) {
    console.warn('localStorage is disabled or unavailable')
  }
}

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn('localStorage is disabled or unavailable')
  }
}
