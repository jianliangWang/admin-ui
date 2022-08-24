import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    menuList: [],

    authority: [],

    hasRouter: false,

    activeTabsValue: 'Index',

    activeTabs: [
      {
        name: 'Index',
        label: '首页'
      }
    ]
  },
  getters: {},
  mutations: {
    setMenuList (state, menus) {
      state.menuList = menus
    },

    setAuthority (state, authority) {
      state.authority = authority
    },

    changeHasRouterStatus (state, hasRouter) {
      state.hasRouter = hasRouter
    },

    addTab (state, tabItem) {
      const index = state.activeTabs.findIndex(e => e.name === tabItem.name)
      if (index === -1) {
        state.activeTabs.push(tabItem)
      }
      state.activeTabsValue = tabItem.name
    },
    resetState (state) {
      console.log('resetState方法被调用')
      state.hasRouter = false
      state.activeTabsValue = 'Index'
      state.activeTabs = [
        {
          name: 'Index',
          label: '首页'
        }
      ]
    }
  },
  actions: {},
  modules: {}
}
