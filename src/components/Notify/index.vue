<script setup lang="ts">
import { PropType } from "vue";

const option = [
  {},
  {
    type: 1,
    title: "预警消息",
    color: "#79bbff",
    path: "/policyRegulation/message",
  },
  {
    type: 2,
    title: "处理消息",
    color: "#a0cfff",
    path: "/policyRegulation/message",
  },
  {
    type: 3,
    title: "政策消息",
    color: "#95d475",
    path: "/policyRegulation/message",
  },
  {
    type: 4,
    title: "平台消息",
    color: "#c8c9cc",
    path: "/policyRegulation/message",
  },
];

interface target {
  type: number;
  title: string;
  content: string;
}

const props = defineProps({
  item: {
    type: Object as PropType<target>,
    required: true,
  },
});
</script>

<template>
  <div class="msg-content">
    <el-tag :color="option[props.item?.type].color">{{
      option[props.item?.type].title
    }}</el-tag>
    <span>{{ props.item.content }}</span>
    <router-link
      :style="{ color: option[props.item?.type].color }"
      :to="option[props.item?.type].path"
      >前去处理</router-link
    >
  </div>
</template>

<style scoped lang="scss">
.msg-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
a {
  text-decoration: none;
}
</style>
