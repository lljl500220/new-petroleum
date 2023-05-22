//1.定义容器
import {defineStore} from "pinia";
import {ref} from "vue";
import {RouteRecordRaw} from "vue-router";
import {staticRoutes} from "@/router";
import store from "@/store/index.ts";

export const usePermissionStore = defineStore("permission", () => {
    const routes = ref<RouteRecordRaw[]>(staticRoutes)
    const dynamicRoutes = ref<RouteRecordRaw[]>([])

    const setRoutes = (asyncRoutes: RouteRecordRaw[]) => {
        routes.value = staticRoutes.concat(asyncRoutes)
    }


    return {
        routes,
        dynamicRoutes,
        setRoutes
    }
})

export default function usePermissionStoreHook() {
    return usePermissionStore(store)
}