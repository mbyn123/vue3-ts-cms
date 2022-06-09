const prefix = 'cms-'

export const setCache = <T>(key: string, value: T) => {
  window.localStorage.setItem(prefix + key, JSON.stringify(value))
}

export const getCache = (key: string) => {
  const value = window.localStorage.getItem(prefix + key)
  if (value) {
    return JSON.parse(value)
  }
}

export const deleteCache = (key: string) => {
  window.localStorage.removeItem(prefix + key)
}

export const clearCache = () => {
  window.localStorage.clear()
}
