<template>
  <div>
    <el-row>
      <el-button
        type="primary"
        size="small"
        @click="add()"
        v-if="hasAuthority('system-authorization-add')"
        >新增</el-button
      >
    </el-row>
    <p></p>
    <el-table
      :data="tableData"
      row-key="id"
      border
      stripe
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="code" label="编码" width="180" />
      <el-table-column prop="icon" label="图标" />
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.type === 'Menu'">菜单</el-tag>
          <el-tag
            size="mini"
            type="success"
            v-else-if="scope.row.type === 'Button'"
            >按钮</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="url" label="URL" />
      <el-table-column prop="component" label="组件" />
      <el-table-column prop="order" label="序号" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.status === 'normal'">正常</el-tag>
          <el-tag
            size="mini"
            type="danger"
            v-else-if="scope.row.status === 'disable'"
            >禁用</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="hasAuthority('system-authorization-update')"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            v-if="hasAuthority('system-authorization-delete')"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <AuthorizationAddAndUpdateDialog
      ref="AuthorizationAddAndUpdateDialog"
      @reloadData="reloadData"
    ></AuthorizationAddAndUpdateDialog>
  </div>
</template>

<script>
import AuthorizationAddAndUpdateDialog from './AddAndUpdateDialog.vue'
export default {
  name: 'System-Authorization',
  components: {
    AuthorizationAddAndUpdateDialog
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    // dialog调用重新加载数据
    reloadData (reload) {
      this.loadTableData()
    },
    // 加载表格数据
    loadTableData () {
      this.$axios.post('/authorization/list').then(response => {
        this.tableData = response.data.data
      })
    },
    add () {
      this.showDialog()
    },
    showDialog () {
      this.$refs.AuthorizationAddAndUpdateDialog.dialogVisible = true
      this.$refs.AuthorizationAddAndUpdateDialog.authorizations = this.tableData
    },
    handleDelete () {
      this.common
        .myConfirm('此操作将永久删除权限, 确定要继续吗?')
        .then(() => {
          this.common.myMessageSuccess('删除成功')
          this.loadTableData()
        })
        .catch(() => {})
    },
    handleEdit (id) {
      this.$axios.get('/authorization/getInfo/' + id).then(res => {
        this.$refs.AuthorizationAddAndUpdateDialog.editForm = res.data.data
        this.showDialog()
      })
    }
  }
}
</script>

<style lang="less"></style>
