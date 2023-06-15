import { get, post } from '@/utils/http.ts'
// 注册
const register = (data: any): Promise<any> => {
  return post('/register/registerForPersonal', data)
}
// 获取验证码
const sendVerifyCode = (data: any): Promise<any> => {
  return get('/register/sendVerifyCode', data)
}

//密码重置
const resetPwd = (data: any): Promise<any> => {
  return post('/register/resetPwd', data)
}

//根据社会信用代码查询加油站档案信息
const gsSocialCreditCode = (data: any): Promise<any> => {
  return post('/gasStationArchives/getSocialCreditCode', data)
}

//根据加油站档案编号查询加油站档案信息
const getgasStationByArchiveId = (data: any): Promise<any> => {
  return post('/gasStationArchives/getgasStationByArchiveId', data)
}

//保存或更新加油站档案信息
const saveOrUpGasStationArchives = (data: any): Promise<any> => {
  return post('/gasStationArchives/saveOrUpGasStationArchives', data)
}

//查询企业资料
const queryGasStationsInfo = (data: any): Promise<any> => {
  return post('/gasStationArchives/queryGasStationsInfo', data)
}

//查询企业资料
const queryGsUpdateInfo = (data: any): Promise<any> => {
  return post('/gasStationArchives/queryGsUpdateInfo', data)
}

//更新企业资料
const updateGasStationsInfo = (data: any): Promise<any> => {
  return post('/gasStationArchives/updateGasStationsInfo', data)
}

//保存企业资料
const saveGasStationsInfo = (data: any): Promise<any> => {
  return post('/gasStationArchives/saveGasStationsInfo', data)
}

//查询提醒对象（信息更正提醒）
const getRemindObjectList = (data: any): Promise<any> => {
  return post('/messageAndPolicy/getRemindObjectList', data)
}

//发布信息更正提醒
const addRemind = (data: any): Promise<any> => {
  return post('/messageAndPolicy/addRemind', data)
}

//查询企业审批列表
const entApprovalList = (data: any): Promise<any> => {
  return post('/approval/entApprovalList', data)
}

//查询企业列表
const queryEntInfoList = (data: any): Promise<any> => {
  return post('/gasStationArchives/queryEntInfoList', data)
}

//下载企业电子档案
const exportList = (data: any): void => {
  get('/gasStationArchives/exportList', data)
}

//查询操作日志
const getLogList = (data: any): Promise<any> => {
  return post('/operate/getLogList', data)
}

/**
 * 作者：luolj
 * 时间：
 * 功能：修改经营状态
 */
const changeBusinessStatus = (data: any): Promise<any> => {
  return post('/gasStationArchives/changeBusinessStatus', data)
}

//下载文件
const downloadFile = (data: any): void => {
  get('/file/downloadFile', data).then(() => {})
}

//上传文件
const uploadFile = (data: any): Promise<any> => {
  return post('/file/uploadFile', data)
}

//查询企业审批详情
const entApprovalInfo = (data: any): Promise<any> => {
  return post('/approval/entApprovalInfo', data)
}

//企业审批
const approvalEntStatus = (data: any): Promise<any> => {
  return post('/approval/approvalEntStatus', data)
}

export {
  register,
  sendVerifyCode,
  resetPwd,
  gsSocialCreditCode,
  getgasStationByArchiveId,
  queryGasStationsInfo,
  entApprovalList,
  saveOrUpGasStationArchives,
  updateGasStationsInfo,
  downloadFile,
  uploadFile,
  approvalEntStatus,
  queryEntInfoList,
  queryGsUpdateInfo,
  entApprovalInfo,
  getLogList,
  getRemindObjectList,
  addRemind,
  saveGasStationsInfo,
  exportList,
  changeBusinessStatus
}
