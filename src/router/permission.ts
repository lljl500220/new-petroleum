import router, { asyncRoutes } from '@/router/index.ts'
import usePermissionStoreHook from '@/store/permission.ts'
import { useUserStoreHook } from '@/store/user.ts'
import useLogStoreHook from '@/store/log.ts'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setToken } from '@/utils/cookies.ts'

//本地调试时使用的user信息，上线后不可使用，应当在getUserinfo等接口返回后进行替代
import { userInfo } from '@/datas/local/user.ts'
router.beforeEach((to, from, next) => {
  NProgress.start()
  const permissionStore = usePermissionStoreHook()
  const userStore = useUserStoreHook()
  const logStore = useLogStoreHook()
  userStore.setRoles(['admin'])
  //判断是否登录
  if (userStore.isLogin) {
    NProgress.done()
    //跳转路由后添加当前访问路由的名称用于网络日志记录
    logStore.setCurrentRoute(to)
    next()
  } else {
    userStore.setUser(userInfo)
    permissionStore.setRoutes(asyncRoutes)
    userStore.login()
    setToken('token', userInfo.token)
    asyncRoutes.forEach((route) => {
      router.addRoute(route)
    })
    next({ ...to, replace: true })
  }
})
