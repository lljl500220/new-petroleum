import { request } from '@/utils/service.ts'
// @ts-ignore
import { ElLoading } from 'element-plus'

export const post = (
  url: string,
  data: any,
  isLoading = true
): Promise<any> => {
  if (isLoading) {
    ElLoading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
        ElLoading.service().close()
      })
      .catch((err) => {
        reject(err)
        ElLoading.service().close()
      })
  })
}

export const get = (
  url: string,
  data?: any,
  isLoading = true
): Promise<any> => {
  if (isLoading) {
    ElLoading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'get',
      data
    })
      .then((res) => {
        resolve(res)
        ElLoading.service().close()
      })
      .catch((err) => {
        reject(err)
        ElLoading.service().close()
      })
  })
}
