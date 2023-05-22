<script setup lang="ts">
import { useMenuStore } from "@/store/menu.ts";
import AppMain from "@/layout/components/AppMain.vue";
import { SideBar } from "@/layout/components/index.ts";
import { computed } from "vue";

const menuStore = useMenuStore();

const changeCollapse = () => {
  menuStore.collapse = !menuStore.collapse;
};

const scrollbarClass = computed(() => {
  return {
    "open-bar": menuStore.collapse,
    "hide-bar": !menuStore.collapse,
  };
});
</script>

<template>
  <div class="app-wrapper">
    <div class="title-wrapper"></div>
    <div class="main-container">
      <SideBar class="sidebar-container" />
      <AppMain></AppMain>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .title-wrapper {
    height: var(--np-title-wrapper-height);
    background-color: var(--np-title-wrapper-bg-color);
  }

  .main-container {
    height: calc(100% - var(--np-title-wrapper-height));
    position: relative;

    .sidebar-container {
      position: fixed;
      z-index: 1001;
      overflow: hidden;
      width: var(--np-sidebar-width);
      height: 100%;
    }
  }
}
</style>
