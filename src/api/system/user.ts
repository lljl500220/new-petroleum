import { get, post } from '@/utils/http.ts'
import { useUserStoreHook } from '@/store/user.ts'
// @ts-ignore
import { ElMessage } from 'element-plus'
import { removeToken } from '@/utils/cookies.ts'

const userStore = useUserStoreHook()
export const getMenus = () => {
  return post(
    '/menu/menuList',
    {
      userId: userStore.user.phone
    },
    false
  )
}

export const logout = () => {
  post('/login/logout')
    .then((res: any) => {
      removeToken()
      window.location.replace(res.loginUrl)
    })
    .catch(() => {
      ElMessage.error('退出失败')
    })
}

export const getUserInfo = () => {
  return get('/login/getUserInfo')
}
