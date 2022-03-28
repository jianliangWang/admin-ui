<template>
  <el-dialog
    :visible.sync="addAndUpdateDialogVisible"
    width="30%"
    :before-close="handleClose"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <el-form
      :model="userForm"
      :rules="userFormRules"
      ref="userForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="userForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="userForm.status" placeholder="请选择状态">
          <el-option label="正常" value="normal"></el-option>
          <el-option label="禁用" value="disable"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="roleSubmitForm('userForm')"
        >保存</el-button
      >
      <el-button @click="resetForm('userForm')">重置</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      addAndUpdateDialogVisible: false,
      userForm: { id: '', name: '', code: '', desc: '', status: '' },
      userFormRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输密码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 关闭dialog触发
    handleClose (done) {
      this.addAndUpdateDialogVisible = false
      this.resetForm('userForm')
    },
    // 新增的时候触发
    roleSubmitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.userForm.id) {
            this.sendRequest('/user/update', '修改')
          } else {
            this.sendRequest('/user/add', '添加')
          }
        } else {
          return false
        }
      })
    },
    // 发送请求
    sendRequest (requestUrl, operation) {
      this.$axios
        .post(requestUrl, this.roleForm)
        .then(res => {
          if (res.data.code === 200) {
            this.common.myMessageSuccess(operation + '成功')
            this.handleClose()
            this.$emit('loadTableData')
          }
        })
        .catch(error => {
          this.common.myMessageFaild(operation + '失败' + error)
        })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.roleForm = {}
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 200px;
}
</style>
