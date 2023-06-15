//这个分支只适用于后端添加新接口之前，适配老系统，做了相当多的特殊处理，事实上这是不应该的
const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layout/index.vue')
const icons = {
  gasStationRegulation: 'qiyeyewu',
  matters: 'zhengwudating',
  dataWarehouse: 'datarepository',
  warnCenter: 'yujing',
  policyRegulation: 'zhengce',
  TaxManage: 'shuiwu',
  warnWarehouse: 'cangkukucun',
  operating: 'yunyingguanli',
  EnterInfo: 'entinfo'
}
const needShow = [
  'gasStationRegulation',
  'warnWarehouse',
  'TaxManage',
  'operating'
]
/**
 * 作者：luolj
 * 时间：2023/06/06 10:13:52
 * 功能：getmenus接口返回的菜单列表导出为route对象，并添加动态路由
 */
export const menu2route = (menus: any[]) => {
  const routes = []
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i]
    if (item.path === '/') continue
    const temp = {
      path: item.path,
      name: item.name,
      children: [],
      component: () => {},
      meta: {
        svgIcon: icons[item.name as keyof typeof icons],
        title: item.meta.title,
        hidden: item.menuIdentifier === 'false',
        alwaysShow: needShow.includes(item.name)
      }
    }
    if (item.children && item.children.length > 0) {
      if (!item.parentId) {
        temp.component = Layout
      } else {
        // @ts-ignore
        temp.component = null
      }
      // @ts-ignore
      temp.children = menu2route(item.children)
    } else {
      const url = item.component.substring(7)
      temp.component = modules[`../../views/${url}`]
      // @ts-ignore
      delete temp['children']
    }
    routes.push(temp)
  }
  return routes
}
