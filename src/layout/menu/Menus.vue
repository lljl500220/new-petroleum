<script setup lang="ts">
import {useMenuStore} from "@/store/menu.ts";
import MenuItem from "@/layout/menu/MenuItem.vue";
import {usePermissionStore} from "@/store/permission.ts";
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const menuStore = useMenuStore()
const permissionStore = usePermissionStore()

const activeMenu = computed(() => {
  const {meta, path} = route
  return path
})

window.onresize = () => {
  menuStore.collapse = window.innerWidth < 800;
}
</script>

<template>
  <el-scrollbar height="100%">
    <el-menu :default-active="activeMenu" :collapse="menuStore.collapse">
      <menu-item
          v-for="child in permissionStore.routes"
          :item="child"
          :baseUrl="child.path"
          :key="child.path"
      >
      </menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="less" scoped>
.el-sub-menu {
  display: grid;
}
</style>