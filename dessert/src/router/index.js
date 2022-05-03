import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

import Login from "../views/login/Login.vue";
import Shopowner from "../views/shopowner/Shopowner.vue";
import Purchase from "../views/purchase/Purchase.vue";
import Sale from "../views/sale/Sale.vue";

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
    path: "/shopowner",
    component: Shopowner,
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
    path: "/purchase",
    component: Purchase,
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
    path: "/sale",
    component: Sale,
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
