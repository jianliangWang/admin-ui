<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <h2>欢迎来到xxx管理系统</h2>
      <el-image
        :src="require('@/assets/logo.png')"
        style="height: 180px; width: 180px"
      ></el-image>
      <p>公众号：xxx</p>
      <p>扫描二维码，回复【xxx】获取登录密码</p>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :xl="6" :lg="7">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
        @keyup.enter.native="submitForm('loginForm')"
      >
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input
            v-model="loginForm.username"
            style="width: 100%;"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input
            type="password"
            v-model="loginForm.password"
            style="width: 100%;"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode" style="width: 380px">
          <el-input
            v-model="loginForm.verifyCode"
            style="width: 172px; float: left"
          ></el-input>
          <el-image
            :src="captchaImg"
            class="captchaImg"
            @click="getCaptcha"
          ></el-image>
        </el-form-item>
        <el-form-item style="widht: 380px">
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import qs from 'qs'
export default {
  name: 'admin-login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        verifyCode: '',
        key: ''
      },
      captchaImg: null,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post('/login?' + qs.stringify(this.loginForm))
            .then(res => {
              console.log('为什么没有走登录成功？')
              const jwt = res.headers.authorization
              this.$store.commit('SET_TOKEN', jwt)
              this.$router.push('/home')
            }).catch(error => {
              console.log('接口或处理逻辑出错' + error)
              this.getCaptcha()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getCaptcha () {
      this.$axios.get('/captcha').then(res => {
        this.loginForm.key = res.data.data.key
        this.captchaImg = res.data.data.captchaImg
      })
    }
  },
  created () {
    this.$store.commit('SET_TOKEN', '')
    this.getCaptcha()
  }
}
</script>

<style scoped>
.el-row {
  background-color: #fafafa;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}
.el-divider {
  height: 200px;
}
.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>
