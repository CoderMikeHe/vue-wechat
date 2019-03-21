class ActionSheetItem {
  // 构造函数
  constructor({
    title = "",
    iconfont = "",
    destructive = false
  } = {}) {
    this.title = title; // title
    this.iconfont = iconfont; // 字体图标
    this.destructive = destructive; // 是否颜色加重
  }
}
// defalult 构造器
export default ActionSheetItem;