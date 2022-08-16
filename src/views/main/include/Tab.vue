<template>
  <el-tabs
    v-model="activeTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="clickTab"
  >
    <el-tab-pane
      v-for="item in activeTabs"
      :key="item.id"
      :label="item.label"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'AdminTab',
  data () {
    return {
      lastActiveValue: 'Index'
    }
  },
  computed: {
    activeTabs: {
      get () {
        return this.$store.state.menus.activeTabs
      },
      set (val) {
        this.$store.state.menus.activeTabs = val
      }
    },
    activeTabsValue: {
      get () {
        return this.$store.state.menus.activeTabsValue
      },
      set (val) {
        this.$store.state.menus.activeTabsValue = val
      }
    }
  },
  methods: {
    removeTab (targetName) {
      if (targetName === 'Index') {
        return
      }
      const tabs = this.activeTabs
      let activeName = this.activeTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.lastActiveValue = activeName
      this.activeTabsValue = activeName
      this.activeTabs = tabs.filter(tab => tab.name !== targetName)
      this.$router.push({ name: activeName })
    },
    clickTab (target) {
      if (target.name === this.lastActiveValue) {
        return
      }
      this.lastActiveValue = target.name
      this.$router.push({ name: target.name })
    }
  }
}
</script>

<style></style>
