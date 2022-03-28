import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

require('./globalFuncation')

Vue.config.productionTip = false

require('./mock.js')
const common = require('./common')

// 定义全局axios
Vue.prototype.$axios = axios
Vue.prototype.common = common
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
