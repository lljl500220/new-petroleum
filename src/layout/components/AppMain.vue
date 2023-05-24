<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTagsStore } from "@/store/tags.ts";

const route = useRoute();
const tagsViewStore = useTagsStore();

const key = computed(() => {
  return route.path;
});
</script>

<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition
        name="fade-transform"
        mode="out-in"
        enter-from-class="fade-transform-enter"
      >
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style scoped lang="less">
.app-main {
  min-height: calc(
    100% - var(--np-title-wrapper-height) - var(--np-tagsview-height)
  );
  width: calc(100% - var(--np-sidebar-width));
  position: absolute;
  transition: all 0.28s;
  right: 0;
  top: calc(var(--np-title-wrapper-height) + var(--np-tagsview-height));
  background-color: var(--np-app-bg-color);
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
