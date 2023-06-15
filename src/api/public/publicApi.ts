import { post } from '@/utils/http.ts'

//区域下拉框查询选择项(数据字典)
const getWarningAreaSelect = (data: any): Promise<any> => {
  return post('/earlyWarning/getWarningAreaSelect', data)
}

//获取图片base64编码
const getBase64 = (data: any): Promise<any> => {
  return post('/aiVideoinfo/getBase64', data)
}

export { getWarningAreaSelect, getBase64 }
