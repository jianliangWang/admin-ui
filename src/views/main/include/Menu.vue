<template>
  <el-aside width="200px">
    <el-menu
      :unique-opened="true"
      :default-active="this.$store.state.menus.activeTabsValue"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="Index" route="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :index="menu.name" v-for="menu in menuList" :key="menu.id">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.label }}</span>
        </template>
        <el-menu-item
          :index="item.name"
          v-for="item in menu.children"
          :key="item.id"
          :route="item.url"
          @click="addTab(item)"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {}
  },
  methods: {
    addTab (menu) {
      this.$store.commit('addTab', menu)
    }
  },
  computed: {
    menuList () {
      return this.$store.state.menus.menuList
    }
  }
}
</script>

<style>
.el-menu-vertical-demo {
  height: 100%;
}
</style>
