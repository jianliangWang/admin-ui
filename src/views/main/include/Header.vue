<template>
  <el-header>
    <strong>Vue-Admin管理后台</strong>
    <div class="header-avatar">
      <el-avatar> user </el-avatar>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'MainHeader',
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        this.$axios.post('/logout').then(res => {
          localStorage.clear()
          sessionStorage.clear()
          this.$store.commit('resetState')
          this.$router.replace('/login')
        })
      } else if (command === 'userInfo') {
        this.$router.push('/home/updatePassword')
      }
    }
  }
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.header-avatar {
  float: right;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.el-header {
  background-color: #3e8bf0;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
</style>
