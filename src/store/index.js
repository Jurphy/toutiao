import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { setToken, getToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 将token取出localStorage ,将字符串转化为对象
    // tokenObj: JSON.parse(localStorage.getItem('HTIMA_TOUTIAO_TOKEN')) || {}
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      // 将token存入vuex
      state.tokenObj = payload
      // 将token存入localStorage ,将对象转化为字符串
      // localStorage.setItem('HTIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
