<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const locale = zhCn;
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style scoped lang="less">
@import "src/assets/less/index.less";

body {
  background: var(--main-bg-color);
}
</style>
