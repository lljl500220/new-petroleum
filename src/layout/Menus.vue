<script setup lang="ts">
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import {useMenuStore} from "@/store/menu.ts";

const menuStore = useMenuStore()

</script>

<template>
    <el-scrollbar height="100%">
        <el-menu :collapse="menuStore.collapse">
            <el-sub-menu>
                <template #title>
                    <span>企业档案</span>
                </template>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<style scoped>

</style>