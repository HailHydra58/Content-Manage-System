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
import Right from "./childComps/Right.vue";
import TopNav from "@/views/administratorInterface/childComps/TopNav.vue";

export default {
  name: "学生管理",
  components: {
    Left,
    TopNav,
    Right,
  },
  data() {
    return {
      leftList: ["公告主页", "学生管理"],
    };
  },
};
</script>

<style></style>
