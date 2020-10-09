import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// axios 体验
// 导入axios
import axios from "axios"
// 设置请求的基础域名
axios.defaults.baseURL = 'https://m.maizuo.com'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers = {
    "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598087896889693885431809","bc":"110100"}',
    "X-Host": "mall.film-ticket.film.list",
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.get("gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=8591124")
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
