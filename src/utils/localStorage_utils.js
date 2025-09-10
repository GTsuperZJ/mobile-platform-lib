/**
 * 获取localStorge
 * @returns {Storage}
 */
const initStorage = function () {
  let store = window.top.localStorage
  return store
}

/**
 * 设置本地存储
 * @param key
 * @param value
 */
export const setLocalStorage = function (key, value) {
  let v = value
  if (typeof v === 'object') {
    v = JSON.stringify(v)
    v = 'obj-' + v
  }
  let store = initStorage()
  if (store) store.setItem(key, v)
}

/**
 * 获取本地存储
 * @param key
 */
export const getLocalStorage = function (key) {
  let store = initStorage()
  if (store) {
    let v = store.getItem(key)
    if (!v) return
    if (v.indexOf('obj-') === 0) return JSON.parse(v.slice(4))
    else return v
  }
}

/**
 * 删除本地存储数据
 * @param key
 */
export const rmLocalStorage = function (key) {
  let store = initStorage()
  if (store && key) store.removeItem(key)
}

/**
 * 清空本地所有存储数据
 */
export const clearLocalStorge = function () {
  let store = initStorage()
  if (store) store.clear()
}
