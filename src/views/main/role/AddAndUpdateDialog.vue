<template>
  <el-dialog
    :visible.sync="addAndUpdateDialogVisible"
    width="30%"
    :before-close="handleClose"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <el-form
      :model="roleForm"
      :rules="roleFormRules"
      ref="roleForm"
      label-width="100px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="roleForm.code" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="roleForm.desc" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="roleForm.status"
          placeholder="请选择状态"
          style="width:100"
        >
          <el-option label="正常" value="normal"></el-option>
          <el-option label="禁用" value="disable"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="roleSubmitForm('roleForm')"
        >保存</el-button
      >
      <el-button @click="resetForm('roleForm')">重置</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      addAndUpdateDialogVisible: false,
      roleForm: { id: '', name: '', code: '', desc: '', status: '' },
      roleFormRules: {
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入权限编码', trigger: 'blur' },
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
      this.resetForm('roleForm')
    },
    // 新增的时候触发
    roleSubmitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.roleForm.id) {
            this.sendRequest('/role/update', '修改')
          } else {
            this.sendRequest('/role/add', '添加')
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

<style></style>
