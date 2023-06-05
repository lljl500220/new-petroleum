<script setup lang="ts">
import AppMain from '@/layout/components/AppMain.vue'
import { SideBar, TagsView, NavigationBar } from '@/layout/components/index.ts'
</script>

<template>
  <div class="app-wrapper">
    <div class="title-wrapper">
      <NavigationBar />
    </div>
    <div class="main-container">
      <SideBar class="sidebar-container" />
      <div class="tags">
        <tags-view />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags {
  width: calc(100% - var(--np-sidebar-width));
  height: var(--np-tagsview-height);
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
      z-index: 3;
      box-shadow: 1px 0 5px -1px #d8dce5;
      height: calc(100% - var(--np-title-wrapper-height));
    }
  }
}
</style>
