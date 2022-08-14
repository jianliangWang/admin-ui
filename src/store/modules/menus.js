import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    menuList: [],

    authority: [],

    hasRouter: true,

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

    addTab (state, tab) {
      console.log('state:' + tab.name)
      const index = state.activeTabs.findIndex(e => e.name === tab.name)
      if (index === -1) {
        state.activeTabs.push({
          name: tab.name,
          label: tab.label
        })
      }
      state.activeTabsValue = tab.name
    },
    resetState (state) {
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
