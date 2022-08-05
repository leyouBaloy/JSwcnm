import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
// import { VueJsonp } from 'vue-jsonp'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
// Vue.use(VueJsonp)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
