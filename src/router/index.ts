import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/ChartsView/index.vue"),
    name: "index",
    meta: {
      title: "首页",
      elIcon: "HomeFilled",
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    meta: {
      hidden: true,
    },
    alias: "/:pathMatch(.*)*",
  },
  {
    path: "/testOnly",
    name: "TestOnly",
    component: () => import("@/views/ChartsView/content.vue"),
    meta: {
      title: "数字大屏",
      elIcon: "View",
    },
  },
  {
    path: "/test",
    name: "Test",
    component: Layout,
    meta: {
      title: "test1",
      elIcon: "View",
    },
    children: [
      {
        path: "test11",
        name: "test11",
        component: () => import("@/views/test1/test11.vue"),
        meta: {
          title: "test1-1",
        },
      },
      {
        path: "test1-23-12",
        name: "test1-23-12",
        component: () => import("@/views/test1/test12.vue"),
        meta: {
          title: "test1-23-12",
          elIcon: "View",
        },
        children: [
          {
            path: "test2-23-12",
            name: "test2-23-12",
            component: () => import("@/views/test2/test22.vue"),
            meta: {
              title: "test2-23-12",
            },
          },
        ],
      },
    ],
  },
];

export const asyncRoutes: RouteRecordRaw[] = [];

const router = createRouter({
  history: createWebHistory("/"),
  routes: staticRoutes,
});

export default router;
