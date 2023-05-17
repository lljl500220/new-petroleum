import router from "@/router/index.ts";
import NProgress from "nprogress"

router.beforeEach((to, from,next) => {
    NProgress.start()
    //判断是否取得token 即是否登录
    console.log(to.path)
    console.log(from.fullPath)
    next()
})