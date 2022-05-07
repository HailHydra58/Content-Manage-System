<template>
  <div class="top1">
    <div style="flex: 1">
      <i class="iconfont icon-liebiao list_icon"></i>
      <span class="title">宿舍管理系统</span>
    </div>

    <div id="userBox">
      <el-avatar
        style="margin-top: 4px"
        :size="45"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      ></el-avatar>
      <span>{{ $store.state.loginUser }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.isShow = key;
    },
  },
};
</script>

<style scoped>
.top1 {
  display: flex;
  width: 100%;
  height: 60px;
  padding: 10px 0 7px 0;
  border-bottom: 1px solid #e3e3e3;
  background-color: var(--el-color-primary);
}

.top1 img {
  width: 40px;
  height: 40px;
  margin-top: 10px;
}

.title {
  color: aliceblue;
  text-align: center;
  font-size: 23px;
  font-weight: 350;
  position: relative;
  top: 14px;
  left: 45px;
}
.list_icon {
  position: relative;
  top: 12px;
  left: 20px;
  font-size: 19px;
  color: aliceblue;
}

#userBox {
  width: 200px;
  margin-top: 3px;
  display: flex;
}
</style>
