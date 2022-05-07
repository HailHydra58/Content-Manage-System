import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import $axios from "@/network/request.js";

let app = createApp(App);
//全局添加$axios封装方法,this.$axios调用
app.config.globalProperties.$axios = $axios;

app.use(store).use(router).mount("#app");
