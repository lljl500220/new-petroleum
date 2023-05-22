<script setup lang="ts">
import SideBarItem from "@/layout/components/SideBar/SideBarItem.vue";

import { usePermissionStore } from "@/store/permission.ts";

const permissionStore = usePermissionStore();
</script>

<template>
  <div class="menu-container">
    <el-scrollbar>
      <el-menu>
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
  :deep(.el-scrollbar__view){
    height: 100%;
  }
}

.el-scrollbar {
  height: 100%;
  .el-scrollbar__wrap {
    // 限制水平宽度
    overflow-x: hidden !important;
  }
}
</style>
