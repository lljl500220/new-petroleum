import { post } from '@/utils/http.ts'

// 贵州省石化_累计数据
export const gzssh_ljsj = (data: any): Promise<any> => {
  return post('/homePage/gzssh_ljsj', data, false)
}

// 贵州省石化_累计数据_地图
export const gzssh_ljsj_dt = (data: any): Promise<any> => {
  return post('/homePage/gzssh_ljsj_dt', data, false)
}

// 贵州省石化_实时订单
export const gzssh_ssdd = (data: any): Promise<any> => {
  return post('/homePage/gzssh_ssdd', data, false)
}

//贵州省石化_加油量占比_上月
export const gzssh_jylzb_sy = (data: any): Promise<any> => {
  return post('/homePage/gzssh_jylzb_sy', data, false)
}

export const gzssh_jyzjyqkqs = (data: any): Promise<any> => {
  return post('/cockpit/gzssh_jyzjyqkqs', data, false)
}

export const gzssh_gdjyzjyjezb = (data: any): Promise<any> => {
  return post('/cockpit/gzssh_gdjyzjyjezb', data, false)
}

export const gzssh_gypjyqk = (data: any): Promise<any> => {
  return post('/cockpit/gzssh_gypjyqk', data, false)
}

export const earlyWarningModule = (data: any): Promise<any> => {
  return post('/cockpit/earlyWarningModule', data, false)
}

export const enterpriseArchives = (data: any): Promise<any> => {
  return post('/cockpit/enterpriseArchives', data, false)
}
