import router, { asyncRoutes } from "@/router/index.ts";
import usePermissionStoreHook from "@/store/permission.ts";
import { useUserStoreHook } from "@/store/user.ts";
// @ts-ignore
router.beforeEach((to, from, next) => {
  const permissionStore = usePermissionStoreHook();
  const userStore = useUserStoreHook();

  userStore.setRoles(["admin"]);

  //判断是否取得token 即是否登录
  if (router.getRoutes().length > 3) {
    next();
  } else {
    permissionStore.setRoutes(asyncRoutes);
    asyncRoutes.forEach((route) => {
      router.addRoute(route);
    });
    next({ ...to, replace: true });
  }
});
