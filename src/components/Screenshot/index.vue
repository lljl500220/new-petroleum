<script setup lang="ts">
import Container from '@/components/Screenshot/container.vue'
import { ref } from 'vue'
const shotContainer = ref<any>(null)
const show = ref(false)
const click = () => {
  show.value = true
  setTimeout(() => {
    shotContainer.value.pageSnapshot()
  }, 1000)
}
</script>

<template>
  <div @click="click">
    <el-tooltip effect="dark" content="截取工作区" placement="bottom">
      <svg-icon name="shotScreen" />
    </el-tooltip>
    <el-dialog
      width="90vw"
      :append-to-body="true"
      v-model="show"
      title="截屏处理"
    >
      <container ref="shotContainer" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 24px;
  vertical-align: middle;
  &:focus {
    outline: none;
  }
}
</style>
