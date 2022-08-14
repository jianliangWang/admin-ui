<template>
  <el-dialog
    :visible.sync="roleAuthorityDialogVisible"
    width="30%"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      ref="tree"
      check-strictly
      :default-expand-all="false"
      :default-checked-keys="checkKey"
      @check="checkeTree"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="getCheckedKeys"
        v-if="hasAuthority('system-role-setAuth-save')"
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
      roleId: null,
      roleAuthorityDialogVisible: false,
      data: [],
      checkKey: []
    }
  },
  methods: {
    getCheckedKeys () {
      console.log(this.checkKey)
      this.$axios
        .post('/system/role/setAuth/' + this.roleId, this.checkKey)
        .then(res => {
          this.checkKey = []
          this.$refs.tree.setCheckedKeys([])
          this.$emit('reloadData')
          this.common.myMessageSuccess('操作成功')
          this.roleAuthorityDialogVisible = false
        })
    },
    checkeTree (data) {
      let thisNode = this.$refs.tree.getNode(data.id) // 获取当前节点
      this.checkKey = this.$refs.tree.getCheckedKeys() // 获取已勾选节点的key值

      if (thisNode.checked) {
        // 当前节点若被选中
        for (let i = thisNode.level; i > 1; i--) {
          // 判断是否有父级节点
          if (!thisNode.parent.checked) {
            // 父级节点未被选中，则将父节点替换成当前节点，往上继续查询，并将此节点key存入keys数组
            thisNode = thisNode.parent
            this.checkKey.push(thisNode.data.id)
          }
        }
      }
      this.$refs.tree.setCheckedKeys(this.checkKey) // 将所有keys数组的节点全选中
    },
    handlerCancle () {
      this.checkKey = []
      this.$refs.tree.setCheckedKeys([])
      this.roleAuthorityDialogVisible = false
    }
  }
}
</script>

<style></style>
