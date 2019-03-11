// 组
class MHCommonGroup {
  // 组头标题
  header = "";
  // 组尾标题
  footer = "";
  // items
  items = [];
  // 配置
  constructor({ header = "", footer = "" } = {}) {
    this.header = header;
    this.footer = footer;
  }
}

// 元素
class MHCommonItem {
  // icon
  icon = "";
  title = "";
  subtitle = "";
  name = "";   // 跳转路由对象(命名路由) 跟path一样，但优先级较高
  path = "";   // 跳转路由地址
  constructor({ icon = "", title = "", subtitle = "" ,name = ""} = {}) {
    this.icon = icon;
    this.title = title;
    this.subtitle = subtitle;
    this.name = name;
  }
}

export { MHCommonGroup, MHCommonItem };
