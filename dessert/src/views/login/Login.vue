<template>
  <!-- 背景图 -->
  <img id="backgroundPicture" src="../../assets/login-bg.jpg" />

  <div id="loginBox">
    <h1>宿舍管理系统</h1>
    <!-- 账户密码输入框 -->
    <div style="display: flex">
      <i class="iconfont icon-yonghu"></i>
      <el-input class="inp1" v-model="id" placeholder="username"></el-input>
    </div>
    <div style="display: flex">
      <i class="iconfont icon-mima"></i>
      <el-input
        class="inp2"
        v-model="pwd"
        show-password
        placeholder="password"
        @keyup.enter="signIn"
      ></el-input>
    </div>
    <!-- 单选框 -->
    <div class="radioButton">
      <el-radio v-model="radio" label="1">学生</el-radio>
      <el-radio v-model="radio" label="2">管理员</el-radio>
    </div>
    <!-- 登录按钮 -->
    <el-button id="signIn" type="primary" @click="signIn">登录</el-button>
  </div>
</template>

<script>
import { getLogin } from "@/network/request.js";

export default {
  data() {
    return {
      id: "",
      pwd: "",
      radio: "",
    };
  },
  methods: {
    signIn() {
      // 判断是否选择了单选框
      if (this.radio) {
        getLogin(this.id, this.pwd, this.radio).then((res) => {
          let msg = res.data.msg;
          console.log(res);
          if (res.data.code == 200) {
            //弹出成功
            ElMessage.success(msg);
            //将登录状态设置为true并跳转
            this.$store.state.isLogin = true;
            this.$router.push("/shopowner");
            console.log(msg, `权利为${res.data.data[0].admin_root}`);
          } else if (res.data.code == 201) {
            //弹出密码错误
            ElMessage.error(msg);
          } else {
            //弹出服务器繁忙
            ElMessage.warning(msg);
          }
        });
      } else {
        //弹出没选单选框
        ElMessage.error("请选择用户类型");
      }
    },
  },
};
</script>

<style scoped>
i {
  font-size: 18px;
  margin-top: 7px;
  margin-right: 20px;
}

.radioButton {
  display: flex;
  justify-content: center;
}

/* 深度选择器>>>选择到组件的class名 */
.inp1:deep(.el-input__inner),
.inp2:deep(.el-input__inner) {
  border-radius: 6px;
  height: 40px;
}

.inp1,
.inp2 {
  margin-bottom: 20px;
}

#backgroundPicture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

#signIn {
  width: 100%;
  height: 45px;
  font-size: 15px;
  margin-top: 15px;
}

#loginBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  background-color: rgb(255, 255, 255, 0.5);
}

input {
  height: 50px;
  margin-top: 20px;
  border-radius: 20px;
  font-size: 21px;
  padding: 0 20px;
}

h1 {
  font-size: 25px;
  font-weight: 400;
  color: var(--el-color-primary);
  text-align: center;
  padding-bottom: 15px;
  margin-bottom: 40px;
  border-bottom: #f4f4f4 solid 1px;
}
</style>
