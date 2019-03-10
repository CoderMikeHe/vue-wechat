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
  subTitle = "";
  constructor({ icon = "", title = "", subTitle = "" } = {}) {
    this.icon = icon;
    this.title = title;
    this.subTitle = subTitle;
  }
}

export { MHCommonGroup, MHCommonItem };
