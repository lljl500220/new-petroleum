<script setup lang="ts">
import CustomStackBar from '@/views/ChartsView/components/CustomStackBar.vue'
</script>

<template>
  <div class="app-container">
    <div ref="barDom" class="bar-3d" style="width: 500px; height: 300px">
      <CustomStackBar />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
