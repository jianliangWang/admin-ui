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
      default-expand-all
      @check="checkeTree"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="getCheckedKeys"
        v-if="hasAuthority('system:role-authorization-save')"
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
      data: [
        {
          id: 1,
          label: '首页',
          children: []
        },
        {
          id: 2,
          label: '系统管理',
          children: [
            {
              id: 5,
              label: '用户管理'
            },
            {
              id: 6,
              label: '角色管理'
            },
            {
              id: 7,
              label: '权限管理'
            }
          ]
        }
      ]
    }
  },
  methods: {
    getCheckedKeys () {},
    checkeTree (data) {
      let thisNode = this.$refs.tree.getNode(data.id) // 获取当前节点
      const keys = this.$refs.tree.getCheckedKeys() // 获取已勾选节点的key值

      if (thisNode.checked) {
        // 当前节点若被选中
        for (let i = thisNode.level; i > 1; i--) {
          // 判断是否有父级节点
          if (!thisNode.parent.checked) {
            // 父级节点未被选中，则将父节点替换成当前节点，往上继续查询，并将此节点key存入keys数组
            thisNode = thisNode.parent
            keys.push(thisNode.data.id)
          }
        }
      }
      this.$refs.tree.setCheckedKeys(keys) // 将所有keys数组的节点全选中
    },
    handlerCancle () {
      this.$refs.tree.setCheckedKeys([])
      this.roleAuthorityDialogVisible = false
    }
  }
}
</script>

<style></style>
