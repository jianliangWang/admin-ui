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
      <el-checkbox
        v-for="role in roles"
        :label="role.roleId"
        :key="role.roleId"
        >{{ role.roleName }}</el-checkbox
      >
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
const roleOption = [
  { roleId: 1, roleName: '管理员' },
  { roleId: 2, roleName: '普通用户' },
  { roleId: 3, roleName: '访客' }
]
export default {
  data () {
    return {
      userId: null,
      userRoleDialogVisible: false,
      checkAll: false,
      checkedRoles: [],
      roles: roleOption,
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
      console.log(this.checkedRoles)
    }
  }
}
</script>

<style></style>
