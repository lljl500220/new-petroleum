<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";
import { computed, PropType } from "vue";
import path from "path-browserify";
import { useMenuStore } from "@/store/menu.ts";

const menuStore = useMenuStore();

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const alwaysShowRootMenu = computed(() => {
  return props.item.meta && props.item.meta.alwaysShow;
});

const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      return !(item.meta && item.meta.hidden);
    });
    return showingChildren.length;
  }
  return 0;
});

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null;
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child;
      }
    }
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already contains item's path information
  return { ...props.item, path: "" };
});

const resolvePath = (routePath: string) => {
  return path.resolve(props.basePath, routePath);
};
</script>

<template>
  <div
    v-if="!props.item?.meta.hidden"
    :class="{ 'simple-mode': menuStore.collapse }"
  >
    <template
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    >
      <router-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <svg-icon
            v-if="theOnlyOneChild.meta.svgIcon"
            :name="theOnlyOneChild.meta.svgIcon"
          />
          <component
            v-else-if="theOnlyOneChild.meta.elIcon"
            :is="theOnlyOneChild.meta.elIcon"
            class="el-icon"
          />
          <template v-if="theOnlyOneChild.meta.title" #title>
            {{ theOnlyOneChild.meta.title }}
          </template>
        </el-menu-item>
      </router-link>
    </template>
    <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
      <template #title>
        <svg-icon
          v-if="props.item.meta && props.item.meta.svgIcon"
          :name="props.item.meta.svgIcon"
        />
        <component
          v-else-if="props.item.meta && props.item.meta.elIcon"
          :is="props.item.meta.elIcon"
          class="el-icon"
        />
        <span v-if="props.item.meta && props.item.meta.title">{{
          props.item.meta.title
        }}</span>
      </template>
      <template v-if="props.item.children">
        <SideBarItem
          v-for="child in props.item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}

.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.simple-mode {
  :deep(.el-sub-menu) {
    .el-sub-menu__icon-arrow {
      display: none;
    }

    span {
      visibility: hidden;
    }
  }
}
</style>
