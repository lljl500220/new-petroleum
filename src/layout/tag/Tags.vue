<script setup lang="ts">
import {usePermissionStore} from "@/store/permission.ts";
import {useRoute, useRouter} from "vue-router";
import {watch} from "vue";
import {ITagView, useTagsStore} from "@/store/tags.ts";

const router = useRouter()
const tagStore = useTagsStore()
const route = useRoute()
const closeTag = (view:ITagView) => {
  tagStore.delVisitedView(view)
  tagStore.delCachedView(view)
  if (isActive(view.fullPath)) {
    toLastView(tagStore.visitedViews, view)
  }
}

const toLastView = (visitedViews: ITagView[], view: ITagView) => {
  debugger
  const latestView = visitedViews.slice(-1)[0]
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push({path:latestView.fullPath})
  } else {
    // 如果 TagsView 全部被关闭了，则默认重定向到主页

      router.push("/")
  }
}

const isActive = (routePath: any) => {
  return route.fullPath === routePath
}


const addTag = () => {
  tagStore.addVisitedViews(route)
  tagStore.addCachedViews(route)
}

watch(route, () => {
  addTag()
},{
  deep: true
})

</script>

<template>
  <div class="scrollbar-content">
    <div class="arrow-left">
      <el-icon class="arrow-icon">
        <ArrowLeft/>
      </el-icon>
    </div>
    <el-scrollbar>
      <div :class="{'link-box':true,'link-box_active':isActive(tag.fullPath)}" v-for="tag in tagStore.visitedViews">
        <router-link :to="tag.path">
          {{ tag.meta.title }}
          <el-icon @click.prevent.stop="closeTag(tag)" class="link-icon">
            <Close/>
          </el-icon>
        </router-link>
      </div>
    </el-scrollbar>
    <div class="arrow-right">
      <el-icon class="arrow-icon">
        <ArrowRight/>
      </el-icon>
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-scrollbar) {
  flex: 1;
  // 横向超出窗口长度时，显示滚动条
  white-space: nowrap;
  width: calc(100% - 5rem);
  position: absolute;
  left: 2rem;
  padding-left: 10px;
  padding-right: 10px;
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


a {
  color: inherit;
  text-decoration: none;
}
</style>