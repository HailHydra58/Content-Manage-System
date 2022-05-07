import axios from "axios";
//引入路由和vuex(因为不是vue文件所以得手动引入)
import router from "@/router/index.js";
import store from "@/store/index.js";

let $axios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: "lnclude",
});

$axios.interceptors.response.use(
  (response) => {
    // 请求成功返回的数据
    if (response.data.code == 201) {
      //如果返回201就是信息过期,前端直接提示用户,并跳转回登录界面
      ElMessageBox.alert("登录信息过期，请重新登录", "警告⚠", {
        showClose: false, //关闭右上角×
      }).then(() => {
        //点击确定后设置登录状态false,并跳转
        store.state.isLogin = false;
        router.push("/login");
      });
      return null;
    } else {
      return response;
    }
  },
  (error) => {
    return error;
  }
);

export default $axios;
