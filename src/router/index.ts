import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      hidden: true
    },
    redirect: () => {
      if (import.meta.env.VITE_ENV === 'gov') {
        return '/bigScreen'
      } else {
        return '/home'
      }
    }
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/bigScreen',
    component: () => import('@/views/ChartsView/index.vue'),
    name: 'BigScreen',
    meta: {
      title: '数字大屏',
      elIcon: 'DataBoard'
    }
  },
  {
    path: '/home',
    component: Layout,
    meta: {
      title: '首页',
      elIcon: 'Document'
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          elIcon: 'HomeFilled',
          affix: true
        }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    meta: {
      title: '图形示例',
      elIcon: 'PieChart',
      alwaysShow: true
    },
    children: [
      {
        path: '/graph',
        name: 'graph',
        component: () => import('@/views/charts/graphChart.vue'),
        meta: {
          svgIcon: 'graphChart',
          title: '关系图'
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    meta: {
      title: '测试页面',
      elIcon: 'Document',
      alwaysShow: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: {
      hidden: true
    },
    alias: '/:pathMatch(.*)*'
  }
]

export const asyncRoutes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: staticRoutes
})

export default router
