import Vue from 'vue'
import store from '@/store'
import axios from '../axios'
import VueRouter from 'vue-router'
import LoginVue from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginVue
  },
  {
    path: '/login',
    name: 'admin-login',
    component: LoginVue
  },
  {
    path: '/home',
    name: 'Admin-Home',
    component: () => import('@/views/main/AdminHome.vue'),
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: { label: 'Index' },
        component: () => import('@/views/main/include/Index.vue')
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  const hasRouter = store.state.menus.hasRouter
  console.log('hasRouter:' + hasRouter)
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else if (!token) {
    next({ path: '/login' })
  }
  if (token && !hasRouter) {
    store.commit('changeHasRouterStatus', true)
    axios
      .post('/system/user/getLeftMenus')
      .then(res => {
        const menus = res.data.data
        //  现有路由
        const newRoutes = router.options.routes
        menus.forEach(menu => {
          if (menu.children) {
            menu.children.forEach(e => {
              // 转换成路由
              const route = menuToRoute(e)
              if (route) {
                newRoutes[2].children.push(route)
              }
            })
          }
        })
        router.addRoutes(newRoutes)
        // 只显示菜单
        const showMenu = menus.filter(item => {
          const childMenu = item.children.filter(c => c.type === 'Menu')
          item.children = childMenu
          return item
        })
        store.commit('setMenuList', showMenu)
        const authorities = []

        const authDataFor = authData => {
          authData.forEach(item => {
            authorities.push(item.code)
            if (item.children.length > 0) {
              authDataFor(item.children)
            }
          })
        }
        authDataFor(menus)
        store.commit('setAuthority', authorities)
        next({
          ...to,
          replace: true
        })
      })
  }
  next()
})

// 导航转换成路由
const menuToRoute = menu => {
  if (!menu.component) {
    return null
  }
  const route = {
    name: menu.name,
    path: menu.url,
    meta: {
      icon: menu.icon,
      label: menu.label
    },
    component: () => import('@/views/' + menu.component + '.vue')
  }
  return route
}

export default router
