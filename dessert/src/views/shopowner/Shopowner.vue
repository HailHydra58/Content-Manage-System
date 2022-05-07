<template>
  <TopNav />
  <div class="maxBox">
    <el-row>
      <!-- 左侧nav -->
      <el-col :span="4">
        <Left />
      </el-col>
      <!-- 右侧总内容 -->
      <el-col :span="20">
        <Right />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Left from "./childComps/Left.vue";
import Right from "./childComps/Right.vue";
import TopNav from "./childComps/TopNav.vue";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    Left,
    TopNav,
    Right,
  },
  created() {},
};
</script>

<style scoped>
.maxBox:deep(.el-row) {
  /* width: 100%; */
  height: calc(100vh - 78px);
}
</style>
