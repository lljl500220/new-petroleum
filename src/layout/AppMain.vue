<script setup lang="ts">
import {useTagsStore} from "@/store/tags.ts";
import {computed} from "vue";
import {useRoute} from "vue-router";

const tagsViewStore = useTagsStore()
const route = useRoute()

const key = computed(()=>{
    return route.path
})

</script>

<template>
    <section class="app-main">
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive :include="tagsViewStore.cachedViews">
                    <component :is="Component" :key="key" />
                </keep-alive>
            </transition>
        </router-view>
    </section>
</template>

<style scoped lang="less">
.app-main {
  min-height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f2f3f5;
}
</style>