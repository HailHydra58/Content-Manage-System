<template>
	<TopNav />
  <el-row>
    <!-- 左侧nav -->
    <el-col :span="4">
      <Left />
    </el-col>
    <!-- 右侧总内容 -->
    <el-col :span="20">
      
    </el-col>
  </el-row>
</template>

<script>
import Left from "./childComps/Left.vue";
import TopNav from "./childComps/TopNav.vue";

export default {
  components: {
    Left,
    TopNav,
  },
};
</script>

<style scoped></style>
