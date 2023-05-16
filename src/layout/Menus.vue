<script setup lang="ts">
import {useMenuStore} from "@/store/menu.ts";

const menuStore = useMenuStore()

</script>

<template>
    <el-scrollbar height="100%">
        <el-menu :collapse="menuStore.collapse">
            <el-sub-menu teleported index="1">
                <template #title>
<!--                    <svg-icon name="book"></svg-icon>-->
                    <component is="Document" class="el-icon"/>
                    <span>企业档案</span>
                </template>
                <el-menu-item index="1-1">
                    企业档案1
                </el-menu-item>
                <el-menu-item index="1-2">
                    企业档案2
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<style lang="less" scoped>
.el-sub-menu{
    display: grid;
}
</style>