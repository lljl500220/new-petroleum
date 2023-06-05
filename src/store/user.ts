import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const roles = ref<string[]>([])
  const phone = ref('12343421453')
  const username = ref('admin')

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value
  }
  /** 登录 */
  const login = () => {}
  /** 登出 */
  const logout = () => {}
  return { roles, phone, username, setRoles, login, logout }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
