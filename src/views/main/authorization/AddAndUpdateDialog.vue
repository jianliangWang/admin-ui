<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        label-width="100px"
        class="demo-editForm"
      >
        <el-form-item label="上级权限" prop="parentCode">
          <el-select
            v-model="editForm.parentCode"
            placeholder="请选择类型"
            class="authorizationInput"
          >
            <template v-for="authorization in authorizations">
              <el-option
                :label="authorization.name"
                :value="authorization.code"
                :key="authorization.id"
              ></el-option>
              <template :v-if="authorization.children">
                <el-option
                  :label="item.name"
                  :value="item.code"
                  v-for="item in authorization.children"
                  :key="item.id"
                  >{{ '--' + item.name }}</el-option
                >
              </template>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input
            v-model="editForm.name"
            class="authorizationInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input
            v-model="editForm.code"
            class="authorizationInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input
            v-model="editForm.icon"
            class="authorizationInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="editForm.type"
            placeholder="请选择类型"
            class="authorizationInput"
          >
            <el-option label="菜单" value="menu"></el-option>
            <el-option label="按钮" value="button"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input
            v-model="editForm.url"
            class="authorizationInput"
          ></el-input>
        </el-form-item>

        <el-form-item label="组件" prop="component">
          <el-input
            v-model="editForm.component"
            class="authorizationInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="editForm.status"
            placeholder="请选择状态"
            class="authorizationInput"
          >
            <el-option label="正常" value="normal"></el-option>
            <el-option label="禁用" value="disable"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('editForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('editForm')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.editForm.id !== '') {
            this.sendRequest('/authorization/update', '修改')
          } else {
            this.sendRequest('/authorization/add', '添加')
          }
        } else {
          return false
        }
      })
    },
    sendRequest (requestUrl, operation) {
      this.$axios
        .post(requestUrl, this.editForm)
        .then(res => {
          if (res.data.code === 200) {
            this.common.myMessageSuccess(operation + '成功')
            this.handleClose()
            this.$emit('reloadData', 'reload')
          }
        })
        .catch(error => {
          this.common.myMessageFaild(operation + '失败' + error)
        })
    },
    handleClose (done) {
      this.dialogVisible = false
      this.resetForm('editForm')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.editForm = {}
    }
  },

  data () {
    return {
      authorizations: [],
      dialogVisible: false,
      editForm: {
        id: '',
        name: '',
        parentId: '',
        code: '',
        type: '',
        status: ''
      },
      editFormRules: {
        parentId: [
          { required: true, message: '全选择上级权限', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入权限编码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态' }]
      }
    }
  }
}
</script>

<style scoped>
.authorizationInput {
  width: 300px;
}
</style>
