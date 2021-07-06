import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('components/Login')
const Home = () => import('components/Home')
const HotWords = () => import('components/hotword/HotWords')

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/home',
      meta: {
        title: '首页'
      },
      component: Home,
      children: [
        {
          path: 'hotWords', // 热词
          component: HotWords
        }
      ]
    }
  ],
  mode: 'history'
})


// 前置守卫(guard)，保证只有登录了才能进入除login之外的页面
router.beforeEach(((to, from, next) => {
  if (to.path !== '/login' && sessionStorage.getItem('Authorization') == null) {
    next('/login')
  }
  // document.title = to.matched[0].meta.title
  next()
}))

// router.afterEach((to, from) => {
//
// })


export default router

