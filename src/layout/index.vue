<script setup lang="ts">
import Menus from "@/layout/Menus.vue";
import {useMenuStore} from "@/store/menu.ts";
import Tags from "@/layout/Tags.vue";

const menuStore = useMenuStore()

const changeCollapse = () => {
    menuStore.collapse = !menuStore.collapse
}
</script>

<template>
    <el-container>
        <el-aside width="auto">
            <menus></menus>
        </el-aside>
        <el-container>
            <el-header>
                <component class="open-icon" @click="changeCollapse" :is="menuStore.collapse?'Expand':'Fold'"/>
                <div class="scrollbar-container">
                    <tags></tags>
                </div>
            </el-header>
            <el-main>33</el-main>
        </el-container>
    </el-container>
</template>

<style lang="less">
@import "src/assets/less/index";
.open-icon {
    height: 1.5rem;
    width: 1.5rem;
    position: absolute;
    top: 50%;
    left: 20px;
    cursor: pointer;
    transform: translateY(-60%);
}
</style>

<style scoped lang="less">
.el-container {
  height: 100%;

  :deep(.el-scrollbar__view) {
    height: 100%;
    --el-menu-text-color: #c0c4cc;
    --el-menu-hover-text-color: #c0c4cc;
    --el-menu-bg-color: #001428;
    --el-menu-hover-bg-color: rgb(0, 16, 32);
    --el-menu-active-color: #ffffff;
    --el-menu-level: 0;

    ul {
      height: 100%;
    }
  }

  :deep(.el-header) {
    position: relative;
    padding: 0;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    line-height: var(--el-header-height);

    .scrollbar-container {
      position: absolute;
      right: 20px;
      width: calc(100% - 40px - 1.5rem);
      height: 100%;
    }
  }
}
</style>