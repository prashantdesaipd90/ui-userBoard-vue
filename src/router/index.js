import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    component: () => import(/* webpackChunkName: "usersList" */ "../views/UsersHome.vue"),
    name: "usersList",
    path: "/"
  },
  {
    component: () =>
      import(/* webpackChunkName: "UsersDetails" */ "../views/UsersDetails.vue"),
    name: "UsersDetails",
    path: "/:username"
  },
  {
    name: "default",
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: "history",
  routes,
});

export default router;
