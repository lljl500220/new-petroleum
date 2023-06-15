import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /* 角色数组，应当是形如['admin','editor']这样的数组 */
  const roles = ref<string[]>([])
  /* getUserinfo接口返回的完整数据，包含了token */
  const user = ref<any>({})
  /* 当前角色是否登录 */
  const isLogin = ref(false)

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value
  }
  /** 设置角色信息 */
  const setUser = (userInfo: any) => {
    user.value = userInfo
  }
  /** 登录 */
  const login = () => {
    isLogin.value = true
  }
  /** 登出 */
  const logout = () => {
    user.value = {}
    roles.value = []
  }
  return { roles, user, isLogin, setRoles, login, logout, setUser }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
