/**权限路由相关类型 */
declare namespace AuthRoute {
  interface RouteMeta {
    title: string; // 页面标题
    icon?: string; // 图标
    auth?: string; // 是否登录权限
    ignoreAuth?: string; // 是否忽略权限
    roles?: string; // 可以访问的角色
    keepAlive?: string; // 是否开启缓存
    hideMenu?: boolean; // 是否隐藏
    order?: number; // 菜单排序
    frameUrl?: string; // 嵌套外链
    unfold?: boolean; // 是否是主菜单
  }
}
