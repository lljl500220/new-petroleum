import router, { asyncRoutes, bigScreen } from "@/router/index.ts";
import usePermissionStoreHook from "@/store/permission.ts";
import { useUserStoreHook } from "@/store/user.ts";
import useLogStoreHook from "@/store/log.ts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// @ts-ignore
router.beforeEach((to, from, next) => {
  NProgress.start();
  const permissionStore = usePermissionStoreHook();
  const userStore = useUserStoreHook();
  const logStore = useLogStoreHook();

  userStore.setRoles(["admin"]);
  //判断是否取得token 即是否登录
  if (router.getRoutes().length > 15) {
    NProgress.done();
    logStore.setCurrentRoute(to);
    next();
  } else {
    permissionStore.setRoutes(asyncRoutes);
    asyncRoutes.forEach((route) => {
      router.addRoute(route);
    });
    if (import.meta.env.VITE_ENV === "gov") {
      router.addRoute(bigScreen);
    }
    next({ ...to, replace: true });
  }
});
