<template>
  <el-container>
    <Menu></Menu>
    <el-container direction="vertical">
      <Header></Header>
      <el-main style="padding: 0;">
        <Tab></Tab>
        <div style="margin: 0 15px;">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from '@/views/main/include/Menu'
import Header from '@/views/main/include/Header'
import Tab from '@/views/main/include/Tab'
export default {
  name: 'AdminHome',
  components: {
    Menu,
    Header,
    Tab
  },
  created () {
    if (!(this.$router.currentRoute.path === '/index')) {
      this.$router.push('/index')
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
