import {defineStore} from "pinia";
import {ref} from "vue";
import {RouteLocationNormalized} from "vue-router";

export type ITagView = Partial<RouteLocationNormalized>

export const useTagsStore = defineStore('tags', () => {
    const visitedViews = ref<ITagView[]>([])
    const cachedViews = ref<string[]>([])

    const addVisitedViews = (tag: ITagView) => {
        if (visitedViews.value.some((value, index) => {
            if (value.path === tag.path) {
                if (value.fullPath !== tag.fullPath) {
                    visitedViews.value[index] = Object.assign({}, tag)
                }
                return true
            }
        })) {
            return
        }
        visitedViews.value.push(Object.assign({}, tag))
    }

    const addCachedViews = (tag: ITagView) => {
        if (typeof tag.name !== "string") return
        if (cachedViews.value.includes(tag.name)) return
        if (tag.meta?.keepAlive) {
            cachedViews.value.push(tag.name)
        }
    }

    return {
        addVisitedViews,
        addCachedViews,
        visitedViews,
        cachedViews
    }
})