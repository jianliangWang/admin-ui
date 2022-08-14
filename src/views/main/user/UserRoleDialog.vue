<template>
  <el-dialog
    :visible.sync="userRoleDialogVisible"
    width="30%"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-checkbox-group
      v-model="checkedRoles"
      @change="handleCheckedRolesChange"
    >
      <el-checkbox v-for="role in roles" :label="role.id" :key="role.id">{{
        role.name
      }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="getCheckedKeys"
        v-if="hasAuthority('system-user-setRole-save')"
        >确定</el-button
      >
      <el-button @click="handlerCancle">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      userId: null,
      userRoleDialogVisible: false,
      checkAll: false,
      checkedRoles: [],
      roles: [],
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckedRolesChange (values) {
      this.checkedRoles = []
      values.forEach(element => {
        this.checkedRoles.push(element)
      })
    },
    handlerCancle () {
      this.checkedRoles = []
      this.userRoleDialogVisible = false
    },
    getCheckedKeys () {
      this.$axios
        .post('/system/user/setRole/' + this.userId, this.checkedRoles)
        .then(res => {
          this.$emit('reloadData')
          this.checkedRoles = []
          this.userRoleDialogVisible = false
          this.common.myMessageSuccess('操作成功')
        })
    }
  }
}
</script>

<style></style>
