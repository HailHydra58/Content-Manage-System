<template>
  <div class="topBox">
    <div class="top"></div>
    <el-input v-model="input" placeholder="请输入宿舍号" />
    <el-button type="primary">搜索</el-button>
    <el-button type="primary">重置</el-button>
    <el-button type="success" plain @click="ShowAdd = true">添加宿舍</el-button>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.topBox:deep(.el-input) {
  width: 250px;
  height: 35px;
  margin-right: 15px;
}

.top {
  width: 100%;
  height: 70px;
  border-bottom: 2px solid #000000a7;
  margin-bottom: 40px;
}
</style>
