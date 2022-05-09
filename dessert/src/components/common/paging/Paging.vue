<template>
  <!-- 分页 -->
  <div class="page">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="pageNum"
      :page-size="tablePage.pageSize"
      :total="tablePage.total"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    tablePage: {
      type: Object,
      default: {
        pageSize: 5, // 每页多少条
        total: 1000, // 总记录数
      },
    },
  },
  data() {
    return {
      pageNum: 1, // 第几页
    };
  },
  methods: {
    //更换页面调用
    handlePageChange(currentPage) {
      this.pageNum = currentPage;
      this.$emit("changePageNum", currentPage);
    },
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
