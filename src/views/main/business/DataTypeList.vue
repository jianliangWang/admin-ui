<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="数据类型">
        <el-input v-model="formInline.code" placeholder="数据类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="query"
          v-if="hasAuthority('system-business-data-type-list')"
          >查询</el-button
        >
      </el-form-item>
      <el-button
        type="primary"
        @click="add()"
        v-if="hasAuthority('system-business-data-type-add')"
        >新增</el-button
      >
    </el-form>
    <el-table
      ref="systemBusinessDataTypeTable"
      :data="tableData"
      border
      @select="handleSelectChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="name"
        label="类型名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="code" label="编码" width="180"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="create_date" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleEdit(scope.row.id)"
            v-if="hasAuthority('system-business-data-type-update')"
            >修改</el-button
          >
          <el-button
            type="text"
            @click="handleDelete(scope.row.id)"
            v-if="hasAuthority('system-business-data-type-delete')"
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
  </div>
</template>

<script>
import Pagination from '@/views/main/include/Pagination'
import qs from 'qs'

export default {
  name: 'System-Data-Type',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    query () {
      this.$axios
        .post(
          '/system/business/type/list?' +
            qs.stringify({
              code: this.formInline.code,
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
          this.$refs.pagination.pageSize = response.data.data.pageSize
          this.$refs.pagination.currentPage = response.data.data.currentPage
        })
    },
    loadTableData () {
      this.query()
    },
    // 新增
    add () {
      console.log('新增')
    },
    // 删除的时候触发
    handleDelete (id) {
      this.selectIds.push(id)
      this.handleBatchDelete()
    },
    // 编辑
    handleEdit (id) {
      console.log(id)
      this.$axios.get('/system/role/getInfo/' + id).then(res => {
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
