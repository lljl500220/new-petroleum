//1.定义容器
import { defineStore } from "pinia";
import { ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { bigScreen, staticRoutes } from "@/router";
import store from "@/store/index.ts";

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>(staticRoutes);
  const dynamicRoutes = ref<RouteRecordRaw[]>([]);

  const setRoutes = (asyncRoutes: RouteRecordRaw[]) => {
    routes.value = staticRoutes.concat(asyncRoutes);
    if (import.meta.env.VITE_ENV === "gov") {
      routes.value.unshift(bigScreen);
    }
  };

  return {
    routes,
    dynamicRoutes,
    setRoutes,
  };
});

export default function usePermissionStoreHook() {
  return usePermissionStore(store);
}
