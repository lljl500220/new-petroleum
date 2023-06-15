import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWarningAreaSelect } from '@/api/public/publicApi.ts'
import { useUserStoreHook } from '@/store/user.ts'

const userStore = useUserStoreHook()

export const publicStore = defineStore('public', () => {
  const regionalDictionaryaData = ref<any[]>([])

  const setData = () => {
    getWarningAreaSelect({ phone: userStore.user.phone }).then((res: any) => {
      regionalDictionaryaData.value = res.result
    })
  }

  return {
    regionalDictionaryaData,
    setData
  }
})
