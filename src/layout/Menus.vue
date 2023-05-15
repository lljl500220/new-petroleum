<script setup lang="ts">
import {ref} from "vue";
import {useMenuStore} from "@/store/menu.ts";

const menuStore = useMenuStore()
console.log(menuStore.collapse)
</script>

<template>
  <el-menu :collapse="menuStore.collapse">
      <el-sub-menu title="one">

      </el-sub-menu>
  </el-menu>
</template>

<style scoped>

</style>