import storage from './storage'

const Token = 'HTIMA_TOUTIAO_TOKEN'
export const getToken = () => storage.get(Token)
export const setToken = (value) => storage.set(Token, value)
export const removeToken = () => storage.remove(Token)
