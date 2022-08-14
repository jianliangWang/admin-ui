<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  ></el-pagination>
</template>

<script>
export default {
  name: 'System-Pagination',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.$emit('reloadData')
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(this.currentPage)
      this.$emit('reloadData')
    }
  }
}
</script>

<style>
.el-pagination {
  text-align: right;
}
</style>
