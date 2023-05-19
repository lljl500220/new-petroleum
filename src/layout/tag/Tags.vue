<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {getCurrentInstance, onMounted, ref, watch} from "vue";
import {ITagView, useTagsStore} from "@/store/tags.ts";
import {ElScrollbar} from "element-plus";

const router = useRouter()
const tagStore = useTagsStore()
const route = useRoute()
const instance = getCurrentInstance()

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref<ITagView>({})
let affixTags: ITagView[] = []

const closeTag = (view: ITagView) => {
  tagStore.delVisitedView(view)
  tagStore.delCachedView(view)
  if (isActive(view.fullPath)) {
    toLastView(<any>tagStore.visitedViews, view)
  }
}

const toLastView = (visitedViews: ITagView[], view: ITagView) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push({path: latestView.fullPath})
  } else {
    // 如果 TagsView 全部被关闭了，则默认重定向到主页
    router.push("/")
  }
}

const isActive = (routePath: any) => {
  return route.fullPath === routePath
}

const refreshSelectedTag = (view: ITagView) => {
  tagStore.delCachedView(view)
  router.push({path: view.path, query: view.query,replace:true})
}

const isAffix = (tag: ITagView) => {
  return tag.meta?.affix
}

const closeSelectedTag = (view: ITagView) => {
  tagStore.delVisitedView(view)
  tagStore.delCachedView(view)
  if (isActive(view.fullPath)) {
    toLastView(<any>tagStore.visitedViews, view)
  }
}

const closeOthersTags = () => {
  if (selectedTag.value.fullPath !== route.path && selectedTag.value.fullPath !== undefined) {
    router.push(selectedTag.value.fullPath)
  }
  tagStore.delOthersVisitedViews(<ITagView>selectedTag.value)
  tagStore.delOthersCachedViews(<ITagView>selectedTag.value)
}

const closeAllTags = (view: ITagView) => {
  tagStore.delAllVisitedViews()
  tagStore.delAllCachedViews()
  if (affixTags.some((tag) => tag.path === route.path)) {
    return
  }
  toLastView(<any>tagStore.visitedViews, view)
}

/** 当前滚动条距离左边的距离 */
let currentScrollLeft = 0
/** 每次滚动距离 */
const translateDistance = 200

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollbarContentRef = ref<HTMLDivElement>()

/** 滚动时触发 */
const scroll = ({scrollLeft}: { scrollLeft: number }) => {
  currentScrollLeft = scrollLeft
}

/** 鼠标滚轮滚动时触发 */
const wheelScroll = ({deltaY}: WheelEvent) => {
  if (/^-/.test(deltaY.toString())) {
    scrollTo("left")
  } else {
    scrollTo("right")
  }
}

const getWidth = () => {
  /** 可滚动内容的长度 */
  const scrollbarContentRefWidth = scrollbarContentRef.value!.clientWidth
  /** 滚动可视区宽度 */
  const scrollbarRefWidth = scrollbarRef.value!.wrapRef!.clientWidth
  /** 最后剩余可滚动的宽度 */
  const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft
  console.log(scrollbarRefWidth, scrollbarContentRefWidth, lastDistance)

  return {scrollbarContentRefWidth, scrollbarRefWidth, lastDistance}
}


const scrollTo = (direction: "left" | "right", distance: number = translateDistance) => {
  let scrollLeft = 0
  const {scrollbarContentRefWidth, scrollbarRefWidth, lastDistance} = getWidth()
  // 没有横向滚动条，直接结束
  if (scrollbarRefWidth > scrollbarContentRefWidth) return
  if (direction === "left") {
    scrollLeft = Math.max(0, currentScrollLeft - distance)
  } else {
    scrollLeft = Math.min(currentScrollLeft + distance, currentScrollLeft + lastDistance)
  }
  scrollbarRef.value!.setScrollLeft(scrollLeft)
}

const addTag = () => {
  tagStore.addVisitedViews(route)
  tagStore.addCachedViews(route)
}

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
  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const closeMenu = () => {
  visible.value = false
}

watch(visible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeMenu)
  } else {
    document.body.removeEventListener("click", closeMenu)
  }
})

watch(route, () => {
  addTag()
}, {
  deep: true
})

onMounted(() => {
  addTag()
})

</script>

<template>
  <div class="scrollbar-content">
    <div class="arrow-left">
      <el-icon class="arrow-icon" @click="scrollTo('left')">
        <ArrowLeft/>
      </el-icon>
    </div>
    <div ref="scrollbarContentRef" class="scrollbar-container">
      <el-scrollbar ref="scrollbarRef" @wheel.prevent="wheelScroll" @scroll="scroll">
        <div
            @click.middle="!isAffix(<ITagView>tag) ? closeSelectedTag(<ITagView>tag) : ''"
            @contextmenu.prevent="openMenu(<ITagView>tag, $event)"
            :class="{'link-box':true,'link-box_active':isActive(tag.fullPath)}"
            v-for="tag in tagStore.visitedViews">
          <router-link
              :to="tag.path"
          >
            {{ tag.meta?.title }}
            <el-icon @click.prevent.stop="closeTag(<ITagView>tag)" class="link-icon">
              <Close/>
            </el-icon>
          </router-link>
        </div>
      </el-scrollbar>
    </div>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(<ITagView>selectedTag)">刷新</li>
      <li v-if="!isAffix(<ITagView>selectedTag)" @click="closeSelectedTag(<ITagView>selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(<ITagView>selectedTag)">关闭所有</li>
    </ul>
    <div class="arrow-right">
      <el-icon class="arrow-icon" @click="scrollTo('right')">
        <ArrowRight/>
      </el-icon>
    </div>
  </div>
</template>

<style lang="less" scoped>
.scrollbar-container {
  width: calc(100% - 5rem);
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  left: 2rem;
}

:deep(.el-scrollbar) {
  flex: 1;
  // 横向超出窗口长度时，显示滚动条
  white-space: nowrap;
  width: 100%;
}

:deep(.el-scrollbar__view) {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  float: right;
}

.scrollbar-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.arrow-left {
  text-align: center;
  vertical-align: middle;
  float: left;
  width: 2rem;
  font-size: 1.5rem;
  height: 100%;
  box-shadow: 5px 0 5px -6px #ccc;
}

.arrow-right {
  text-align: center;
  vertical-align: middle;
  width: 2rem;
  font-size: 1.5rem;
  position: absolute;
  right: 0;
  height: 100%;
  box-shadow: -5px 0 5px -6px #ccc;
}

.arrow-icon:hover {
  cursor: pointer;
  box-shadow: 1px 0 1px 2px rgba(0, 0, 0, 0.2),
  -1px 0 1px 2px rgba(0, 0, 0, 0.2),
    0px -1px 1px 2px rgba(0, 0, 0, 0.2),
  0 1px 1px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.link-box {
  display: inline;
  position: relative;
  top: 50%;
  cursor: pointer;
  transform: translateY(-50%);
  border: 1px #d8dce5 solid;
  color: #495060;
  height: 24px;
  border-radius: 3px;
  padding: 0 5px 0 5px;
  line-height: 24px;
  font-size: 12px;
  margin-right: 10px;
  transition: all 1s;
}

.link-box_active {
  background-color: cornflowerblue;
  color: #ffffff !important;
}

.link-icon {
  vertical-align: -15%;
  font-size: 12px;

  :hover {
    background-color: #a5b8e3;
    border-radius: 50%;
    color: white;
    transform: scale(1.1, 1.1);
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
    height: 20px;
    line-height: 20px;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
}


a {
  color: inherit;
  text-decoration: none;
}
</style>