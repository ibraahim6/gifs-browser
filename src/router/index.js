import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/detail/:id",
    name: "Detail Page",
    component: () => import("../views/DetailPage.vue"),
  },
  {
    path: "/favorites",
    name: "Profile",
    component: () => import("../views/Favorites.vue"),
  },
  {
    path: "/uploads",
    name: "Uploads",
    component: () => import("../views/Uploads.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
