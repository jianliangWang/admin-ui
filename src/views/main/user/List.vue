<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="query"
          v-if="hasAuthority('system-user-list')"
          >查询</el-button
        >
      </el-form-item>
      <el-button
        type="primary"
        @click="add()"
        v-if="hasAuthority('system-user-add')"
        >新增</el-button
      >
      <el-button
        type="primary"
        :disabled="batchBtnDisable"
        @click="handleStatusBatch('normal')"
        v-if="hasAuthority('system-user-batchEnable')"
        >批量启用</el-button
      >
      <el-button
        type="danger"
        :disabled="batchBtnDisable"
        @click="handleStatusBatch('disable')"
        v-if="hasAuthority('system-user-batchDisable')"
        >批量禁用</el-button
      >
      <el-button
        type="danger"
        :disabled="batchBtnDisable"
        @click="handleBatchDelete"
        v-if="hasAuthority('system-user-batchDelete')"
        >批量删除</el-button
      >
    </el-form>
    <el-table
      ref="userTable"
      :data="tableData"
      border
      @select="handleSelectChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
      ></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180">
        <template slot-scope="scope">
          <el-tag
            :key="item.name"
            type="info"
            size="small"
            v-for="item in scope.row.roles"
            >{{ item.name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="phoneNo"
        label="手机号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="lastLoginDate"
        label="上次登录日期"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
        width="180"
      ></el-table-column>
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
      <el-table-column prop="remark" label="描述"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleSetRole(scope.row.id)"
            v-if="hasAuthority('system-user-setRole')"
            >分配角色</el-button
          >
          <el-button
            type="text"
            @click="handleEdit(scope.row.id)"
            v-if="hasAuthority('system-user-update')"
            >修改</el-button
          >
          <el-button
            type="text"
            @click="handleDelete(scope.row.id)"
            v-if="hasAuthority('system-user-delete')"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Pagination ref="pagination" @reloadData="loadTableData"></Pagination>
    <AddAndUpdateDialog
      ref="addAndUpdateDialog"
      @reloadData="loadTableData"
    ></AddAndUpdateDialog>

    <UserRoleDialog
      ref="userRoleDialog"
      @reloadData="loadTableData"
    ></UserRoleDialog>
  </div>
</template>

<script>
import AddAndUpdateDialog from './AddAndUpdateDialog.vue'
import Pagination from '@/views/main/include/Pagination'
import UserRoleDialog from './UserRoleDialog.vue'
import qs from 'qs'

export default {
  name: 'UserList',
  data () {
    return {
      batchBtnDisable: true,
      selectIds: [],
      tableData: [],
      searchForm: {
        username: ''
      }
    }
  },
  methods: {
    query () {
      this.$axios
        .post(
          '/system/user/list?' +
            qs.stringify({
              username: this.searchForm.username,
              currentPage: this.$refs.pagination
                ? this.$refs.pagination.currentPage
                : 1,
              pageSize: this.$refs.pagination
                ? this.$refs.pagination.pageSize
                : 10
            })
        )
        .then(response => {
          this.tableData = response.data.data.records
          this.$refs.pagination.total = response.data.data.total
          this.$refs.pagination.pageSize = response.data.data.size
          this.$refs.pagination.currentPage = response.data.data.current
        })
    },
    loadTableData () {
      this.selectIds = []
      this.batchBtnDisable = true
      this.query()
    },
    // 新增
    add () {
      this.showAddAndUpdateDialog()
    },
    showAddAndUpdateDialog () {
      this.$refs.addAndUpdateDialog.addAndUpdateDialogVisible = true
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
    handleDelete (id) {
      this.selectIds.push(id)
      this.handleBatchDelete()
    },
    // 批量禁用或启用
    handleStatusBatch (status) {
      console.log(status)
      this.common
        .myConfirm('确定要操作吗？')
        .then(() => {
          this.batchOperation(
            '/system/user/updateStatus/' + status,
            JSON.stringify(this.selectIds),
            '批量操作成功'
          )
        })
        .catch(() => {})
    },
    // 批量删除
    handleBatchDelete () {
      this.common
        .myConfirm('此操作将永久删除角色, 确定要继续吗?')
        .then(() => {
          this.batchOperation(
            'system/user/delete',
            JSON.stringify(this.selectIds),
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
      this.$axios.get('/system/user/getInfo/' + id).then(res => {
        console.log(res)
        this.$refs.addAndUpdateDialog.userForm = res.data.data
        this.showAddAndUpdateDialog()
      })
    },
    // 设置角色
    handleSetRole (id) {
      this.$axios.get('/system/user/getUserRole/' + id).then(res => {
        this.$refs.userRoleDialog.roles = res.data.data.roleList
        this.$refs.userRoleDialog.userId = id
        this.$refs.userRoleDialog.checkedRoles = res.data.data.ckRoleIds
        this.$refs.userRoleDialog.userRoleDialogVisible = true
      })
    }
  },
  created () {
    // 加载数据
    this.loadTableData()
  },
  components: {
    AddAndUpdateDialog,
    Pagination,
    UserRoleDialog
  }
}
</script>

<style scoped></style>
