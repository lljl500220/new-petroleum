<script setup lang="ts">
import Menus from "@/layout/Menus.vue";
</script>

<template>
  <el-container>
      <el-aside width="auto">
          <menus></menus>
      </el-aside>
      <el-container>
          <el-header>22</el-header>
          <el-main>33</el-main>
      </el-container>
  </el-container>
</template>

<style lang="less">
@import "src/assets/less/index";
</style>

<style scoped lang="less">
</style>