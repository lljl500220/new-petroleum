import { defineStore } from 'pinia'
import { ref } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export type ITagView = Partial<RouteLocationNormalized>

export const useTagsStore = defineStore('tags', () => {
  const visitedViews = ref<ITagView[]>([])
  const cachedViews = ref<string[]>([])

  const addVisitedView = (tag: ITagView) => {
    if (
      visitedViews.value.some((value, index) => {
        if (value.path === tag.path) {
          if (value.fullPath !== tag.fullPath) {
            visitedViews.value[index] = Object.assign({}, tag)
          }
          return true
        }
      })
    ) {
      return
    }
    visitedViews.value.push(Object.assign({}, tag))
  }

  const addCachedView = (tag: ITagView) => {
    if (typeof tag.name !== 'string') return
    if (cachedViews.value.includes(tag.name)) return
    if (tag.meta?.keepAlive) {
      cachedViews.value.push(tag.name)
    }
  }

  const delVisitedView = (view: ITagView) => {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1)
        break
      }
    }
  }
  const delCachedView = (view: ITagView) => {
    if (typeof view.name !== 'string') return
    const index = cachedViews.value.indexOf(view.name)
    index > -1 && cachedViews.value.splice(index, 1)
  }
  //#endregion

  //#region delOthers
  const delOthersVisitedViews = (view: ITagView) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  }
  const delOthersCachedViews = (view: ITagView) => {
    if (typeof view.name !== 'string') return
    const index = cachedViews.value.indexOf(view.name)
    if (index > -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      // 如果 index = -1, 没有缓存的 tags
      cachedViews.value = []
    }
  }
  //#endregion

  //#region delAll
  const delAllVisitedViews = () => {
    // keep affix tags
    const affixTags = visitedViews.value.filter((tag) => tag.meta?.affix)
    visitedViews.value = affixTags
  }
  const delAllCachedViews = () => {
    cachedViews.value = []
  }

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delAllCachedViews,
    delAllVisitedViews,
    delOthersCachedViews,
    delOthersVisitedViews,
    delCachedView,
    delVisitedView
  }
})
