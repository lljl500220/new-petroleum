<script setup lang="ts">
import {computed, PropType, ref} from "vue";
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
const onlyChild = ref<any>(null)

const alwaysShowRootMenu = computed(() => {
  return props.item.meta && props.item.meta.alwaysShow
})

const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      return !(item.meta && item.meta.hidden)
    })
    return showingChildren.length
  }
  return 0
})

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already contains item's path information
  return { ...props.item, path: "" }
})

console.log(!alwaysShowRootMenu.value,theOnlyOneChild.value,!theOnlyOneChild.children)

</script>

<template>
  <router-link v-if="(!props.item?.children || props.item.children.length === 0) && !props.item.meta.hidden" :to="props.baseUrl">
    <el-menu-item :index="props.baseUrl">
      <svg-icon v-if="props.item?.meta.svgIcon" :name="props.item?.meta.svgIcon"></svg-icon>
      <component v-if="props.item?.meta.elIcon" :is="props.item?.meta.elIcon" class="el-icon"/>
      <template v-if="props.item?.meta.title" #title>
        {{ props.item?.meta.title }}
      </template>
    </el-menu-item>
  </router-link>
  <el-sub-menu v-else-if="!props.item?.meta.hidden" :index="props.item?.path" teleported>
    <template #title>
      <svg-icon v-if="props.item?.meta.svgIcon" :name="props.item?.meta.svgIcon"></svg-icon>
      <component v-if="props.item?.meta.elIcon" :is="props.item?.meta.elIcon" class="el-icon"/>
      <span>{{ props.item?.meta.title }}</span>
    </template>
    <template v-if="props.item.children">
      <menu-item
          v-for="child in props.item.children"
          :key="child.path"
          :item="child"
          :base-url="resolvePath(child.path)"
      >
      </menu-item>
    </template>
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