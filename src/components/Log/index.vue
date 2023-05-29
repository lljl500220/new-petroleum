<script setup lang="ts">
import { PropType } from "vue";
import { Log } from "@/store/log.ts";

const props = defineProps({
  item: {
    type: Object as PropType<Log>,
    required: true,
  },
});

</script>

<template>
  <el-descriptions direction="vertical" :column="5" size="default" border>
    <el-descriptions-item label="业务页">{{
      props.item.pageName
    }}</el-descriptions-item>
    <el-descriptions-item label="请求路径">{{
        props.item.path
      }}</el-descriptions-item>
    <el-descriptions-item label="时间">{{
      props.item.time
    }}</el-descriptions-item>
    <el-descriptions-item label="请求方式">{{
      props.item.type
    }}</el-descriptions-item>
    <el-descriptions-item label="响应状态">
      <el-tag :type="props.item?.status === 200 ? 'success' : 'error'">{{
        props.item.status
      }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="请求报文">
      {{ props.item.request }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped lang="scss">
</style>
