<script setup lang="ts">
import TitleBar from "@/layout/components/NavigationBar/TitleBar.vue";
import LogoBar from "@/layout/components/NavigationBar/LogoBar.vue";
import SettingBar from "@/layout/components/NavigationBar/SettingBar.vue";
</script>

<template>
  <div class="navigation-bar">
    <div class="navigation-bar">
      <logo-bar />
      <title-bar />
    </div>
    <setting-bar />
  </div>
</template>

<style scoped lang="scss">
.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
</style>
