<template>
  <TopNav />
  <div class="maxBox">
    <el-row>
      <!-- 左侧nav -->
      <el-col :span="4">
        <Left :list="leftList" />
      </el-col>
      <!-- 右侧总内容 -->
      <el-col :span="20">
        <Right />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Left from "@/components/content/left/Left.vue";
import Right from "@/views/administratorInterface/childComps/Right.vue";
import TopNav from "@/views/administratorInterface/childComps/TopNav.vue";

export default {
  data() {
    return {
      leftList: ["公告主页", "宿舍管理", "学生管理", "公告管理", "管理员管理"],
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
