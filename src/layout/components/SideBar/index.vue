<script setup lang="ts">
import SideBarItem from "@/layout/components/SideBar/SideBarItem.vue";

import { usePermissionStore } from "@/store/permission.ts";
import { useMenuStore } from "@/store/menu.ts";
import { watch } from "vue";
import { useRoute } from "vue-router";

const permissionStore = usePermissionStore();
const menuStore = useMenuStore();
const route = useRoute();

watch(
  () => menuStore.collapse,
  (newValue, oldValue) => {
    if (newValue) {
      document.documentElement.style.setProperty("--np-sidebar-width", "60px");
    } else {
      document.documentElement.style.setProperty("--np-sidebar-width", "220px");
    }
  }
);
</script>

<template>
  <div class="menu-container">
    <el-scrollbar>
      <el-menu
        :default-active="route.fullPath"
        :collapse-transition="false"
        :collapse="menuStore.collapse"
      >
        <SideBarItem
          v-for="route in permissionStore.routes"
          :item="route"
          :key="route.path"
          :base-path="route.path"
        >
        </SideBarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<style scoped lang="scss">
.menu-container {
  height: 100%;

  :deep(.el-scrollbar__view) {
    height: 100%;
  }
}

.el-menu {
  height: 100%;
  width: 100%;
  border: none !important;
  transition: width 0.28s;
}

.el-scrollbar {
  height: 100%;

  .el-scrollbar__wrap {
    // 限制水平宽度
    overflow-x: hidden !important;
  }
}
</style>
