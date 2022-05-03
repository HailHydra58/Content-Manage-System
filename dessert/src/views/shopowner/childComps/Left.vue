<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="titles">
      <img src="@/assets/logo.png" />
      <span>甜品管理系统</span>
    </div>
    <el-menu-item index="1">
      <el-icon><icon-menu /></el-icon>
      <span>店长管理</span>
    </el-menu-item>
    <el-menu-item index="2" disabled>
      <el-icon><document /></el-icon>
      <span>采购管理</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><setting /></el-icon>
      <span>销售管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
  /* background-color: rgb(234, 221, 202); */
}

.titles {
  margin-bottom: 10px;
}

.titles span {
  color: aliceblue;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  position: relative;
  top: -10px;
  left: 25px;
}

.titles img {
  position: relative;
  top: 10px;
  left: 12px;
  width: 50px;
  height: auto;
}
</style>
