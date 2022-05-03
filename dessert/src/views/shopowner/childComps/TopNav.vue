<template>
  <div class="top1">
    <div style="flex: 1">
      <img src="@/assets/单列列表.png" />
    </div>
    <div class="qiandao">
      <el-button class="qiandaos" type="warning" plain @click="isQianDao">
        {{ qiandao }}
      </el-button>
    </div>

    <div style="width: 100px">
      <el-avatar
        style="margin-top: 4px"
        :size="50"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      ></el-avatar>
    </div>
  </div>

  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">考勤记录</el-menu-item>
    <el-menu-item index="2">员工信息 </el-menu-item>
    <el-menu-item index="3">会员管理</el-menu-item>
    <el-menu-item index="4">公告管理</el-menu-item>
  </el-menu>
  <!-- 考勤记录 -->
  <div v-show="isShow == 1">1</div>
  <!-- 员工信息 -->
  <div v-show="isShow == 2">2</div>
  <!-- 会员管理 -->
  <div v-show="isShow == 3">3</div>
  <!-- 公告管理 -->
  <div v-show="isShow == 4">4</div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      qiandao: "签到",
      isShow: 1,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.isShow = key;
    },
    isQianDao() {
      if (this.qiandao == "签到") {
        this.qiandao = "已签到";
        // console.log(1);
      }
    },
  },
};
</script>

<style scoped>
.top1 {
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e3e3e3;
}

.top1 img {
  width: 40px;
  height: 40px;
  margin-top: 10px;
}

.qiandao {
  width: 130px;
}

.qiandaos {
  width: 80px;
  height: 40px;
  margin: 0 auto;
  margin-top: 10px;
}
</style>
