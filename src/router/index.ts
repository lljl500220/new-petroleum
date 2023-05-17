import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
const Layout =() => import('@/layout/index.vue')
const staticRoutes:RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: ()=> import('@/components/HelloWorld.vue'),
        meta: {
            title: '首页',
            menu: true,
            elIcon: 'Home',
        }
    },
    {
        path: '/404',
        component: ()=> import('@/views/404.vue'),
        meta: {
            title: '404',
            menu: true,
            elIcon: 'WarnTriangleFilled'
        }
    }
]

export const asyncRoutes:RouteRecordRaw[] = [
    {
        path: '/test1',
        name: 'Test1',
        component: Layout,
        meta:{
            title: 'test1',
            elIcon: 'Book'
        },
        children:[
            {
                path: 'test1-1',
                component: ()=> import('@/views/404.vue')
            }
        ]
    },
]

const router = createRouter({
    history:createWebHistory('/'),
    routes:staticRoutes
})

export default router