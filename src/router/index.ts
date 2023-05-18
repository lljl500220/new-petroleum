import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const Layout = () => import('@/layout/index.vue')
export const staticRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/components/HelloWorld.vue'),
        name: 'index',
        meta: {
            title: '首页',
            menu: true,
            elIcon: 'HomeFilled',
        }
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
        name: '404',
        meta: {
            title: '404',
            menu: true,
            elIcon: 'WarnTriangleFilled'
        }
    },
]

export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/test',
        name: 'Test',
        component: Layout,
        meta: {
            title: 'test1',
            elIcon: 'View'
        },
        children: [
            {
                path: 'test11',
                name: 'test11',
                component: () => import('@/views/test1/test11.vue'),
                meta: {
                    title: 'test1-1',
                },
            },
            {
                path: 'test12',
                name: 'test12',
                component: () => import('@/views/test1/test12.vue'),
                meta: {
                    title: 'test1-2',
                },
            }
        ]
    },
    {
        path: '/test2',
        name: 'Test2',
        component: Layout,
        meta: {
            title: 'test2',
            elIcon: 'View'
        },
        children: [
            {
                path: 'test21',
                name: 'test21',
                component: () => import('@/views/test2/test21.vue'),
                meta: {
                    title: 'test2-1',
                },
            },
            {
                path: 'test22',
                name: 'test22',
                component: () => import('@/views/test2/test22.vue'),
                meta: {
                    title: 'test2-2',
                },
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes: staticRoutes
})

export default router