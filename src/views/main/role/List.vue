<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="角色编码">
        <el-input v-model="formInline.code" placeholder="角色编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="query"
          v-if="hasAuthority('system-role-list')"
          >查询</el-button
        >
      </el-form-item>
      <el-button
        type="primary"
        @click="add()"
        v-if="hasAuthority('system-role-add')"
        >新增</el-button
      >
      <el-button
        type="primary"
        :disabled="batchBtnDisable"
        @click="handleStatusBatch('enable')"
        v-if="hasAuthority('system-role-batchEnable')"
        >批量启用</el-button
      >
      <el-button
        type="danger"
        :disabled="batchBtnDisable"
        @click="handleStatusBatch('disable')"
        v-if="hasAuthority('system-role-batchDisable')"
        >批量禁用</el-button
      >
      <el-button
        type="danger"
        :disabled="batchBtnDisable"
        @click="handleBatchDelete"
        v-if="hasAuthority('system-role-batchDelete')"
        >批量删除</el-button
      >
    </el-form>
    <el-table
      ref="roleTable"
      :data="tableData"
      border
      @select="handleSelectChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="code" label="编码" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
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
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleAuthority(scope.row)"
            v-if="hasAuthority('system-role-setAuth')"
            >分配权限</el-button
          >
          <el-button
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="hasAuthority('system-role-update')"
            >修改</el-button
          >
          <el-button
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            v-if="hasAuthority('system-role-delete')"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Pagination ref="pagination"></Pagination>

    <AddAndUpdateDialog
      ref="addAndUpdateDialog"
      @reloadData="loadTableData"
    ></AddAndUpdateDialog>
    <RoleAuthorityDialog ref="roleAuthorityDialog"></RoleAuthorityDialog>
  </div>
</template>

<script>
import AddAndUpdateDialog from './AddAndUpdateDialog.vue'
import RoleAuthorityDialog from './RoleAuthorityDialog.vue'
import Pagination from '@/views/main/include/Pagination'

export default {
  name: 'Admin-Role',
  data () {
    return {
      batchBtnDisable: true,
      selectIds: [],
      tableData: [],
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    query () {
      console.log('query!')
    },
    loadTableData () {
      this.$axios.post('/role/list').then(response => {
        this.tableData = response.data.data.records
        this.$refs.pagination.total = response.data.data.total
        this.$refs.pagination.pageSize = response.data.data.pageSize
        this.$refs.pagination.currentPage = response.data.data.currentPage
      })
    },
    // 新增
    add () {
      this.showAddAndUpdateDialog()
    },
    showAddAndUpdateDialog () {
      this.$refs.addAndUpdateDialog.addAndUpdateDialogVisible = true
    },
    // 授权
    handleAuthority (row) {
      console.log(row.id)
      this.$refs.roleAuthorityDialog.roleId = row.id
      this.$refs.roleAuthorityDialog.roleAuthorityDialogVisible = true
    },
    // 选中、取消checkbox触发事件
    handleSelectChange (selection) {
      this.selectIds = []
      if (selection.length > 0) {
        this.batchBtnDisable = false
        selection.forEach(element => {
          this.selectIds.push(element.id)
        })
      } else {
        this.batchBtnDisable = true
      }
    },
    // 删除的时候触发
    handleDelete () {
      this.common
        .myConfirm('此操作将永久删除角色, 确定要继续吗?')
        .then(() => {
          this.common.myMessageSuccess('删除成功')
          this.loadTableData()
        })
        .catch(() => {})
    },
    handleBatchEnable () {
      this.common
        .myConfirm('确定要启用吗？')
        .then(() => {
          this.common.myMessageSuccess('启用成功')
          this.loadTableData()
        })
        .catch(() => {})
    },
    // 批量禁用或启用
    handleStatusBatch (status) {
      this.common
        .myConfirm('确定要操作吗？')
        .then(() => {
          this.batchOperation(
            '/role/updateStatus',
            {
              status: status,
              ids: this.selectIds
            },
            '批量操作成功'
          )
        })
        .catch(() => {})
    },
    // 批量删除
    handleBatchDelete () {
      console.log(this.selectIds)
      this.common
        .myConfirm('此操作将永久删除角色, 确定要继续吗?')
        .then(() => {
          this.batchOperation(
            '/role/batchDelete',
            { ids: this.selectIds },
            '删除成功'
          )
        })
        .catch(() => {})
    },
    batchOperation (url, option, message) {
      this.$axios
        .post(url, option)
        .then(res => {
          if (res.status === 200) {
            this.common.myMessageSuccess(message)
            this.loadTableData()
          } else {
            this.common.myMessageFaild('操作失败' + res.status)
          }
        })
        .catch(() => {})
    },
    // 编辑
    handleEdit (id) {
      this.$axios.post('/role/getInfo/' + id).then(res => {
        this.$refs.addAndUpdateDialog.roleForm = res.data.data
        this.showAddAndUpdateDialog()
      })
    }
  },
  created () {
    // 加载数据
    this.loadTableData()
  },
  components: {
    AddAndUpdateDialog,
    RoleAuthorityDialog,
    Pagination
  }
}
</script>

<style>
.el-pagination {
  margin-top: 10;
  text-align: right;
}
</style>
