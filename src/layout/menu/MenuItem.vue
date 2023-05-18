<script setup lang="ts">
import {PropType} from "vue";
import {RouteRecordRaw} from "vue-router";
import path from "path-browserify"

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  baseUrl: {
    type: String,
    required: false
  }
})

const resolvePath = (routePath: string) => {
  return path.resolve(<string>props.baseUrl, routePath)
}
</script>

<template>
  <router-link v-if="!props.item?.children || props.item.children.length === 0" :to="resolvePath(props.item.path)">
    <el-menu-item :index="resolvePath(props.item.path)">
      <svg-icon v-if="props.item?.meta.svgIcon" :name="props.item?.meta.svgIcon"></svg-icon>
      <component v-if="props.item?.meta.elIcon" :is="props.item?.meta.elIcon" class="el-icon"/>
      <template v-if="props.item?.meta.title" #title>
        {{ props.item?.meta.title }}
      </template>
    </el-menu-item>
  </router-link>
  <el-sub-menu v-else teleported>
    <template #title>
      <svg-icon v-if="props.item?.meta.svgIcon" :name="props.item?.meta.svgIcon"></svg-icon>
      <component v-if="props.item?.meta.elIcon" :is="props.item?.meta.elIcon" class="el-icon"/>
      <span>{{ props.item?.meta.title }}</span>
    </template>
    <menu-item
        v-for="child in props.item?.children"
        :key="child.path"
        :item="child"
        :base-url="props.item?.path"
    >
    </menu-item>
  </el-sub-menu>
</template>

<style scoped lang="less">
.el-menu-item.is-active {
  color: #ffffff;
}

.router-link-active, .router-link-exact-active {
  color: #fff;
}

a {
  text-decoration: none;
}
</style>