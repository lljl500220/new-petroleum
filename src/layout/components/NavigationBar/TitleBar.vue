<script setup lang="ts">
const title = import.meta.env.VITE_SYSTEM_TITLE
</script>

<template>
  <a>{{ title }}</a>
</template>

<style scoped lang="scss">
a {
  margin-left: 10px;
  color: #ffffff;
  font-size: 23px;
  letter-spacing: 5px;
  font-weight: 520;
  white-space: nowrap;
}
</style>
