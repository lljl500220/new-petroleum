import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
const routes:RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: ()=> import('@/components/HelloWorld.vue')
    },
    {
        path: '/main',
        component: ()=> import('@/layout/index.vue')
    }
]

const router = createRouter({
    history:createWebHistory('/'),
    routes
})

export default router