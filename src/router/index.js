import Vue from 'vue'
import VueRouter from 'vue-router'


// 导入路由模块
import centerRouter from './routes/center'
import cinemaRouter from './routes/cinema'
import filmRouter from './routes/film'
import detailRouter from './routes/detail'
import cityRouter from './routes/city'
import vuexRouter from './routes/vuex'
import loginRouter from './routes/login'
Vue.use(VueRouter)

const routes = [
  // 注册路由模块

  {
    path: '/',
    redirect: '/film'

  },
  centerRouter,
  cinemaRouter,
  filmRouter,
  detailRouter,
  cityRouter,
  vuexRouter,
  loginRouter

]

const router = new VueRouter({
  mode: 'history',
  // 前缀http://localhost:3000/app/film
  // base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  let arr = [
    //  存需要登录的页面地址
    "/cinema",
    // "/film/nowplaying",
  ]
  if (arr.includes(to.path)) {
    // 返回真则在(需要登录判断)
    if (localStorage.getItem("_token")) {
      next()
    } else {
      next({ path: '/login', query: { refer: encodeURI(to.fullPath) } })
    }
  } else {
    // 不在(需要登录)
    next()
  }

})

export default router
