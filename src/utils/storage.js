// 封装本地存储
// 用class类  特性：封装 继承 多态

class Storage {
  get(key) {
    // JSON.parse() 只能转化JSON格式的字符串
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

export default new Storage()
