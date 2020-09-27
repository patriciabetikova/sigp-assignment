export const store = (key) => (val) => {
  localStorage.setItem(key, JSON.stringify(val))
}

export const retrieve = (key) => JSON.parse(localStorage.getItem(key))
