<template>
  <!-- 分页 -->
  <div class="page">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="tablePage.pageNum"
      :page-size="tablePage.pageSize"
      :page-sizes="pageSizes"
      :total="tablePage.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableDatas: [],
      tablePage: {
        pageNum: 1, // 第几页
        pageSize: 5, // 每页多少条
        total: null, // 总记录数
      },
      pageSizes: [10, 20, 30],
    };
  },
  methods: {
    handlePageChange(currentPage) {
      this.tablePage.pageNum = currentPage;
      // 在此刷新数据
      //请求宿舍分页
      this.$axios({
        url: "/paging",
        method: "get",
        params: {
          pageNum: this.tablePage.pageNum,
        },
      }).then((res) => {
        this.tableDatas = res.data.data;
      });
    },
    handleSizeChange(pageSize) {
      this.tablePage.pageSize = pageSize;
      // 在此刷新数据
    },
  },
  created() {
    //请求第一页数据
    this.handlePageChange(1);
    //请求宿舍管理的数据
    this.$axios({
      url: "/dormitoryManagement",
      method: "get",
    }).then((res) => {
      this.tableData = res.data.data;
    });
  },
};
</script>

<style scoped>
.page {
  position: absolute;
  bottom: 20px;
  width: 1100px;
  height: 50px;
}

.page:deep(.el-pagination) {
  justify-content: center;
}
</style>
