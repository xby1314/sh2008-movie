import Vue from 'vue'
import VueRouter from 'vue-router'


// 导入路由模块
import centerRouter from './routes/center'
import cinemaRouter from './routes/cinema'
import filmRouter from './routes/film'
Vue.use(VueRouter)

const routes = [
  // 注册路由模块

  {
    path: '/',
    redirect: '/film'

  },
  centerRouter,
  cinemaRouter,
  filmRouter

]

const router = new VueRouter({
  mode: 'history',
  // 前缀http://localhost:3000/app/film
  // base: process.env.BASE_URL,
  routes
})

export default router
