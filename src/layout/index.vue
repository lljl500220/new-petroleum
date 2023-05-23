<script setup lang="ts">
import { useMenuStore } from "@/store/menu.ts";
import AppMain from "@/layout/components/AppMain.vue";
import { SideBar,TagsView } from "@/layout/components/index.ts";
import { computed } from "vue";

const menuStore = useMenuStore();

const changeCollapse = () => {
  menuStore.collapse = !menuStore.collapse;
};

</script>

<template>
  <div class="app-wrapper">
    <div class="title-wrapper">

    </div>
    <div class="main-container">
      <SideBar class="sidebar-container" />
      <div class="tags">
        <tags-view></tags-view>
      </div>
      <AppMain></AppMain>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags {
  width: calc(100% - var(--np-sidebar-width));
  height: var(--np-tagsview-height);
  background-color: red;
  position: fixed;
  transition: all 0.28s;
  z-index: 2;
  right: 0;
  top: var(--np-title-wrapper-height);
}

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .title-wrapper {
    position: fixed;
    width: 100%;
    z-index: 2;
    height: var(--np-title-wrapper-height);
    background-color: var(--np-title-wrapper-bg-color);
  }

  .main-container {
    height: 100%;
    position: relative;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #9fc5d2;
      border-radius: 5px;

      &:hover {
        background-color: #a6a3a3;
      }
    }

    .sidebar-container {
      position: fixed;
      overflow: hidden;
      width: var(--np-sidebar-width);
      transition: width 0.28s;
      bottom: 0;
      height: calc(100% - var(--np-title-wrapper-height));
    }
  }
}

</style>
