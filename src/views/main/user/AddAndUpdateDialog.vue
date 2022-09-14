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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNo">
        <el-input v-model="userForm.phoneNo"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="userForm.status" placeholder="请选择状态">
          <el-option label="正常" value="normal"></el-option>
          <el-option label="禁用" value="disable"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="描述"
          v-model="userForm.remark"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="userSubmitForm('userForm')"
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
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ],
        phoneNo: [
          { required: true, message: '手机号', trigger: 'blur' },
          { min: 8, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 关闭dialog触发
    handleClose (done) {
      this.$emit('reloadData')
      this.addAndUpdateDialogVisible = false
      this.resetForm('userForm')
    },
    // 新增的时候触发
    userSubmitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.userForm.id) {
            this.sendRequest('/system/user/update', '修改')
          } else {
            this.sendRequest('/system/user/add', '添加')
          }
        } else {
          return false
        }
      })
    },
    // 发送请求
    sendRequest (requestUrl, operation) {
      this.$axios.post(requestUrl, this.userForm).then(res => {
        if (res.data.code === 200) {
          this.common.myMessageSuccess(operation + '成功')
          this.handleClose()
        }
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.userForm = {}
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 200px;
}
</style>
