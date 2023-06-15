<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import {
  type RouteRecordRaw,
  RouterLink,
  useRoute,
  useRouter
} from 'vue-router'
import { type ITagView, useTagsStore } from '@/store/tags.ts'
import { usePermissionStore } from '@/store/permission.ts'
import ScrollPane from './ScrollPane.vue'
import path from 'path-browserify'
import { Close } from '@element-plus/icons-vue'

const instance = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const tagsViewStore = useTagsStore()
const permissionStore = usePermissionStore()

const tagRefs = ref<InstanceType<typeof RouterLink>[]>([])

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref<ITagView>({})
let affixTags: ITagView[] = []
/**
 * 作者：luolj
 * 时间：2023/06/05 16:02:54
 * 功能：判断当前tag是否为已激活状态，装载新的class
 */
const isActive = (tag: ITagView) => {
  return tag.path === route.path
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:03:31
 * 功能：判断当前遍历的tag是否是一个无法销毁的tag，由路由的mate.isAffix决定
 */
const isAffix = (tag: ITagView) => {
  return tag.meta?.affix
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:04:14
 * 功能：过滤无法销毁的tags，返回一个tags对象，包含所有的tag
 */
const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: ITagView[] = []
  routes.forEach((route) => {
    if (route.meta?.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      if (childTags.length >= 1) {
        tags = tags.concat(childTags)
      }
    }
  })
  return tags
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:06:28
 * 功能：初始化tags，装载至pinia做状态管理
 */
const initTags = () => {
  affixTags = filterAffixTags(permissionStore.routes)
  for (const tag of affixTags) {
    // 必须含有 name 属性
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:06:53
 * 功能：路由变化时添加一个tag，需要先判断tag是否已经添加过了，如果是一个需要缓存的页面，则需要同步添加至缓存对象
 */
const addTags = () => {
  if (route.name) {
    tagsViewStore.addVisitedView(route)
    tagsViewStore.addCachedView(route)
  }
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:09:07
 * 功能：刷新
 */
const refreshSelectedTag = (view: ITagView) => {
  tagsViewStore.delCachedView(view)
  router.replace({ path: '/redirect' + view.path, query: view.query })
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:09:18
 * 功能：关闭
 */
const closeSelectedTag = (view: ITagView) => {
  tagsViewStore.delVisitedView(view)
  tagsViewStore.delCachedView(view)
  if (isActive(view)) {
    toLastView(tagsViewStore.visitedViews, view)
  }
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:09:30
 * 功能：关闭其它
 */
const closeOthersTags = () => {
  if (
    selectedTag.value.fullPath !== route.path &&
    selectedTag.value.fullPath !== undefined
  ) {
    router.push(selectedTag.value.fullPath)
  }
  tagsViewStore.delOthersVisitedViews(selectedTag.value)
  tagsViewStore.delOthersCachedViews(selectedTag.value)
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:09:41
 * 功能：关闭所有
 */
const closeAllTags = (view: ITagView) => {
  tagsViewStore.delAllVisitedViews()
  tagsViewStore.delAllCachedViews()
  if (affixTags.some((tag) => tag.path === route.path)) {
    return
  }
  toLastView(tagsViewStore.visitedViews, view)
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:09:50
 * 功能：关闭当前后，如果当前是已经激活的，则跳转至最后一个
 */
const toLastView = (visitedViews: ITagView[], view: ITagView) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath)
  } else {
    // 如果 TagsView 全部被关闭了，则默认重定向到主页
    if (view.name === 'Home') {
      // 重新加载主页
      router.push({ path: '/redirect' + view.path, query: view.query })
    } else {
      router.push('/')
    }
  }
}
/**
 * 作者：luolj
 * 时间：2023/06/05 16:10:12
 * 功能：打开右键菜单
 */
const openMenu = (tag: ITagView, e: MouseEvent) => {
  const menuMinWidth = 105
  // container margin left
  const offsetLeft = instance!.proxy!.$el.getBoundingClientRect().left
  // container width
  const offsetWidth = instance!.proxy!.$el.offsetWidth
  // left boundary
  const maxLeft = offsetWidth - menuMinWidth
  // 15: margin right
  const left15 = e.clientX - offsetLeft + 15
  if (left15 > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = left15
  }
  top.value = e.clientY / 2
  visible.value = true
  selectedTag.value = tag
}

const closeMenu = () => {
  visible.value = false
}

watch(
  route,
  () => {
    addTags()
  },
  {
    deep: true
  }
)

watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

onMounted(() => {
  initTags()
  addTags()
})
</script>

<template>
  <div class="tags-view-container">
    <ScrollPane class="tags-view-wrapper" :tag-refs="tagRefs">
      <router-link
        ref="tagRefs"
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.meta?.title }}
        <el-icon
          v-if="!isAffix(tag)"
          :size="12"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <Close />
        </el-icon>
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.tags-view-container {
  height: var(--np-tagsview-height);
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 #00000010, 0 0 3px 0 #00000010;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid var(--np-tagsview-tag-border-color);
      border-radius: var(--np-tagsview-tag-border-radius);
      color: var(--np-tagsview-tag-text-color);
      background-color: var(--np-tagsview-tag-bg-color);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 5px;
      }
      &.active {
        background-color: var(--np-tagsview-tag-active-bg-color);
        color: var(--np-tagsview-tag-active-text-color);
        border-color: var(--np-tagsview-tag-active-border-color);
        &::before {
          content: '';
          background-color: var(--np-tagsview-tag-active-before-color);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon {
        margin: 0 2px;
        vertical-align: middle;
        border-radius: 50%;
        &:hover {
          background-color: var(--np-tagsview-tag-icon-hover-bg-color);
          color: var(--np-tagsview-tag-icon-hover-color);
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background-color: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 #00000030;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
