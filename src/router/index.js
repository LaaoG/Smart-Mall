import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/layout/home.vue";
import Category from "@/views/layout/category.vue";
import Cart from "@/views/layout/cart.vue";
import User from "@/views/layout/user.vue";

import store from "@/store";

const Login = () => import("@/views/login");
const Layout = () => import("@/views/layout");
const Search = () => import("@/views/search");
const SearchList = () => import("@/views/search/list");
const ProDetail = () => import("@/views/prodetail");
const Pay = () => import("@/views/pay");
const MyOrder = () => import("@/views/myorder");

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/login", component: Login },
    {
      path: "/",
      component: Layout,
      redirect: "/home",
      children: [
        { path: "/home", component: Home },
        { path: "/category", component: Category },
        { path: "/cart", component: Cart },
        { path: "/user", component: User },
      ],
    },
    { path: "/search", component: Search },
    { path: "/searchlist", component: SearchList },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带 id
    { path: "/prodetail/:id", component: ProDetail },
    { path: "/pay", component: Pay },
    { path: "/myorder", component: MyOrder },
  ],
});

const authUrls = ["/pay", "/myorder"];

//全局前置导航守卫
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next();
    return;
  }

  const token = store.getters.token;
  if (token) {
    next();
  } else {
    next("/login");
  }
});

export default router;
