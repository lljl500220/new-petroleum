<script setup lang="ts">
import {useMenuStore} from "@/store/menu.ts";
import MenuItem from "@/layout/menu/MenuItem.vue";
import {usePermissionStore} from "@/store/permission.ts";
import {computed, watch} from "vue";
import path from "path-browserify"
import {RouteRecordRaw, useRoute} from "vue-router";

const route = useRoute()
const menuStore = useMenuStore()
const permissionStore = usePermissionStore()

const activeMenu = computed(() => {
  const {meta, path} = route
  return path
})

window.onresize = () => {
  menuStore.collapse = window.innerWidth < 1000;
}


const resolvePath = (basePath: string, routePath: string) => {
  return path.resolve(basePath, routePath)
}

const isOnlyChild = (menu: any) => {
  if (menu.children && menu.children.length === 1 && !menu.children[0].children) return menu.children[0]
  return menu
}

const basePath = (path: string, menu: any) => {
  if (menu.children && menu.children.length === 1 && !menu.children[0].children) {
    return resolvePath(menu.path, menu.children[0].path)
  }
  return path
}
</script>

<template>
  <el-scrollbar height="100%">
    <el-menu :collapse-transition="false" :default-active="activeMenu" :collapse="menuStore.collapse">
      <MenuItem
          v-for="child in permissionStore.routes"
          :item="isOnlyChild(child)"
          :baseUrl="basePath(child.path,child)"
          :key="child.path"
      >
      </MenuItem>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="less" scoped>
.el-menu{
  transition: inherit;
}
.el-sub-menu {
  display: grid;
}
</style>