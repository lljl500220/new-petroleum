import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    meta: {
      hidden: true,
    },
    redirect: () => {
      if (import.meta.env.VITE_ENV === "gov") {
        return "/bigScreen";
      } else {
        return "/home";
      }
    },
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/home",
    component: Layout,
    meta: {
      title: "首页",
      elIcon: "Document",
    },
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          elIcon: "HomeFilled",
          affix: true,
        },
      },
    ],
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
  {
    path: "/test1",
    name: "文档中心",
    component: Layout,
    meta: {
      title: "文档中心",
      elIcon: "Document",
    },
    children: [
      {
        path: "test11",
        name: "帮助文档",
        component: () => import("@/views/test1/test11.vue"),
        meta: {
          title: "帮助文档",
        },
      },
      {
        path: "test1-23-12",
        name: "使用文档",
        component: () => import("@/views/test1/test12.vue"),
        meta: {
          title: "使用文档",
          elIcon: "Document",
        },
        children: [
          {
            path: "test2-23-12",
            name: "菜单说明",
            component: () => import("@/views/test2/test22.vue"),
            meta: {
              title: "菜单说明",
            },
          },
        ],
      },
    ],
  },
];

export const bigScreen: RouteRecordRaw = {
  path: "/bigScreen",
  component: () => import("@/views/ChartsView/index.vue"),
  name: "BigScreen",
  meta: {
    title: "数字大屏",
    elIcon: "DataBoard",
  },
};

export const asyncRoutes: RouteRecordRaw[] = [];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: staticRoutes,
});

export default router;
