// 全局工具类  （变量 or Methods）

// 导航栏返回按钮
import {backItem} from '../js/MHBarButtonItem'

const utils = {
  install(Vue) {
    // 导航栏返回按钮
    Vue.prototype.backItem = backItem;
  }
}

// 导出组件
export default utils;