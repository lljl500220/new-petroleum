<script setup lang="ts">
import { useMenuStore } from "@/store/menu.ts";

const menuStore = useMenuStore();
const close = () => {
  menuStore.collapse = !menuStore.collapse;
};
</script>

<template>
  <div class="app-container">
    <div style="width: 100%; height: 100px; background-color: green">
      <el-button @click="close"> 关闭 </el-button>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
