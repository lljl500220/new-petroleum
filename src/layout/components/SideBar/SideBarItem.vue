<script setup lang="ts">
import {RouteRecordRaw} from "vue-router";
import {PropType} from "vue";

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  basePath: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <div>
    <el-menu-item v-for="i in 10" index="1">{{props.item.path}}</el-menu-item>
  </div>
</template>

<style scoped lang="less">

</style>