import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入iconfont.css
import '@/assets/fonts/iconfont.css'
// 引入Vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入amfe-flexible
import 'amfe-flexible/index.min.js'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
