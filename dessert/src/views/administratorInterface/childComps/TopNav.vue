<template>
  <div class="top1">
    <div style="flex: 1">
      <i class="iconfont icon-liebiao list_icon"></i>
      <span class="title">宿舍管理系统</span>
    </div>

    <div id="userBox">
      <i class="iconfont icon-weizhiyidong user_icon"></i>
      <el-avatar
        style="margin-top: 4px"
        :size="45"
        src="src/assets/user.png"
      ></el-avatar>
      <span class="userName">{{ $store.state.loginUser }}</span>
      <i class="iconfont icon-xiala user_icon2" @click="isShow = !isShow"></i>
    </div>
  </div>

  <!-- 登出框 -->
  <div class="logOut" v-show="isShow" @click="logOut">
    <span>登出</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      isShow: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.isShow = key;
    },
    logOut() {
      //点击强制刷新页面
      location.reload([true]);
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
  color: aliceblue;
}

.top1 img {
  width: 40px;
  height: 40px;
  margin-top: 10px;
}

.title {
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
}

#userBox {
  width: 200px;
  margin-top: 3px;
  display: flex;
}

.iconfont:hover {
  cursor: pointer;
}

.user_icon {
  margin-top: 14px;
  margin-right: 30px;
  font-size: 25px;
}

.user_icon2 {
  margin-top: 12px;
  margin-left: 2px;
  font-size: 25px;
}

.userName {
  margin-left: 10px;
  margin-top: 12px;
  font-size: 18px;
}

.logOut {
  position: absolute;
  top: 77px;
  right: 10px;
  width: 150px;
  height: 50px;
  color: #5b97ff;
  border-radius: 0 0 10px 10px;
  background-color: var(--el-color-primary-light-5);
  z-index: 99;
  display: flex;
  justify-content: center;
  line-height: 50px;
}

.logOut > span:hover {
  cursor: pointer;
}
</style>
