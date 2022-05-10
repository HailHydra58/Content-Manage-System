import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

import Login from "../views/login/Login.vue";
import AdministratorInterface from "../views/administratorInterface/AdministratorInterface.vue";
import StudentManagement from "../views/studentManagement/StudentManagement.vue";

const routes = [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/administratorInterface", //管理员界面
    component: AdministratorInterface,
    // 路由守卫
    beforeEnter: (to, from, next) => {
      //判断user是否登录,没登陆则跳转到login界面
      if (store.state.isLogin) {
        next();
      } else {
        next("login");
      }
    },
  },
  {
    path: "/studentManagement", //学生管理页面
    component: StudentManagement,
    // 路由守卫
    beforeEnter: (to, from, next) => {
      //判断user是否登录,没登陆则跳转到login界面
      if (store.state.isLogin) {
        next();
      } else {
        next("login");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
