import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "login",
  },

  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/mates",
    component: () => import("../views/Mates.vue"),
  },
  {
    path: "/post/:uuid",
    component: () => import("../views/PostComment.vue"),
  },
  {
    path: "/chat/:uuid",
    component: () => import("../views/Chat.vue"),
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
