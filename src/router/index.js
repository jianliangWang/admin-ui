import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import VueRouter from 'vue-router'
import LoginVue from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'admin-login',
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.menus.hasRouter) {
    axios
      .post('/system/menu/list', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(res => {
        const menus = res.data.data
        const newRoutes = router.options.routes
        menus.forEach(menu => {
          if (menu.children) {
            menu.children.forEach(e => {
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
        store.commit('changeHasRouterStatus', true)
      })
  }
  next()
})

const menuToRoute = menu => {
  if (!menu.component) {
    return null
  }
  const route = {
    name: menu.name,
    path: menu.url,
    meta: { label: menu.label },
    component: () => import('@/views/' + menu.component + '.vue')
  }
  return route
}

export default router
